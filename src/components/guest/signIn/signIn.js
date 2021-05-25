import React, {useState} from "react";
import {close} from "../../../assets/img/icons/icons";
import {Actions} from "../../../core";
import {useDispatch} from "react-redux";


const SignIn =() =>{
    const dispatch = useDispatch();
    const [loginForm,setLoginForm]=useState({
        username:'',
        password:''
    })

    const signIn=async () => {
        const response = await dispatch(Actions.User.signIn(loginForm))
        if (response.status) {
            document.getElementById("close-sign-in").click();
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
                        <div className="input-label">
                            <input type="password" name="password" id="password"
                                   value={loginForm.password} onChange={event => setLoginForm({...loginForm,password:event.target.value})}
                            />
                            <label htmlFor="password">Password</label>
                            <div className="toggle-password hide"></div>
                        </div>
                        <button type="submit" className="btn-primary" >Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignIn;