import {Suspense, useEffect, useLayoutEffect, useState} from 'react'

import {Actions, Provider, useTranslation} from "./core";
import {Button, Footer, Guest, Header, MainNavigator, } from "./components";
import {useDispatch} from "react-redux";
import OTP from "./components/verification";


const  App=()=> {
    const {t,i18n}  = useTranslation()
    const dispatch = useDispatch();
    const [loaded,setLoaded]=useState(false)

    useEffect( () => {
        ping()
        checkLanguage()
    },[])

    const checkLanguage = ()=>{
        if(window.location.pathname.includes("/en") || window.location.pathname.includes("/ru")){
            if(window.location.pathname.includes("/en")){
                if(i18n.language!=="en"){
                    i18n.changeLanguage("en")
                }
            }else{
                if(i18n.language!=="ru"){
                    i18n.changeLanguage("ru")
                }
            }
        }else{
            i18n.changeLanguage("en");
            window.location.href="/en"
        }
    }
    const errorHandler=(event)=>{
        /*switch (event.type){
            case 'signOut': signOut();break;
            case 'signIn': signOut(()=>{
                setTimeout(()=>{
                    if(document.getElementById("signIn-btn")){
                        document.getElementById("signIn-btn").click();
                    }
                },200)
            });break;
            default: break;
        }*/
    }
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
