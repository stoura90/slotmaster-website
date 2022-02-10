import {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../core";
import PropTypes from "prop-types";
import PLXModal from "../modal/PLXModal";
import {SvgDot} from "../index";
import {UseEvent} from "../../core/hooks/useEvent";

window.reSendInterval=null;
export const MobileVerificationModal = ({number,prefix,onSubmit,err,send,save,verify,onClose,additionalParams,title,permitAll=false})=>{
    const {t} = useTranslation();
    const ev = UseEvent();
    const [phone,setPhone]=useState("")
    const [error,setError]=useState("")
    let [reSend,setReSend]=useState(-1)
    const  [code,setCode]=useState("")
    const [loader,setLoader]=useState(false)
    const [codeRequest,setCodeRequest] = useState(false);

    useEffect(()=> {
        if(number && number.length > 3){
            let length = number.toString().length;
            setPhone(prefix+' '+(new Array(length-2)).join("*").concat(number.substring(length-3,2)))
        }

    },[number,prefix])

    useEffect(()=>{
        setError(err)
    },[err])

    useEffect(()=>{

        onResend();

        const otpLoader = ev.subscribe('verifyOtp',setLoader)
        return ()=> {
            otpLoader.unsubscribe()
        }
        //return ()=>{eventEmitter.removeListener("recover",e=>setShow(false))}
    },[])

    const onResend =()=>{
        Actions.User.resendOtp({permitAll:permitAll,send:send.concat("?type={type}&prefix={prefix}&value={value}"),type:"mobile",prefix:parseInt(prefix),value:number,additionalParams:additionalParams,loader:setLoader})
            .then(response=>{
                if(response.status){
                    setCode("")
                    setReSend(response.data.data.remaining);
                    setCodeRequest(true);
                }else {
                    setError('error');
                    setCodeRequest(false);
                }
            })
    }
    const onVerify =()=>{
        if(code){
            Actions.User.verifyOtp({
                verify:verify.concat("?type={type}&prefix={prefix}&value={value}&otp={otp}"),
                type:"mobile",prefix:prefix,value:number,otp:code,
                additionalParams:additionalParams,
                loader:setLoader,
                permitAll:permitAll
            })
                .then(response=>{
                    if(response.status){
                        save(true);
                        setError('')
                    }else {
                        setError('error')
                        save(false)
                    }

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
        <PLXModal title={title?title:t('Phone Verification')}
                  onClose={()=>onClose()}
                  contentStyle={{maxWidth:'500px' }}>
            <form onSubmit={e=>{
                e.preventDefault();
                if(!codeRequest){
                    window.pushEvent('Please Request SMS Code','error');
                    return;
                }
                if(!code){
                    window.pushEvent("Incorrect sms code","error");
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
                    <span className="phone-num">{phone}</span>. {t("Please enter the code in the field below to confirm")}:
                </p>
                <div className="input-label-border">
                    <input type="text" name="code" id="code" value={code} onChange={e=>setCode(e.target.value)} className="for-confirm"/>
                    <label htmlFor="code">{t("SMS Code")}</label>
                    {
                        reSend!==-1? <span className="timeout">{reSend}</span>: <button type="button" className="btn-confirm" onClick={()=>onResend()}>{t("Send")}</button>
                    }
                </div>
                <p style={{color:"red"}}>{error}</p>
                <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden'}}>
                    {loader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                    {t("Confirm")}
                </button>
            </form>
        </PLXModal>
    )

}
MobileVerificationModal.propTypes = {
    //title:PropTypes.string,
    number:PropTypes.string,
    prefix:PropTypes.string,
    err:PropTypes.string,
    onSubmit:PropTypes.func,
    send:PropTypes.string,
    save:PropTypes.func,
    additionalParams:PropTypes.object
}
MobileVerificationModal.defaultValues = {
    //title:"Phone Verification",
    number:'',
    prefix:'+995',
    err:"",
    onSubmit:(_)=>console.log(_),
    save:(_)=>console.log(_),
    send:"",
    additionalParams:{}
}
