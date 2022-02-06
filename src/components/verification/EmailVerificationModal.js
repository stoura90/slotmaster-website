import {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../core";
import PropTypes from "prop-types";
import PLXModal from "../modal/PLXModal";
import {UseEvent} from "../../core/hooks/useEvent";
import {SvgDot} from "../index";

window.reSendInterval=null;
export const EmailVerificationModal = ({email,err,onSubmit,onClose,send,save,verify,additionalParams,title})=>{
    const {t} = useTranslation()
    const [error,setError]=useState("")
    const [loader,setLoader]=useState(false)
    const [codeRequest,setCodeRequest] = useState(false);
    let [reSend,setReSend]=useState(-1)
    const [code,setCode]=useState("")
    const ev  = UseEvent()
    useEffect(()=>{
        setError(err);
    },[err])

    useEffect(()=>{
        const otpLoader = ev.subscribe('verifyOtp',setLoader)
        return ()=>{
            otpLoader.unsubscribe()
        }
    },[])

    const onResend =()=>{
        Actions.User.resendOtp({permitAll:true,send:send.concat("?type={type}&prefix={prefix}&value={value}"),type:"email",prefix:"",value:email,additionalParams:additionalParams,loader:setLoader})
            .then(response=>{
                if(response.status){
                    setCode("")
                    setReSend(response.data.remaining)
                    setCodeRequest(true);
                }else {
                    setError('error');
                    setCodeRequest(false);
                }

            }).catch(reason => setError(reason))
    }

    const onVerify =()=>{
        if(code){
            Actions.User.verifyOtp({verify:verify.concat("?type={type}&prefix={prefix}&value={value}&otp={otp}"),type:"email",prefix:"",value:email,otp:code,additionalParams:additionalParams, loader:setLoader,
                permitAll:true})
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
        setCodeRequest(true);
    },[reSend])

    return (
        <PLXModal title={title?title:t('Email Verification')} onClose={()=>onClose()} contentStyle={{maxWidth:'500px'}}>
            <form onSubmit={e=>{
                e.preventDefault();
                if(!codeRequest){
                    window.pushEvent('Please Request SMS Code','error');
                    return;
                }
                if(!code){
                    window.pushEvent("Incorrect sms code","error");
                    setTimeout(()=>{
                        setError("")
                    },2000)
                }else{
                    setCodeRequest(false);
                    if(verify){
                        onVerify()
                    }else{
                        save(code)
                    }

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
                <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden'}}>
                    {loader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                    {t("Confirm")}
                </button>
            </form>
        </PLXModal>
    )


}
EmailVerificationModal.propTypes = {
    //title:PropTypes.string,
    email:PropTypes.string,
    err:PropTypes.string,
    onSubmit:PropTypes.func,
    onClose:PropTypes.func,
    send:PropTypes.string,
    save:PropTypes.func,
    additionalParams:PropTypes.object
}
EmailVerificationModal.defaultValues = {
    //title:'Email Verification',
    email:'',
    err:'',
    onSubmit:(code)=>console.log(code),
    onClose:(_)=>console.log(_),
    save:(_)=>console.log(_),
    send:"",
    additionalParams:{}
}
