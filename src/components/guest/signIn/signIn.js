import React, {useEffect, useRef, useState} from "react";
import {close} from "../../../assets/img/icons/icons";
import {Actions, useTranslation} from "../../../core";
import {useDispatch} from "react-redux";
import "./signin.scss"
import {useParams} from "react-router-dom";
import EventEmitter from "../../../core/utils/eventEmitter";
import PLXModal from "../../modal/PLXModal";

const SignIn =() =>{
    const {t} = useTranslation()
    const eventEmitter= new EventEmitter()
    const dispatch = useDispatch();

    const [loginForm,setLoginForm]=useState({
        username:'',
        password:''
    })
    const [error,setError] = useState(null);
    const [show,setShow] = useState(false);

    useEffect(()=>{
        eventEmitter.on("signIn",setShow);
        return ()=>{eventEmitter.removeListener("recover",e=>setShow(false))}
    },[])

    const signIn=async () => {

        setError(null)
        const response = await dispatch(Actions.User.signIn(loginForm))

        if (response.status) {
            if(window.location.href.indexOf("playSlot")>-1){
                window.location.reload()
                return
            }
            setShow(false);
            //document.getElementById("close-sign-in").click();
        }else{
            //setError(response?.data?.error_description)
            window.top.pushEvent('specified username or password is incorrect','error');
            //setError(t('specified username or password is incorrect'));
        }
    }


    return  show && (
        <PLXModal title={t("Log In")} onClose={()=>setShow(false)} contentStyle={{maxWidth:'350px'}}>
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
                        document.getElementById("signIn-btn").click()
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

                <button type="submit" className="btn-primary" >{t("Log In")}</button>
            </form>
            <p style={{fontSize:"0.75rem", color:"white", textAlign:"center", marginTop:"10px"}}>{t("Don't have an account?")} <span className={"forgot-password"} onClick={()=>{
                setShow(false);
                document.getElementById("signUp-btn").click()
            }}>{t("Sign Up")}</span></p>
        </PLXModal>
    )
}
export default SignIn;
