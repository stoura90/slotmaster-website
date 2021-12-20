import React, {useEffect, useState} from "react";
import {close} from "../../../assets/img/icons/icons";
import _ from 'lodash'
import {Actions, useTranslation} from "../../../core";
import "./signUp.scss"
import {useParams} from "react-router-dom";
import Verification from "../../verification";
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

const SignUp =() =>{
    const {t} = useTranslation()
    const [signUpError,setSignUpError]=useState("")
    const [signUpForm,setSignUpForm]=useState({
        mail:"",
        //firstName:"",
        //lastName:"",
        mobilePrefix:1,
        mobile:"",
        countryCode:"VGB",
        //currencyCode:840,
        password:"",
        password2:"",
        username:""
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
    const togglePassType=(pass)=>{
        if(pass === 'pass1'){
            setPassType(passType.pass1 === 'text'?{...passType,pass1:'password'}:{...passType,pass1:'text'})
        }else{
            setPassType(passType.pass2 === 'text'?{...passType,pass2:'password'}:{...passType,pass2:'text'})
        }

    }

    const [errors,setErrors]=useState([])

    useEffect(()=>{
        if(!primaryContact.email ){
            setErrors([...errors.filter(v=>v!=='mail')])
        }
        if(!primaryContact.phone ){
            setErrors([...errors.filter(v=>v!=='mobile')])
        }
    },[primaryContact])

    const onSignUp=()=>{
        setSignUpError("")
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
                console.log(v)
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
            setTermsError(terms? false:true)
            setErrors([...error])
            if(error.length===2 && error[0]==="password" && error[1]==="password2"){
                //alert("Passwords do not match")
                alert("Password should contain at least 6 symbols")
            }
        }else{

            if(!confirmed){
                if(!primaryContact.phone && !primaryContact.email){
                    alert('Chose Verification Method');
                }else{
                    if(primaryContact.phone){
                        document.getElementById('btn-confirm-phone').click();
                        return
                    }
                    if(primaryContact.email){
                        document.getElementById('btn-confirm-email').click();
                    }
                }
            }else{
                localStorage.removeItem("GRD_access_token")
                Actions.User.signUp(signUpForm).then(response=>{
                    if(response.status){
                        document.getElementById("close-sign-up").click();
                        document.getElementById("signIn-btn").click();
                        alert("Registration completed successfully")
                    }else{
                        setSignUpError(response.data)
                    }
                })
            }


        }

    }
    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }



    return (
        <div className="modal fade"
             id="SignupModal"
             tabIndex="-1"
             aria-labelledby="SignupModalLabel"
             aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered auth-modal sign-up">
                <div className="modal-content">
                    <div className="modal-head">
                        <button className="close"  id={"close-sign-up"} data-bs-dismiss="modal">
                            <img src={close} alt="Close modal"/>
                        </button>
                        <div className="modal-title">{t("Sign Up")}</div>
                    </div>
                    <form onSubmit={(event)=>{
                        event.preventDefault();
                        onSignUp();
                    }} className="signUp-form">
                        <div className="row">
                            {/*<div className="col-12 col-md-6">
                                <div className={`input-label ${error("firstName")}`}>
                                    <input type="text" name="firstName" id="name"
                                           value={signUpForm.firstName}
                                           onChange={event => setSignUpForm({...signUpForm,firstName:event.target.value})}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("lastName")}`}>
                                    <input type="text" name="lastName" id="surname"
                                           value={signUpForm.lastName}
                                           onChange={event => setSignUpForm({...signUpForm,lastName:event.target.value})}
                                    />
                                    <label htmlFor="surname">Surname</label>
                                </div>
                            </div>*/}
                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("username")}`}>
                                    <input type="text" name="username" id="username"
                                           value={signUpForm.username}
                                           onChange={event => setSignUpForm({...signUpForm,username:event.target.value})}
                                    />
                                    <label htmlFor="surname">{t("Username")}</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">

                                <div className="select-label" style={{width:"100%"}}>
                                    <select className="select2" placeholder="Country"
                                            value={signUpForm.countryCode}
                                            onChange={event => setSignUpForm({...signUpForm,countryCode:event.target.value})}
                                    >
                                        {
                                            _.map(CountryList, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="select">{t("Country")}</label>
                                </div>

                            </div>
                            <div className="col-12 col-md-6" >
                                <label htmlFor="phone-primary">
                                    <input type="checkbox" id={'phone-primary'} value={primaryContact.phone} checked={primaryContact.phone} onChange={e =>{
                                        setPrimaryContact({...primaryContact,phone:!(e.target.value === "true")});
                                    } }/>&nbsp; {t("Phone Verification")}
                                </label>
                                <div style={{display:"flex"}} className={`${primaryContact.phone?'':'disable-phone'}`}>
                                    <div className="input-label" style={{width:"150px"}}>
                                        <select className="select2" placeholder="Code"
                                                value={signUpForm.mobilePrefix}
                                                onChange={event => setSignUpForm({...signUpForm,mobilePrefix:event.target.value})}
                                        >
                                            {
                                                _.map(MobilePrefixList, (v,k)=><option key={k} value={v.id}>{v.prefix}</option>)
                                            }
                                        </select>
                                        <label htmlFor="phone">{t("Prefix")}</label>
                                    </div>

                                    <div className={`input-label ${error("mobile")}`} style={{width:"100%",marginLeft:'10px'}}>
                                        <input type="number" name="phone" id="phone"
                                               value={signUpForm.mobile}
                                               onChange={event => setSignUpForm({...signUpForm,mobile:event.target.value})}
                                        />
                                        <label htmlFor="phone">{t("Phone")}</label>
                                    </div>
                                </div>

                            </div>
                            <div className="col-12 col-md-6" >
                                {/*<div className="select-label" style={{width:"150px" }}>
                                    <select className="select2" placeholder="Currency"
                                            value={signUpForm.currencyCode}
                                            onChange={event => setSignUpForm({...signUpForm,currencyCode:event.target.value})}
                                    >
                                        {
                                            _.map(CurrencyList, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="select">Currency</label>
                                </div>*/}
                                <label htmlFor="email-primary">
                                    <input type="checkbox" id={'email-primary'} value={primaryContact.email} checked={primaryContact.email} onChange={e =>{
                                        setPrimaryContact({...primaryContact,email:!(e.target.value === "true")});
                                    } }/>&nbsp; {t("Email Verification")}
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

                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("password")}`}>
                                    <input type={passType.pass1}
                                           name="password"
                                           id="password"
                                           value={signUpForm.password}
                                           onChange={event => setSignUpForm({...signUpForm,password:event.target.value})}
                                    />
                                    <label htmlFor="password">{t("Password")}</label>
                                    <div className={`toggle-password ${passType.pass1==='text'?'active':'hide'}`} onClick={()=>{togglePassType('pass1')}}/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("password2")}`}>
                                    <input
                                        type={passType.pass2}
                                        name="confirm-password"
                                        id="confirmPassword"
                                        value={signUpForm.password2}
                                        onChange={event => setSignUpForm({...signUpForm,password2:event.target.value})}
                                    />
                                    <label htmlFor="confirmPassword">{t("Repeat Password")}</label>
                                    <div className={`toggle-password ${passType.pass2==='text'?'active':'hide'}`} onClick={()=>{togglePassType('pass2')}}/>
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="terms-and-conditions" className={`terms ${termsError?'error-text':''}`}>

                                    <input type="checkbox" id={'terms-and-conditions'} checked={terms} onChange={(_) =>{
                                        setTerms(!terms)
                                        if(!terms){
                                            setTermsError(false)
                                        }
                                    } }/>&nbsp;
                                    {t("By clicking sign up, you accept our")} <span style={{textDecoration:'underline'}}><a href="/ka/terms">{t("Terms & Conditions")}</a></span> {t("and that you are over 18 years old")}
                                </label>
                            </div>
                            <div className={"error-text"}>{t(signUpError)}</div>
                            <div className="col-12">
                                <button type="submit" className="btn-primary">{t("Sign Up")}</button>
                            </div>
                        </div>
                    </form>
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
                </div>
            </div>
            <Verification.MobileVerificationModal prefix={'+'+signUpForm.mobilePrefix} number={signUpForm.mobile}/>
            <Verification.EmailVerificationModal email={signUpForm.mail}/>

        </div>
    )
}
export default SignUp;
