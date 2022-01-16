import {close} from "../../assets/img/icons/icons"
import {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../core";
import PropTypes from "prop-types";
import {EmailVerificationModal} from "./EmailVerificationModal";

window.reSendInterval=null;
export const MobileVerificationModal = ({number,prefix,onSubmit,err,send,save,verify,onClose,additionalParams})=>{
    const {t} = useTranslation()
    const [phone,setPhone]=useState("")
    const [error,setError]=useState("")
    let [reSend,setReSend]=useState(-1)
    const  [code,setCode]=useState("")
    useEffect(()=> {
        console.log(number,prefix)
        if(number && number.length > 3){
            let length = number.toString().length;
            setPhone(prefix+' '+(new Array(length-2)).join("*").concat(number.substring(length-3,2)))
        }

    },[number,prefix])
    useEffect(()=>{
        setError(err)
    },[err])


    const onResend =()=>{
        Actions.User.resendOtp({send:send.concat("?type={type}&prefix={prefix}&value={value}"),type:"mobile",prefix:parseInt(prefix),value:number,additionalParams:additionalParams})
            .then(response=>{
                if(response.status){
                    setCode("")
                    setReSend(response.data.remaining)
                }else {
                    setError('error')
                }
            }).catch(reason => {
                console.log('reason',reason?.response?.data)
            setError(reason?.response?.data?.error)
        })
    }
    const onVerify =()=>{

        if(code){
            Actions.User.verifyOtp({verify:verify.concat("?type={type}&prefix={prefix}&value={value}&otp={otp}"),type:"mobile",prefix:prefix,value:number,otp:code,additionalParams:additionalParams})
                .then(response=>{
                    if(response.status){
                        save(true);
                        setError('')
                    }else {
                        setError('error')
                        save(false)
                    }

                }).catch(reason => {
                save(false);
                setError(reason?.response?.data?.error)
            })
        }else{
            setError("Please check field")
        }

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
    return <div className="custom-modal" >
        <div className="modal-dialog modal-dialog-centered auth-modal">
            <div className="modal-content">
                <div className="modal-head mb-0">
                    <button className="close" data-bs-dismiss="modal" onClick={()=>onClose()}>
                        <img src={close} alt="Close modal"/>
                    </button>
                    <div className="modal-title">{t("Phone Finances")}</div>
                </div>
                <form onSubmit={e=>{
                    e.preventDefault();
                    if(!code){
                        setError("Incorrect sms code");
                        setTimeout(()=>{
                            setError("")
                        },2000)
                    }else{
                        if(verify){
                            onVerify()
                        }else{
                            save(code)
                        }

                    }
                }} className="confirm-form">
                    <p className="confirm-text">
                        {t("A 6-digit SMS code was sent to")}:
                        <span className="phone-num">{phone}</span>. {t("Please enter the code in the field below to confirm")}:
                    </p>
                    <div className="input-label-border">
                        <input type="number" name="code" id="code" value={code} onChange={e=>setCode(e.target.value)} className="for-confirm"/>
                        <label htmlFor="code">{t("SMS Code")}</label>
                        {
                            reSend!==-1? <span className="timeout">{reSend}</span>: <button type="button" className="btn-confirm" onClick={()=>onResend()}>{t("Send")}</button>
                        }
                    </div>
                    <p style={{color:"red"}}>{error}</p>
                    <button type="submit" className="btn-dep justify-content-center px-0">
                        {t("Confirm")}
                    </button>
                </form>
            </div>
        </div>
    </div>
}
MobileVerificationModal.propTypes = {
    number:PropTypes.string,
    prefix:PropTypes.string,
    err:PropTypes.string,
    onSubmit:PropTypes.func,
    send:PropTypes.string,
    save:PropTypes.string,
    additionalParams:PropTypes.object
}
MobileVerificationModal.defaultValues = {
    number:'',
    prefix:'+995',
    err:"",
    onSubmit:(_)=>console.log(_),
    save:"",
    send:"",
    additionalParams:{}
}
