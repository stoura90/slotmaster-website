import React, {useEffect, useRef, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import {useDispatch} from "react-redux";
import "./signin.scss"
import EventEmitter from "../../../core/utils/eventEmitter";
import PLXModal from "../../modal/PLXModal";
import {UseEvent} from "../../../core/hooks/useEvent";
import {SvgDot} from "../../index";

const SignIn =() =>{
    const {t} = useTranslation()
    const ev = UseEvent()
    const [signInLoader,setSignInLoader]=useState(false);
    const eventEmitter= new EventEmitter()
    const dispatch = useDispatch();
    const [loginForm,setLoginForm]=useState({
        username:'',
        password:''
    })
    const [error,setError] = useState(null);
    const [show,setShow] = useState(false);
    useEffect(()=>{
        const signInFormEvent= ev.subscribe("signIn",setShow)
        return ()=>{
            signInFormEvent.unsubscribe()
        }
    },[])

    const signIn=async () => {

        setError(null)

        const response = await dispatch(Actions.User.signIn({data:loginForm,loader:setSignInLoader}))
        if (response.status) {
            if(window.location.href.indexOf("playSlot")>-1){
                window.location.reload()
                return
            }
            setShow(false);
        }else{
            window.top.pushEvent('specified username or password is incorrect','error');
        }
    }

    return  show && (
        <PLXModal title={t("Log In")} onClose={()=>setShow(false)} contentStyle={{maxWidth:'350px'}} dialogStyle={{maxWidth:'350px'}}>
            <form onSubmit={(event)=>{
                event.preventDefault();
                if(loginForm.username && loginForm.password){
                    signIn()
                }else{
                    //alert(t("Please fill in all the fields"))
                    window.top.pushEvent('Please fill in all the fields','error');
                }
            }} className="form">
                <div className="input-label">
                    <input type="text" name="email" id="email"
                           value={loginForm.username} onChange={event => setLoginForm({...loginForm,username:event.target.value})}
                    />
                    <label htmlFor="email">{t("Email")}</label>
                </div>
                <div className="input-label" >
                    <p className={"forgot-password"}><span onClick={()=>{
                        eventEmitter.emit("recover","Username")
                    }}>{t("Forgot Username")}?</span></p>
                </div>
                <div className="input-label" >
                    <input type="password" name="password" id="signIn_password"
                           value={loginForm.password} onChange={event => setLoginForm({...loginForm,password:event.target.value})}
                    />
                    <label htmlFor="password">{t("Password")}</label>
                    <div className="toggle-password hide"  onClick={e => {
                        let classList = e.target.classList;
                        let contain = classList.contains('hide');

                        document.getElementById('signIn_password').setAttribute('type',contain?'text':'password')

                        if (contain){
                            classList.remove('hide');
                            classList.add('active');
                        }else{
                            classList.add('hide');
                            classList.remove('active');
                        }
                    }}/>

                </div>
                <div className="input-label" >
                    <p className={"forgot-password"}><span onClick={()=>{
                        eventEmitter.emit("recover","Password")
                    }}>{t("Forgot Password")}?</span></p>
                </div>
                {
                    error && <div className="login_error" style={{color:'#ff7e7e'}}>{error}</div>
                }

                <button type="submit" className="btn-primary" disabled={signInLoader} style={{position:'relative',overflow:'hidden'}}>
                    {signInLoader && <SvgDot contentStyle={{background:'#ffcb39'}}/>}
                    {t("Log In")}
                </button>
            </form>
            <p style={{fontSize:"0.75rem", color:"white", textAlign:"center", marginTop:"10px"}}>{t("Don't have an account?")} <span className={"forgot-password"} onClick={()=>{
                setShow(false);
            }}>{t("Sign Up")}</span></p>
        </PLXModal>
    )
}
export default SignIn;
