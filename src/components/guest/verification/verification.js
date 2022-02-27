import React, {useEffect, useState} from "react";
import {close} from "../../../assets/img/icons/icons";
import _ from 'lodash'
import {Actions, useTranslation} from "../../../core";
import "./verification.scss"
import {Verification} from "../../index";


const MobilePrefixList=[
    {id:1,prefix: "+1"},
    {id:673,prefix: "+673"},
    {id:359,prefix: "+359"},
    {id:226,prefix: "+226"},
    {id:257,prefix: "+257"}
]
const CurrencyList=[
    {id:840,name: "USD"},
    {id:978,name: "EUR"},
    {id:981,name: "GEL"},
    {id:643,name: "RUB"}
]
const CountryList=[
    {id:"VGB",name: "British Virgin Islands"},
    {id:"BRN",name: "Brunei Darussalam"},
    {id:"BGR",name: "Bulgaria"},
    {id:"BFA",name: "Burkina Faso"},
    {id:"BDI",name: "Burundi"},
]
const GenderList=[
    {id:"",name: ""},
    {id:"male",name: "Male"},
    {id:"female",name: "Female"},
]
const passportType=[
    {id:"",name: ""},
    {id:"id_card",name: "ID Card"},
    {id:"passport",name: "Passport"},
    {id:"resident_identification",name: "Resident Identification"},
]

const UserVerification =() =>{
    const {t} = useTranslation()
    const [signUpError,setSignUpError]=useState("")
    const [otpDialog,setOtpDialog]=useState(null)
    const [signUpForm,setSignUpForm]=useState({
        mail:"",
        firstName:"",
        lastName:"",
        mobilePrefix:1,
        mobile:"",
        countryCode:"VGB",
        //currencyCode:840,
        password:"",
        password2:"",
        username:"",
        dob:"",
        gender:"",
        passportType:"",
        docNumber:""
    })
    const [terms,setTerms]=useState(false)
    const [termsError,setTermsError]=useState(false);
    const [confirmed,setConfirmed]=useState(false);
    const [passType, setPassType] = useState({
        pass1:'password',
        pass2:'password'
    });
    const [primaryContact, setPrimaryContact] = useState({
        phone:true,
        email:false
    });
    const [otpError,setOtpError]=useState("");
    const [errors,setErrors]=useState([]);
    const [step,setStep]=useState(1);
    useEffect(()=>{
        if(!primaryContact.email ){
            setErrors([...errors.filter(v=>v!=='mail')])
        }
        if(!primaryContact.phone ){
            setErrors([...errors.filter(v=>v!=='mobile')])
        }
    },[primaryContact])
    useEffect(()=>{
        if(otpDialog){
            document.getElementById(otpDialog==="mail"?"btn-confirm-email":"btn-confirm-phone").click();
        }
    },[otpDialog])
    const onSignUp=(signUpForm)=>{

        setStep(2);
        /*setSignUpError("")
        let error = _.chain(signUpForm)
            .map((v,k)=>{
                return  {key:k,value:v}
            })
            .filter(v=>{
                if(v.key === 'mobile' || v.key === 'mail'){
                    if(v.key === 'mobile' && primaryContact.phone){
                        return v
                    }
                    if(v.key === 'mail' && primaryContact.email){
                        return v
                    }
                    if(!primaryContact.phone && !primaryContact.email){
                        return v
                    }
                } else{return v}
            })
            .filter(
                v=>!v.value
            )
            .map(v=>v.key).value();

        //console.log(error)

        if(signUpForm.password.trim().length<6 || signUpForm.password !== signUpForm.password2){
            error=[...error,"password","password2"]
        }
        if(error.length>0 || !terms){
            setTermsError(!terms)
            setErrors([...error])
            if(error.length===2 && error[0]==="password" && error[1]==="password2"){
                //alert("Passwords do not match")
                alert(t("Password should contain at least 6 symbols"))
            }
        }else{
            console.log('signUpForm',signUpForm);
        }*/

    }
    const togglePassType=(pass)=>{
        if(pass === 'pass1'){
            setPassType(passType.pass1 === 'text'?{...passType,pass1:'password'}:{...passType,pass1:'text'})
        }else{
            setPassType(passType.pass2 === 'text'?{...passType,pass2:'password'}:{...passType,pass2:'text'})
        }

    }
    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }

    return (
        <div className="modal fade"
             id="VerificationModal"
             tabIndex="-1"
             aria-labelledby="VerificationModalLabel"
             aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered auth-modal sign-up">
                <div className="modal-content">
                    <div className="modal-head">
                        <button className="close"  id={"close-sign-up"} data-bs-dismiss="modal">
                            <img src={close} alt="Close modal"/>
                        </button>
                        <div className="modal-title">
                            {
                                step !== 1 && <div className="back-step" onClick={()=>setStep(step-1)}> {'< '}{t("Back")}</div>
                            }
                            {t("User Transactions")}
                        </div>
                    </div>
                    {
                        step === 1 &&
                        <form onSubmit={(event)=>{
                            event.preventDefault();
                            onSignUp(signUpForm);
                        }} className="signUp-form">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className={`input-label ${error("firstName")}`}>
                                        <input type="text" name="firstName" id="name"
                                               value={signUpForm.firstName}
                                               onChange={event => setSignUpForm({...signUpForm,firstName:event.target.value})}
                                        />
                                        <label htmlFor="name">{t("Name")}</label>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className={`input-label ${error("lastName")}`}>
                                        <input type="text" name="lastName" id="surname"
                                               value={signUpForm.lastName}
                                               onChange={event => setSignUpForm({...signUpForm,lastName:event.target.value})}
                                        />
                                        <label htmlFor="surname">{t("Surname")}</label>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className={`input-label ${error("dob")}`}>
                                        <input onChange={e => signUpForm({...signUpForm,dob:e.target.value})} value={signUpForm.dob} type="date" name="dob" id="dob"/>
                                        <label htmlFor="dob">{t("Date of birth")}</label>
                                    </div>
                                </div>


                                <div className="col-12 col-md-6">
                                    <div className="select-label" style={{width:"100%"}}>
                                        <select className="select2" placeholder="Country" value={signUpForm.gender} onChange={event => setSignUpForm({...signUpForm,gender:event.target.value})}>
                                            {
                                                _.map(GenderList, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                            }
                                        </select>
                                        <label htmlFor="select">{t("Gender")}</label>
                                    </div>
                                </div>


                                <div className="col-12 col-md-6" >
                                    <label htmlFor="phone-primary">
                                        <input type="checkbox" id={'phone-primary'} value={primaryContact.phone} checked={primaryContact.phone} onChange={e =>{
                                            setPrimaryContact({...primaryContact,phone:!(e.target.value === "true")});
                                        } }/>&nbsp; {t("Phone Transactions")}
                                    </label>
                                    <div style={{display:"flex"}} className={`${primaryContact.phone?'':'disable-phone'}`}>
                                        <div className="input-label" style={{width:"150px"}}>
                                            <select className="select2" placeholder="Code" value={signUpForm.mobilePrefix} onChange={event => setSignUpForm({...signUpForm,mobilePrefix:event.target.value})}>
                                                {
                                                    _.map(MobilePrefixList, (v,k)=><option key={k} value={v.id}>{v.prefix}</option>)
                                                }
                                            </select>
                                            <label htmlFor="phone">{t("Prefix")}</label>
                                        </div>

                                        <div className={`input-label ${error("mobile")}`} style={{width:"100%",marginLeft:'10px'}}>
                                            <input type="number" name="phone" id="phone" value={signUpForm.mobile} onChange={event => setSignUpForm({...signUpForm,mobile:event.target.value})}/>
                                            <label htmlFor="phone">{t("Phone")}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6" >
                                    <label htmlFor="email-primary">
                                        <input type="checkbox" id={'email-primary'} value={primaryContact.email} checked={primaryContact.email} onChange={e =>{
                                            setPrimaryContact({...primaryContact,email:!(e.target.value === "true")});
                                        } }/>&nbsp; {t("Email Transactions")}
                                    </label>
                                    <div style={{display:"flex"}} className={`${primaryContact.email?'':'disable-email'}`}>
                                        <div className={`input-label ${error("mail")}`} style={{width:"100%"}}>
                                            <input type="email" name="email" id="email"
                                                   value={signUpForm.mail}
                                                   onChange={event => setSignUpForm({...signUpForm,mail:event.target.value})}
                                            />
                                            <label htmlFor="email">{t("Email")}</label>
                                        </div>
                                    </div>
                                </div>


                                {/*<div className="col-12">
                                    <label htmlFor="terms-and-conditions" className={`terms ${termsError?'error-text':''}`}>

                                        <input type="checkbox" id={'terms-and-conditions'} checked={terms} onChange={(_) =>{
                                            setTerms(!terms)
                                            if(!terms){
                                                setTermsError(false)
                                            }
                                        } }/>&nbsp;
                                        {t("By clicking sign up, you accept our")} <span style={{textDecoration:'underline'}}><a href="/ka/terms">{t("Terms & Conditions")}</a></span> {t("and that you are over 18 years old")}
                                    </label>
                                </div>*/}
                                <div className={"error-text"}>{t(signUpError)}</div>
                                <div className="col-12">
                                    <button type="submit" className="btn-primary">{t("Confirm And Continue")}</button>
                                </div>
                            </div>
                        </form>
                    }
                    {
                        step === 2 &&
                        <div className="row step2" style={{marginTop:'20px'}}>

                            <div className="col-12 col-md-6">
                                <div className="select-label" style={{width:"100%"}}>
                                    <select className="select2" placeholder="passportType" value={signUpForm.passportType} onChange={event => setSignUpForm({...signUpForm,passportType:event.target.value})}>
                                        {
                                            _.map(passportType, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="select">{t("Document Type")}</label>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="select-label" style={{width:"100%"}}>
                                    <select className="select2" placeholder="Country" value={signUpForm.countryCode} onChange={event => setSignUpForm({...signUpForm,countryCode:event.target.value})}>
                                        {
                                            _.map(CountryList, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="select">{t("Country")}</label>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("docNumber")}`}>
                                    <input type="number" name="docNumber" id="docNumber" value={signUpForm.docNumber} onChange={event => setSignUpForm({...signUpForm,docNumber:event.target.value})}/>
                                    <label htmlFor="phone">{t("Document Number")}</label>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("dob")}`}>
                                    <input onChange={e => signUpForm({...signUpForm,dob:e.target.value})} value={signUpForm.dob} type="date" name="dob" id="dob"/>
                                    <label htmlFor="dob">{t("Document Expire Date")}</label>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="pass-template">
                                    <p>Upload a photo of the first spread or passport/ID card front side.</p>
                                    <div className="status-box upload">
                                        <span>Upload Document</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="pass-template">
                                    <p>Upload a photo of the first spread or passport/ID card front side.</p>
                                    <div className="status-box wrong">
                                        <span>Something Wrong</span>
                                    </div>
                                    <button>Upload Again</button>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="pass-template">
                                    <p>Upload a photo of the first spread or passport/ID card front side.</p>
                                    <div className="status-box success">
                                        <span>Uploaded Successfully</span>
                                    </div>
                                    <button>Upload Again</button>
                                </div>
                            </div>
                            <div className={"error-text"}>{t(signUpError)}</div>
                            <div className="col-12">
                                <button type="submit" style={{width:'100%'}} className="btn-primary">{t("Confirm And Continue")}</button>
                            </div>
                        </div>
                    }

                </div>
            </div>

            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirmEmail"
                className="btn-confirm"
                id="btn-confirm-email"
                style={{display:'none'}}
            >
                {t("Confirm")}
            </button>
            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirmPhone"
                className="btn-confirm"
                id="btn-confirm-phone"
                style={{display:'none'}}
            >
                {t("Confirm")}
            </button>
{/*

            <Transactions.MobileVerificationModal prefix={'+'+signUpForm.mobilePrefix} number={signUpForm.mobile} err={otpError} onSubmit={code=>onSignUp({...signUpForm,otp:code}) }/>
            <Transactions.EmailVerificationModal email={signUpForm.mail} err={otpError} onSubmit={code=>onSignUp({...signUpForm,otp:code}) }/>
*/}

        </div>
    )
}
export default UserVerification;
