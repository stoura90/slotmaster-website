import React, {useRef, useState} from "react";
import {close} from "../../../assets/img/icons/icons";
import {Actions} from "../../../core";
import {useDispatch} from "react-redux";
import "./signin.scss"
import {useParams} from "react-router-dom";

const SignIn =() =>{
    const dispatch = useDispatch();
    const [loginForm,setLoginForm]=useState({
        username:'',
        password:''
    })

    const [error,setError] = useState(null);

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
            setError('specified username or password is incorrect')
        }
    }


    return (
        <div
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
                        <div className="modal-title">Log In</div>
                    </div>
                    <form onSubmit={(event)=>{
                        event.preventDefault();
                        if(loginForm.username && loginForm.password){
                            signIn()
                        }else{
                            alert("Please fill in all the fields")
                        }
                    }} className="form">

                        <div className="input-label">
                            <input type="text" name="email" id="email"
                                   value={loginForm.username} onChange={event => setLoginForm({...loginForm,username:event.target.value})}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-label" >
                            <input type="password" name="password" id="signIn_password"
                                   value={loginForm.password} onChange={event => setLoginForm({...loginForm,password:event.target.value})}
                            />
                            <label htmlFor="password">Password</label>
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
                            <p className={"forgot-password"}>Forgot password?</p>
                        </div>
                        {
                            error && <div style={{color:'#ff7e7e'}}>{error}</div>
                        }

                        <button type="submit" className="btn-primary" >Log In</button>
                    </form>
                    <p style={{fontSize:"0.75rem", color:"white", textAlign:"center", marginTop:"10px"}}>Don't have an account? <span className={"forgot-password"} onClick={()=>{
                        document.getElementById("signUp-btn").click()
                    }}>Sign Up</span></p>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
