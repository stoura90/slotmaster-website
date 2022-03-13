import {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import PLXModal from "../../modal/PLXModal";
import {SvgDot} from "../../index";
import './ChangePassword.scss';
import {useOTP} from "../../../core/hooks/useOTP";
import _ from "lodash";

window.reSendInterval=null;
const ChangePassword = ({title,email,err,onSubmit,onClose,send,save,verify,additionalParams,permitAll=false})=>{
    const {t} = useTranslation();
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [loader,setLoader]=useState(false)
    const [infoData,setInfoData]=useState({
        currentPass:'',
        pass1:'',
        pass2:''
    })
    const [passType, setPassType] = useState({
        currentPass:'password',
        pass1:'password',
        pass2:'password'
    });




    /*const onVerify =()=>{
        if(code){
            Actions.User.verifyOtp({permitAll:permitAll,verify:verify.concat("?type={type}&prefix={prefix}&value={value}&otp={otp}"),type:"email",prefix:"",value:email,otp:code,additionalParams:additionalParams, loader:setLoader})
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
    },[reSend])*/
    const togglePassType=(pass)=>{
        setPassType(passType[pass] === 'text'?{...passType,[pass]:'password'}:{...passType,[pass]:'text'})
    }

    const changePassword=()=>{

        //if(infoData.currentPass === '' || infoData.pass1 === infoData.pass2){
        //    window.pushEvent('wrong password')
        //    return;
        //}

        MULTI({
            title:t('Confirm Operation'),
            send:"/os/v1/api/secured/otp/profile-info-password-change",
            save:({code,sourceId})=>{
                if(code){
                    Actions.User.change_password({data:{
                            otp:code,
                            sourceId:sourceId,
                            oldPassword:infoData.currentPass,
                            newPassword:infoData.pass1,
                            newPassword2:infoData.pass2
                        },loader:"verifyOtp"}).then(response=>{
                        //setSecurityQuestions((response.status && response.data?response.data?.data:[]))
                        if(response.status){
                            window.pushEvent(t("The operation was performed successfully"),"success");
                            CLOSE();
                            onClose();
                            //history.push(`/${lang}/account/info`)
                        }else{
                            console.log("catch")
                            ERROR({error:t("error")})
                        }
                    }).catch(e=>{
                        console.log("catch")
                        ERROR({error:t("error")})
                    })
                }

            }
        })

    }

    return (
        <PLXModal title={title} onClose={()=>onClose()} contentStyle={{maxWidth:'360px'}}>
            <form onSubmit={e=>{
                e.preventDefault();
                changePassword();
            }} className="confirm-form password-change">

                <div className="new-input-label" >
                    <div className="input-box">
                        <input type={passType.currentPass} name="password" id="currentPass"
                               value={infoData.currentPass} onChange={event => setInfoData({...infoData,currentPass:event.target.value})}
                        />
                        <label htmlFor="currentPass">{t("Current Password")}</label>
                        <div className={`toggle-password ${passType.currentPass==='text'?'active':'hide'}`} onClick={()=>{togglePassType('currentPass')}}/>
                    </div>

                    <span className="characters-controll">Must contain at least 6 characters</span>
                </div>
                <div className="new-input-label" >
                    <div className="input-box">
                        <input type={passType.pass1} name="password" id="pass1"
                               value={infoData.pass1} onChange={event => setInfoData({...infoData,pass1:event.target.value})}
                        />
                        <label htmlFor="pass1">{t("New Password")}</label>
                        <div className={`toggle-password ${passType.pass1==='text'?'active':'hide'}`} onClick={()=>{togglePassType('pass1')}}/>
                    </div>
                    <span className="characters-controll wrong">Must contain at least 6 characters</span>
                </div>
                <div className="new-input-label" >
                    <div className="input-box">
                        <input type={passType.pass2} name="password" id="pass2"
                               value={infoData.pass2} onChange={event => setInfoData({...infoData,pass2:event.target.value})}
                        />
                        <label htmlFor="pass2">{t("Confirm Password")}</label>
                        <div className={`toggle-password ${passType.pass2==='text'?'active':'hide'}`} onClick={()=>{togglePassType('pass2')}}/>
                    </div>
                    <span className={`characters-controll success`}>Must contain at least 6 characters</span>
                </div>



                <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden',marginLeft:'0'}}>
                    {loader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                    {t("Save")}
                </button>
            </form>
        </PLXModal>
    )


}
export default ChangePassword;

// (passType.pass2.length > 0 && passType.pass2.length < 6)?'warn':'success'