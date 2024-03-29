import { useEffect, useState} from 'react'

import {Actions, useTranslation} from "./core";
import {Guest, MainNavigator, PLAlert,} from "./components";
import {useDispatch} from "react-redux";
import OTP from "./components/verification";
import {useNav} from "./core/hooks/useNav";
import {useCookie} from "./core/hooks/useCookie";
import {UseEvent} from "./core/hooks/useEvent";
import {useUser} from "./core/hooks/useUser";
import EventEmitter from "./core/utils/eventEmitter";
import Deposit from "./components/account/deposit/Deposit";
import DepositModal from "./components/account/deposit/DepositModal";
import WithdrawModal from "./components/account/withdraw/WithdrawModal";


const  App=()=> {
    const dispatch = useDispatch();
    const event = UseEvent();
    const [loaded,setLoaded]=useState(false)
    const cookie = useCookie()
    const nav  = useNav();
    const user = useUser();
    const [depositModal,setDepositModal]=useState(false);
    const [withdrawModal,setWithdrawModal]=useState(false);

    const [showNotify,setShowNotify]=useState({
        show:false,
        text:'',
        type:''
    });

    useEffect(()=>{
        const signInFormEvent= event.subscribe("notify",setShowNotify)
        const depositModal= event.subscribe("depositModal",setDepositModal)
        const withdrawModal= event.subscribe("withdrawModal",setWithdrawModal)
        return ()=>{
            signInFormEvent.unsubscribe()
            depositModal.unsubscribe()
            withdrawModal.unsubscribe()
        }
    },[])

    useEffect( () => {
       if(nav.get("cxd")){
            //აფილეიტები
            cookie.setCookie("cxd",nav.get("cxd"),14)
       }
        ping()
        //checkLanguage()
        const listener = event.subscribe("plxEvent",(e)=>{
            switch (e?.type) {
                case "signOut":
                        localStorage.clear()
                        user.signOut(()=>event.emit('signIn',true))
                    break;
                default: break;
            }
        })

        return ()=>{
            listener.unsubscribe()
        }
    },[])


    const ping =  async () => {
        setLoaded(await dispatch(Actions.User.ping()))
    }

    return  loaded && (<>
          <MainNavigator/>

          <Guest/>
          <OTP/>
          <div className="event-wrap"/>
          {/*{
              User?.data?.verifyStatus === 1 && modal === true &&
              <Modal closeButton={true}
                     onClose={()=>setModal(false)}
                     title={"Verification Modal"}
                     footer={<Button className={"danger"} title={"დახურვა"} onCLick={()=>setModal(false)}/>}
              >
                  <div>verif modal</div>
              </Modal>
          }*/}


            {withdrawModal ? <WithdrawModal onClose={()=> setWithdrawModal(false)}/> : ''}
            {depositModal ? <DepositModal onClose={()=> setDepositModal(false)}/> : ''}

            {
                showNotify.show && <PLAlert data={showNotify} title={showNotify?.title} onClose={()=>setShowNotify({...showNotify,show:false})} footer={<button onClick={()=>setShowNotify({...showNotify,show:false})}>Close</button>}>
                    <div className="alert_wrap">{showNotify.text}</div>
                </PLAlert>
            }


        </>
  )
}

export default App;
