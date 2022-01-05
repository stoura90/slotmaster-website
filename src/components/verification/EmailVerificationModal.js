import {close} from "../../assets/img/icons/icons"
import {useEffect, useState} from "react";
import {MobileVerificationModal} from "./MobileVerificationModal";
import {Actions, useTranslation} from "../../core";
import PropTypes from "prop-types";

window.reSendInterval=null;
export const EmailVerificationModal = ({email,err,onSubmit})=>{
    const {t} = useTranslation()
    const [error,setError]=useState("")

    let [reSend,setReSend]=useState(-1)
    const  [code,setCode]=useState("")

    useEffect(()=>{
        setError(err)
    },[err])
    const onResend =()=>{
        Actions.User.resendOtp({type:"email",prefix:"",value:email})
            .then(response=>{
                console.log(response)
                if(response.status){
                    setCode("")
                    setReSend(response.data.remaining)
                }else {
                    setError('error')
                }

            }).catch(reason => setError(reason))
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
    },[reSend])
    return <div
        className="modal fade"
        id="confirmEmail"
        tabIndex="-1"
        aria-labelledby="confirmPhoneLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-centered auth-modal">
            <div className="modal-content">
                <div className="modal-head mb-0">
                    <button className="close" data-bs-dismiss="modal">
                        <img src={close} alt="Close modal"/>
                    </button>
                    <div className="modal-title">{t("Email Verification")}</div>
                </div>
                <form onSubmit={e=>{
                    e.preventDefault();

                    if(!code){
                        setError("Incorrect sms code");
                        setTimeout(()=>{
                            setError("")
                        },2000)
                    }else{
                        onSubmit(code)
                    }
                }} className="confirm-form">
                    <p className="confirm-text">
                        {t("A 6-digit SMS code was sent to")}:
                        <br/>
                        <span className="phone-num">{email}</span><br/> {t("Please enter the code in the field below to confirm")}:
                    </p>
                    <div className={`input-label-border ${error?'error':''}`}>
                        <input type="number" name="code" id="code" value={code} onChange={e=>setCode(e.target.value)} className="for-confirm"/>
                        <label htmlFor="code">{t("SMS Code")}</label>
                        {
                            reSend!==-1? <span className="timeout">{reSend}</span>: <button type="button" className="btn-confirm" onClick={()=>onResend()}>{t("Send")}</button>
                        }
                    </div>
{/*
                    <p style={{color:"red"}}>{t(error)}</p>
*/}
                    <button type="submit" className="btn-dep justify-content-center px-0">
                        {t("Confirm")}
                    </button>
                </form>
            </div>
        </div>
    </div>
}
EmailVerificationModal.propTypes = {
    email:PropTypes.string,
    err:PropTypes.string,
    onSubmit:PropTypes.func
}
EmailVerificationModal.defaultValues = {
    email:'',
    err:'',
    onSubmit:(code)=>console.log(code)
}
