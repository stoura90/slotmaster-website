import { useEffect, useState} from 'react'

import {Actions, useTranslation} from "./core";
import { Guest, MainNavigator, } from "./components";
import {useDispatch} from "react-redux";
import OTP from "./components/verification";
import {useNav} from "./core/hooks/useNav";
import {useCookie} from "./core/hooks/useCookie";
import {UseEvent} from "./core/hooks/useEvent";
import {useUser} from "./core/hooks/useUser";


const  App=()=> {
    const {t,i18n}  = useTranslation()
    const dispatch = useDispatch();
    const event = UseEvent();
    const [loaded,setLoaded]=useState(false)
    const cookie = useCookie()
    const nav  = useNav();
    const user = useUser()
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
                        console.log(e)
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
        </>
  )
}

export default App;
