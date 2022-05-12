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
    });

    const [otp,setOtp] = useState(["","","","","",""])

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);

    const [error,setError] = useState(null);
    const [show,setShow] = useState(false);
    const [showOTP,setShowOTP] = useState(false);
    const [loader,setLoader] = useState(false);

    let [reSend,setReSend]=useState(-1)
    const [code,setCode]=useState("")
    const [codeRequest,setCodeRequest] = useState(false);
    const [authData,setAuthData] = useState({
        access_token: "",
        error: "",
        sourceId:'',
        refresh_token:'',
        expires_in: ""
    });



    useEffect(()=>{
        const signInFormEvent= ev.subscribe("signIn",setShow)
        return ()=>{
            signInFormEvent.unsubscribe()
        }
    },[])

    const signIn=async () => {

        setError(null)

        const head = showOTP ? {'2fa-token': authData?.access_token} : '';

        const response = await dispatch(Actions.User.signIn({
            data:loginForm,
            loader:setSignInLoader,
            sourceId:authData?.refresh_token,
            code:otp.join(''),
            token2fa:authData?.access_token,
            header:head
        }))
        if (response.status) {
            if(window.location.href.indexOf("playSlot")>-1
             || window.location.href.indexOf("live")>-1
             || window.location.href.indexOf("sport")>-1
            ){
                window.location.reload()
                return
            }
            setShow(false);
            setShowOTP(false);
        } else {
            if(response?.error){
                if(response?.error?.error === "otp_required"){
                    setAuthData(response?.error);
                    setShowOTP(true);
                    setReSend(parseInt(response?.error?.expires_in))
                }
            }else{
                window.top.pushEvent('specified username or password is incorrect','error');
            }
        }
    }

    const onResend =()=>{
        //setCode("");
        ////setReSend(response.data.data.remaining);
        //setReSend(20);
        //setCodeRequest(true);
        //return;
        Actions.User.resendOtp({
            permitAll:false,
            send:'/v1/api/2fa/resend'.concat("/"+authData?.refresh_token+"?"),
            type:"multi",
            sourceId:authData?.sourceId,
            header:{
                '2fa-token': authData?.access_token
            },
            //additionalParams:additionalParams,
            loader:setLoader
        })
            .then(response=>{
                console.log('mobOtp',response)
                if(response.status){
                    setCode("");
                    //setReSend(response.data.data.remaining);
                    setReSend(response?.data?.remaining);
                    setCodeRequest(true);
                }else {
                    console.log('mobOtp',response)
                    setError('error');
                    setCodeRequest(false);
                }
            })
    }

    useEffect(()=>{

        if(reSend===-1){
            if(window.reSendInterval){
                clearInterval(window.reSendInterval)
                window.reSendInterval=null
            }
        }else{
            if(!window.reSendInterval){
                window.reSendInterval = setInterval(()=>{
                    setReSend(--reSend)

                },1000)

            }
        }
        setCodeRequest(true);
    },[reSend])

    return (
        <>
        {
            show && (
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
                            <label htmlFor="email">{t("Email/Username")}</label>
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
                            <label htmlFor="signIn_password">{t("Password")}</label>
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
        {
            showOTP && (
                <PLXModal title={t('Set 2FA Autorization')} onClose={()=>setShowOTP(false)} dialogStyle={{maxWidth:'380px'}} >
                    <form onSubmit={e=>{
                        e.preventDefault();
                        signIn()
                    }} className="confirm-form aut-2fa">

                        <div className="row">
                            <div  className="col-12" style={{marginBottom:'0'}}>
                                <br/>
                                <p>Enter the code that came to your email or SMS</p>
                                <div className="fields">
                                    <input type="number" ref={ref1} value={otp[0]} onChange={(e)=>{

                                        if(e.target.value){
                                            if(e.target.value.length>1){
                                                ref2.current.focus();
                                                return;
                                            }
                                            otp[0]=e.target.value;
                                            setOtp([...otp])
                                            ref2.current.focus()
                                        }else{
                                            otp[0]="";
                                            setOtp([...otp])
                                        }
                                    }}/>
                                    <input type="number" ref={ref2} value={otp[1]} onChange={(e)=>{

                                        if(e.target.value){
                                            if(e.target.value.length>1){
                                                ref3.current.focus();
                                                return;
                                            }
                                            otp[1]=e.target.value;
                                            setOtp([...otp])
                                            ref3.current.focus()
                                        }else{
                                            otp[1]="";
                                            setOtp([...otp])
                                            ref1.current.focus()
                                        }
                                    }}/>
                                    <input type="number" ref={ref3} value={otp[2]} onChange={(e)=>{

                                        if(e.target.value){
                                            if(e.target.value.length>1){
                                                ref4.current.focus();
                                                return;
                                            }
                                            otp[2]=e.target.value;
                                            setOtp([...otp])
                                            ref4.current.focus()
                                        }else{
                                            otp[2]="";
                                            setOtp([...otp])
                                            ref2.current.focus()
                                        }
                                    }}/>
                                    <input type="number" ref={ref4} value={otp[3]} onChange={(e)=>{

                                        if(e.target.value){
                                            if(e.target.value.length>1){
                                                ref5.current.focus();
                                                return;
                                            }
                                            otp[3]=e.target.value;
                                            setOtp([...otp])
                                            ref5.current.focus()
                                        }else{
                                            otp[3]="";
                                            setOtp([...otp])
                                            ref3.current.focus()
                                        }
                                    }}/>
                                    <input type="number" ref={ref5} value={otp[4]} onChange={(e)=>{

                                        if(e.target.value){
                                            if(e.target.value.length>1){
                                                ref6.current.focus();
                                                return;
                                            }
                                            otp[4]=e.target.value;
                                            setOtp([...otp])
                                            ref6.current.focus()
                                        }else{
                                            otp[4]="";
                                            setOtp([...otp])
                                            ref4.current.focus()
                                        }
                                    }}/>
                                    <input type="number" ref={ref6} value={otp[5]} onChange={(e)=>{
                                        console.log(e)
                                        if(e.target.value){
                                            if(e.target.value.length>1){
                                                return;
                                            }
                                            otp[5]=e.target.value;
                                            setOtp([...otp])
                                        }else{
                                            otp[5]="";
                                            setOtp([...otp])
                                            ref5.current.focus()
                                        }
                                    }}/>
                                </div>
                                <div className="countDown">
                                    {/*<input type="text" name="code" id="code" value={code} onChange={e=>setCode(e.target.value)} className="for-confirm"/>*/}
                                    {/*<label htmlFor="code">{t("Code")}</label>*/}
                                    {
                                        reSend!==-1? <><span>Resend Code: </span><span className="timeout">{reSend}</span></>: <button type="button" className="btn-confirm" onClick={()=>onResend()}>{t("Resend Code")}</button>
                                    }
                                </div>

                                <div className="opt-status">

                                </div>

                              </div>
                        </div>

                        <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden',marginLeft:'0'}}>
                            {loader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                            {t("Confirm")}
                        </button>
                    </form>
                    <p style={{fontSize:"0.75rem", color:"white", textAlign:"center", marginTop:"10px", marginBottom:'0'}}>
                        {t("Don't have an account?")}
                        <span className={"forgot-password"} onClick={()=>{setShow(false);}}> {t("Sign Up")} </span>
                    </p>
                </PLXModal>
            )
        }
        </>
    )

}
export default SignIn;




