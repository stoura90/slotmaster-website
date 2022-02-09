import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {Verification} from "../../index";
import {Country} from "@microblink/blinkid-in-browser-sdk";
import UploadDoc from "../uploadDoc/uploadDoc";
import {useOTP} from "../../../core/hooks/useOTP";
import Select from "../../forms/select/Select"
import SelectBox from "../../forms/select/NewSelect";
import {useHistory, useParams} from "react-router-dom";

const countries ={
    VGB:"British Virgin Islands",
    BRN:"Brunei Darussalam",
    BGR:"Bulgaria",
    BFA:"Burkina Faso",
    BDI:"Burundi"
}
const currency = {
    USD: "US Dollar",
    EUR: "Euro",
    GEL: "Lari",
    RUB: "Russian Ruble",
}

const passportType= [
    {id: "id_card", title: "ID Card"},
    {id: "passport",title: "Passport"},
    {id: "resident_identification",title: "Resident Identification"},
]

const MobilePrefixList=[
    {id:1,value: "+1"},
    {id:673,value: "+673"},
    {id:359,value: "+359"},
    {id:226,value: "+226"},
    {id:257,value: "+257"}
]
const gender = {
    F:"Female",
    M:'Male'
}
const Confirmation = () => {
    const {t} = useTranslation();
    const {lang} = useParams()
    const history = useHistory()
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        phone:'',
        gender:'',
        dob:"",
        lastName:'',
        username:'',
        currency: "",
        country:"",
        mobileConfirmed:0,
        emailConfirmed:0,
        mobilePrefix:""
    });

    const [documents,setDocuments]=useState({
        "passportType":"",
        "docNumber":"",
        "country": "",
        "doc_expire_date":"",
        "front":"",
        "back":""
    })
    const [status]=useState({
        status:"",
        msg:""
    })
    const [errors,setErrors]=useState([])
    const [step,setStep]=useState(1)
    const [otpSource,setOtpSources]=useState(null)
    useEffect(()=>{
        getInfo()
    },[])

    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){

                if (response?.data?.data?.userVerifyStatus === 2){setStep(2)}

                let res = response.data.data;
                setInfoData(_.fromPairs(_.map(infoData, (v,k)=> {
                    switch (k){
                        case 'country':return [k,countries[res[k]]];
                        case 'currency':return [k,currency[res[k]]];
                        case 'gender':return [k,gender[res[k]]];
                        case 'phone':return [k,res['mobile']];
                        case 'mobilePrefix':return [k,'+'+res['mobilePrefix']];
                        default: return [k,res[k]];
                    }
                })))

                /*const {
                    firstName,
                    email,
                    mobile,
                    lastName,
                    username,
                    currency,
                    dob,
                    gender,
                    country,
                    mobileConfirmed,
                    emailConfirmed,
                    mobilePrefix
                }=response.data.data;
                setInfoData({
                    firstName:firstName,
                    email:email,
                    mobile:mobile,
                    lastName:lastName,
                    username:username,
                    currency: currency,
                    gender: gender,
                    dob:dob,
                    country:country,
                    mobileConfirmed:mobileConfirmed,
                    emailConfirmed:emailConfirmed,
                    mobilePrefix:mobilePrefix
                })*/
            }
        })
    }
    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }
    const nextStep = ()=>{
        setErrors([])
        let error = _.chain(infoData).map((v,k)=>{
            if(["mobileConfirmed","emailConfirmed"].includes(k)){
                return {key:k,value:1}
            }
            return {key:k,value:v}
        }).filter(v=>!v.value).map(v=>v.key).value();
        if(error.length>0){
            setErrors([...error])
        }else{
             setStep(2)
        }
    }
    const finishStep=()=>{
        setErrors([])
        let error = _.chain(documents).map((v,k)=>{
            return {key:k,value:v}
        }).filter(v=>!v.value).map(v=>v.key).value();
        console.log(error)
        if(error.length>0){
            setErrors([...error])
        }else{
            MULTI({
                email:infoData.email,
                send:"/us/v2/api/secured/personal/info/otp",
                title:t('Confirm Operation'),
                save:({code,sourceId})=>{
                    if(code){
                        Actions.User.verification({data:{
                            ...infoData,...documents,otp:code,sourceId:sourceId,gender:infoData.gender==="Female"?'F':'M'

                        },loader:"verifyOtp"}).then(response=>{
                            if(response.status){
                                CLOSE();
                                window.pushEvent(t("The operation was performed successfully"),"success")
                                history.push(`/${lang}/account/info`)
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


       /*     if(otpSource?.type==="email"){
                EMAIL({
                    email:infoData.email,
                    send:"/us/v2/api/secured/personal/info/otp/get",
                    save:code=>{
                        if(code){
                            Actions.User.verification({
                                ...infoData,...documents,otp:code
                            }).then(response=>{
                                if(response.status){
                                    CLOSE();
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
            }else{
                PHONE({
                    prefix:infoData.mobilePrefix,
                    number:infoData.mobile,
                    send:"/us/v2/api/secured/personal/info/otp/get",
                    save:code=>{
                        if(code){
                            Actions.User.verification({
                                ...infoData,...documents,otp:code
                            }).then(response=>{
                                if(response.status){
                                    CLOSE();
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
            }*/


            console.log(otpSource)
            console.log()
        }
    }
    return (
        <>
            <div id="accountTabContent">
                <div
                    className="tab-pane fade show active"
                    id="personal"
                    role="tabpanel"
                    aria-labelledby="personal-tab"
                >
                    <div className="account-tab-inner">
                        <div className="tab-headline">{t("Account Confirmation")}</div>

                        <form onSubmit={e=>{
                            e.preventDefault()

                        }} className="personal-data">
                            <div className="tab-content row">
                                {
                                    step === 1 ? <div
                                        className="col-12 col-md-12 tab-pane show active"
                                        id="information"
                                    >
                                        <div className="row personal-row">
                                            <div className="col-12 d-none d-md-flex">
                                                <div className="form-title">{t("Information")}</div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div style={{display:'flex',width:"100%"}}>
                                                    <div style={{width:"150px",marginRight: '10px'}}>
                                                        <Select data={MobilePrefixList} value={infoData.mobilePrefix} label={t("Prefix")}
                                                            //plData={''} plName={t("Choose Sex")}
                                                                id={'mobilePrefix'}
                                                                onSelect={(e)=> setInfoData({...infoData,mobilePrefix:e})}
                                                        />
                                                    </div>
                                                    <div className={`input-label-border ${error("phone")}`} style={{flex:1,position: "relative"}}>
                                                        <input
                                                            type="number"
                                                            name="phone"
                                                            id="phone"
                                                            className="for-confirm"
                                                            value={infoData.phone}
                                                            onChange={e => setInfoData({...infoData,phone:e.target.value})}
                                                        />
                                                        <label htmlFor="phone">{t("Phone")}</label>
                                                        {
                                                            infoData?.mobileConfirmed===1?<span className="confirmed">{t("Confirmed")}</span>:
                                                                <button
                                                                    type="button"
                                                                    className="btn-confirm"
                                                                    onClick={()=>{
                                                                        if(infoData.mobile.trim().length>0){
                                                                            PHONE({
                                                                                prefix:infoData.mobilePrefix,
                                                                                number:infoData.mobile,
                                                                                send:"/us/v2/api/secured/personal/info/otp/get",
                                                                                verify:"/us/v2/api/secured/personal/info/otp/verify",
                                                                                save:e=>{
                                                                                    if(e){
                                                                                        setInfoData({...infoData,mobileConfirmed:1});
                                                                                        CLOSE()
                                                                                    }

                                                                                }
                                                                            })
                                                                        }
                                                                    }}
                                                                >
                                                                    {t("Confirm")}
                                                                </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div  className={`input-label-border ${error("email")}`}>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="for-confirm"
                                                        value={infoData.email}
                                                        onChange={e => setInfoData({...infoData,email:e.target.value})}
                                                    />
                                                    <label htmlFor="email">Email</label>
                                                    {
                                                        infoData?.emailConfirmed===1?<span className="confirmed">Confirmed</span>:
                                                            <button
                                                                onClick={()=>{
                                                                    if(infoData.email.trim().length>0){
                                                                        EMAIL({
                                                                                email:infoData.email,
                                                                                send:"/us/v2/api/secured/personal/info/otp/get",
                                                                                verify:"/us/v2/api/secured/personal/info/otp/verify",
                                                                                save:e=>{
                                                                                    if(e){
                                                                                        setInfoData({...infoData,emailConfirmed:1});
                                                                                        CLOSE()
                                                                                    }
                                                                                }
                                                                        })
                                                                    }
                                                                }}
                                                                type="button"
                                                                className="btn-confirm"
                                                            >
                                                                {t("Confirm")}
                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div  className={`input-label-border ${error("firstName")}`}>
                                                    <input onChange={e => setInfoData({...infoData,firstName:e.target.value})} value={infoData.firstName} type="text" name="name" id="name"/>
                                                    <label htmlFor="name">{t("Name")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("lastName")}`}>
                                                    <input onChange={e => setInfoData({...infoData,lastName:e.target.value})} value={infoData.lastName} type="text" name="surname" id="surname"/>
                                                    <label htmlFor="surname">{t("Surname")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Select data={gender} value={infoData.gender} label={t("Sex")}
                                                        plData={''} plName={t("Choose Sex")}
                                                        id={'countries'}
                                                        error={error("gender")}
                                                        onSelect={(e)=> setInfoData({...infoData,gender:e})}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("dob")}`}>
                                                    <input onChange={e => setInfoData({...infoData,dob:e.target.value})} value={infoData.dob} type="date" name="dob" id="dob"/>
                                                    <label htmlFor="dob">{t("Date of birth")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("username")}`}>
                                                    <input onChange={e => setInfoData({...infoData,username:e.target.value})} value={infoData.username} type="text" name="username" id="username" placeholder="username"/>
                                                    <label htmlFor="username">{t("Username")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Select data={countries} value={infoData.country} label={t("Country")}
                                                        plData={''} plName={t("Choose Country")}
                                                        id={'countries'}
                                                        error={error("country")}
                                                        onSelect={(e)=> setInfoData({...infoData,country:e})}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Select data={currency} value={infoData.currency} label={t("Currency")}
                                                        plData={''} plName={t("Choose Currency")}
                                                        id={'currency'}
                                                        error={error("currency")}
                                                        onSelect={(e)=> setInfoData({...infoData,currency:e})}
                                                />
                                            </div>

                                        </div>
                                    </div>:null
                                }
                                {
                                    step===2? <div
                                        className="col-12 col-md-12 "
                                    >
                                        <div className="row personal-row">
                                            <div className="col-12 order-3 order-md-2">
                                                <div className="row step2" style={{marginTop:'20px'}}>

                                                    <div className="col-12 col-md-6">
                                                        <SelectBox
                                                            data={passportType}
                                                            placeholder={"Document Type"}
                                                            value={documents.passportType}
                                                            error={error("passportType")}
                                                            onSelect={(e)=> setDocuments({...documents,passportType:e.id})}

                                                        />
                                                       {/* <Select data={passportType} value={documents.passportType} label={t("Document Type")}
                                                                plData={''} plName={t("Choose type")}
                                                                id={'passportType'}
                                                                error={error("passportType")}
                                                                onSelect={(e)=> setDocuments({...documents,passportType:e})}
                                                        />*/}
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <Select data={countries} value={documents.country} label={t("Country")}
                                                                plData={''} plName={t("Choose country")}
                                                                id={'countries'}
                                                                error={error("country")}
                                                                onSelect={(e)=> setDocuments({...documents,country:e})}
                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className={`input-label-border ${error("docNumber")}`}>
                                                            <input type="text" name="docNumber" id="docNumber" value={documents.docNumber} onChange={event => setDocuments({...documents,docNumber:event.target.value})}/>
                                                            <label htmlFor="phone">{t("Document Number")}</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className={`input-label-border ${error("doc_expire_date")}`}>
                                                            <input onChange={e => setDocuments({...documents,doc_expire_date:e.target.value})} value={documents.doc_expire_date} type="date" name="dob" id="dob"/>
                                                            <label htmlFor="dob">{t("Document Expire Date")}</label>
                                                        </div>
                                                    </div>
                                                    <div className={`col-12 col-md-6 ${error("front")}`}>
                                                        <UploadDoc
                                                            id={"front"}
                                                            onSelect={e=>setDocuments({...documents,front:e})}
                                                            title={"Upload a photo of the first spread or passport/ID card front side."}
                                                        />

                                                    </div>
                                                    <div className={`col-12 col-md-6 ${error("front")}`}>
                                                        <UploadDoc
                                                            id={"back"}
                                                            onSelect={e=>setDocuments({...documents,back:e})}
                                                            title={"Upload a photo of the first spread or passport/ID card front side."}
                                                        />
                                                    </div>

                                                    {/*<div className={"error-text"}>{t("error")}</div>*/}

                                                </div>

                                            </div>
                                        </div>
                                    </div>:null
                                }

                            </div>
                        </form>
                        <div className="col-12 col-md-4">
                            <div style={{color:`${status.status ==="success"? 'green':'red'}`}}>{status.msg}</div>
                            <button type="submit" style={{width:'100%'}} className="btn-primary" onClick={()=>{
                                if(step===1){
                                    nextStep()
                                }else{
                                    finishStep()
                                }
                            }}>{t("Confirm And Continue")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmation;
