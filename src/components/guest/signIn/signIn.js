import React, {useEffect, useRef, useState} from "react";
import {close} from "../../../assets/img/icons/icons";
import {Actions, useTranslation} from "../../../core";
import {useDispatch} from "react-redux";
import "./signin.scss"
import {useParams} from "react-router-dom";

const SignIn =() =>{
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const signInRef = useRef({current:null})
    const [loginForm,setLoginForm]=useState({
        username:'',
        password:''
    })
    const [error,setError] = useState(null);

    useEffect(()=>{
        setTimeout(()=>{
            if(document.getElementById("signIn-btn")){
                document.getElementById("signIn-btn").addEventListener("click",()=>{
                    setError(null)
                })
            }
        },1000)

        return  () =>{
            if(document.getElementById("signIn-btn")){
                document.getElementById("signIn-btn").removeEventListener("click",()=>{})
            }
        }
    },[])

    const signIn=async () => {

        setError(null)
        const response = await dispatch(Actions.User.signIn(loginForm))

        if (response.status) {
            if(window.location.href.indexOf("playSlot")>-1){
                window.location.reload()
                return
            }
            document.getElementById("close-sign-in").click();
        }else{
            //setError(response?.data?.error_description)
            setError(t('specified username or password is incorrect'));
        }
    }


    return (
        <div
            ref={signInRef}
            className="modal fade"
            id="LoginModal"
            tabIndex="-1"
            aria-labelledby="LoginModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered auth-modal">
                <div className="modal-content">
                    <div className="modal-head">
                        <button className="close" id={"close-sign-in"} data-bs-dismiss="modal">
                            <img src={close} alt="Close modal"/>
                        </button>
                        <div className="modal-title">{t("Log In")}</div>
                    </div>
                    <form onSubmit={(event)=>{
                        event.preventDefault();
                        if(loginForm.username && loginForm.password){
                            signIn()
                        }else{
                            alert(t("Please fill in all the fields"))
                        }
                    }} className="form">

                        <div className="input-label">
                            <input type="text" name="email" id="email"
                                   value={loginForm.username} onChange={event => setLoginForm({...loginForm,username:event.target.value})}
                            />
                            <label htmlFor="email">{t("Email")}</label>
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
                            <p className={"forgot-password"}>{t("Forgot password")}?</p>
                        </div>
                        {
                            error && <div className="login_error" style={{color:'#ff7e7e'}}>{error}</div>
                        }

                        <button type="submit" className="btn-primary" >{t("Log In")}</button>
                    </form>
                    <p style={{fontSize:"0.75rem", color:"white", textAlign:"center", marginTop:"10px"}}>{t("Don't have an account?")} <span className={"forgot-password"} onClick={()=>{
                        document.getElementById("signUp-btn").click()
                    }}>{t("Sign Up")}</span></p>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
