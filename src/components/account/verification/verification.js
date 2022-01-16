import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {Verification} from "../../index";
import {Country} from "@microblink/blinkid-in-browser-sdk";
import UploadDoc from "../uploadDoc/uploadDoc";
import {useOTP} from "../../../core/hooks/useOTP";

const countries =[
    { id:"VGB",value:"British Virgin Islands"},
    { id:"BRN",value:"Brunei Darussalam"},
    { id:"BGR",value:"Bulgaria"},
    { id:"BFA",value:"Burkina Faso"},
    { id:"BDI",value:"Burundi"}
]
const curencies =[
    { id:"USD",value:"US Dollar"},
    { id:"EUR",value:"Euro"},
    { id:"GEL",value:"Lari"},
    { id:"RUB",value:"Russian Ruble"},
]

const passportType=[
    {id:"",name: ""},
    {id:"id_card",name: "ID Card"},
    {id:"passport",name: "Passport"},
    {id:"resident_identification",name: "Resident Identification"},
]
const MobilePrefixList=[
    {id:1,prefix: "+1"},
    {id:673,prefix: "+673"},
    {id:359,prefix: "+359"},
    {id:226,prefix: "+226"},
    {id:257,prefix: "+257"}
]
const Confirmation = () => {
    const {t} = useTranslation();
    const {otp, PHONE,EMAIL,CLOSE,ERROR} = useOTP();
    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        phone:'',
        gender:'',
        dob:"",
        lastName:'',
        username:'',
        currency: "",
        city:'',
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
        getOtpSources();
    },[])
    const getOtpSources = () =>{
        Actions.Otp.sources().then(response=>{
            if(response){
               let find =  _.find(response,v=>v.preferred);
               if(find){
                   setOtpSources(find)
               }
            }
        })
    }
    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){

                if (response?.data?.data?.userVerifyStatus === 2){setStep(2)}

                const {
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
                })
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

        if(error.length>0){
            setErrors([...error])
        }else{



            if(otpSource?.type==="email"){
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
            }


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
                                                <div className={`input-label-border ${error("mobile")}`}  >
                                                    <div style={{display:'flex',width:"100%"}}>
                                                        <div className="input-label" style={{width:"150px"}}>
                                                            <select className="select2" placeholder="Code"
                                                                    value={infoData.mobilePrefix}
                                                                    onChange={event => setInfoData({...infoData,mobilePrefix:event.target.value})}
                                                            >
                                                                {
                                                                    _.map(MobilePrefixList, (v,k)=><option key={k} value={v.id}>{v.prefix}</option>)
                                                                }
                                                            </select>
                                                            <label htmlFor="phone">{t("Prefix")}</label>
                                                        </div>
                                                        <div   style={{flex:1,position: "relative"}}>
                                                            <input
                                                                type="number"
                                                                name="phone"
                                                                id="phone"
                                                                className="for-confirm"
                                                                value={infoData.mobile}
                                                                onChange={e => setInfoData({...infoData,mobile:e.target.value})}
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
                                                <div className={`select-label-border ${error("gender")}`}>
                                                    <select onChange={e => {
                                                        setInfoData({...infoData,gender:e.target.value})
                                                    }} value={infoData?.gender} className="select2" placeholder="Sex" id="gender">
                                                        <option value={""}>{t("Choose Sex")} </option>
                                                        {
                                                            _.map([{id:'F',value:"Female"},{id:'M',value:"Male"}],  (v,k)=> <option key={k} value={v.id}> {v.value}</option>)
                                                        }
                                                    </select>
                                                    <label htmlFor="gender">{t("Sex")}</label>
                                                </div>
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
                                                <div className={`select-label-border ${error("country")}`}>
                                                    <select onChange={e => {
                                                        setInfoData({...infoData,country:e.target.value})
                                                    }} value={infoData?.country} className="select2" placeholder="Country" id="account">
                                                        <option value={""}>{t("Choose Country")} </option>
                                                        {
                                                            _.map(countries,  (v,k)=> <option key={k} value={v.id}> {v.value}</option>)
                                                        }
                                                    </select>
                                                    <label htmlFor="select">{t("Country")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`select-label-border ${error("currency")}`}>
                                                    <select onChange={e => {
                                                        setInfoData({...infoData,currency:e.target.value})
                                                    }} value={infoData.currency} className="select2" placeholder="Currency" id="account">
                                                        <option value={""}>{t("Choose Currency")} </option>
                                                        {
                                                            _.map(curencies,(v,k)=><option key={k} value={v.id}>{v.value}</option>)
                                                        }
                                                    </select>
                                                    <label htmlFor="select">{t("Currency")}</label>
                                                </div>
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
                                                        <div className={`input-label ${error("passportType")}`} style={{width:"100%"}}>
                                                            <select className="select2" placeholder="passportType" value={documents.passportType} onChange={event => setDocuments({...documents,passportType:event.target.value})}>
                                                                <option  value={""}>{t("Choose type")}</option>
                                                                {
                                                                    _.map(passportType, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                                                }
                                                            </select>
                                                            <label htmlFor="select">{t("Document Type")}</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className={`input-label ${error("country")}`} style={{width:"100%"}}>
                                                            <select className="select2" placeholder="Country" value={documents.country} onChange={event => setDocuments({...documents,country:event.target.value})}>
                                                                <option value={""}>{t("Choose country")}</option>
                                                                {
                                                                    _.map(countries, (v,k)=><option key={k} value={v.id}>{v.value}</option>)
                                                                }
                                                            </select>
                                                            <label htmlFor="select">{t("Country")}</label>
                                                        </div>
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

                                                    <div className={"error-text"}>{t("error")}</div>

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
