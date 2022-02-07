import React, {useEffect, useState} from "react";
import _ from 'lodash'
import {Actions, useTranslation} from "../../../core";
import "./signUp.scss"

import {useOTP} from "../../../core/hooks/useOTP";
import PLXModal from "../../modal/PLXModal";

import {SvgDot} from "../../index";
import Http from "../../../core/http/http2";
import {UseEvent} from "../../../core/hooks/useEvent";



const MobilePrefixList=[
    {id:1,prefix: "+1"},
    {id:673,prefix: "+673"},
    {id:359,prefix: "+359"},
    {id:226,prefix: "+226"},
    {id:257,prefix: "+257"}
]
const CountryList=[
    {id:"VGB",name: "British Virgin Islands"},
    {id:"BRN",name: "Brunei Darussalam"},
    {id:"BGR",name: "Bulgaria"},
    {id:"BFA",name: "Burkina Faso"},
    {id:"BDI",name: "Burundi"},
]
const SignUp =() =>{
    const {t,i18n} = useTranslation();
    const otp = useOTP();
    const ev = UseEvent();

    const [signUpLoader,setSignUpLoader]=useState(false);
    const [signUpError,setSignUpError]=useState("")
    const [otpDialog,setOtpDialog]=useState(null)
    const [signUpForm,setSignUpForm]=useState({
        mail:"",
        //firstName:"",
        //lastName:"",
        mobilePrefix:"1",
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
        phone:false,
        email:true
    });

    const [errors,setErrors]=useState([])

    const [show,setShow] = useState(false);

    useEffect(()=>{
        setSignUpForm({
            mail:"",
            //firstName:"",
            //lastName:"",
            mobilePrefix:"1",
            mobile:"",
            countryCode:"VGB",
            //currencyCode:840,
            password:"",
            password2:"",
            username:""
        });

        const signUpFormEvent= ev.subscribe("signUp",setShow)
        const otpLoader = ev.subscribe('verifyOtp',setSignUpLoader)

        return ()=>{
            signUpFormEvent.unsubscribe()
            otpLoader.unsubscribe()

        }

        //eventEmitter.on("signUp",setShow);
        //Http.subscribeLoader("registration-loader",setLoader);
        //setLoader(false);
        //return ()=>{eventEmitter.removeListener("recover",e=>setShow(false))}
        //return ()=>{
        //    Http.unsubscribeLoader("registration-loader",setLoader)
        //}

    },[])
    useEffect(()=>{
        setSignUpForm({
            mail:"",
            //firstName:"",
            //lastName:"",
            mobilePrefix:"1",
            mobile:"",
            countryCode:"VGB",
            //currencyCode:840,
            password:"",
            password2:"",
            username:""
        });
        setTerms(false);
        setErrors([]);
    },[show])

    useEffect(()=>{
        if(!primaryContact.email ){
            setErrors([...errors.filter(v=>v!=='mail')])
        }
        if(!primaryContact.phone ){
            setErrors([...errors.filter(v=>v!=='mobile')])
        }
    },[primaryContact])
    useEffect(()=>{
        console.log('otpDialog',otpDialog)
        if(otpDialog){
            if(otpDialog==="mail"){
                otp.EMAIL({
                    email:signUpForm.mail,
                    send:"/us/v2/api/reg/otp/get",
                    save:code=>{
                        if(code){
                            onSignUp({...signUpForm,otp:code});
                        }

                    }
                })
            }
            else{
                //eventEmitter.emit('phone',true);
                otp.PHONE({
                    prefix:signUpForm.mobilePrefix,
                    number:signUpForm.mobile,
                    send:"/us/v2/api/reg/otp/get",
                    save:code=>{
                        if(code){
                            onSignUp({...signUpForm,otp:code});
                        }
                    }
                })
            }
        }
    },[otpDialog])

    const onSignUp=(signUpForm)=>{

         window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'register'}).then(async(token)=> {
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
                     //alert(t("Password should contain at least 6 symbols"));
                     window.top.pushEvent('Password should contain at least 6 symbols','error');
                 }

             }else{
                 if(!confirmed){
                     if(!primaryContact.phone && !primaryContact.email){
                         //alert('Chose Finances Method');
                         window.top.pushEvent('Chose Finances Method','error');

                         return;
                     }
                 }
                 localStorage.removeItem("GRD_access_token")
                 Actions.User.signUp({data:{...signUpForm,token:token},loader:"verifyOtp"}).then(response=>{
                     // data:loginForm,loader:setSignInLoader
                     if(response.status){
                         //document.getElementById("close-sign-up").click();
                         //document.getElementById("signIn-btn").click();
                         window.top.pushEvent('Registration completed successfully','success');
                         //alert("Registration completed successfully")
                         otp.CLOSE();
                         ev.emit('signUp',false);
                         ev.emit('signIn',true);

                     }else{
                         if(response?.error?.data){
                             let key = _.keys(response?.error?.data)[0];
                             let val = response?.error?.data[key];
                             if(key==="otp"){
                                 if(['mail',"mobile"].indexOf(val)>-1){
                                     setOtpDialog(val)
                                 }else{
                                     window.top.pushEvent('Incorect SMS Code Please Check Sending SMS','error');
                                 }
                             }else{
                                 window.top.pushEvent(key+': '+val,'error');
                                 if(errors.indexOf(key)===-1){
                                     setErrors([...errors,key])
                                 }
                             }

                         }
                         //setSignUpError(response?.error?.message);

                     }
                 }).catch(reason => {console.log(reason)})
                 /*if(!confirmed){
                     if(!primaryContact.phone && !primaryContact.email){
                         alert('Chose Finances Method');
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

                 }*/


             }
         }).catch(ex=>{ console.log(ex)})

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

    return show && (
        <PLXModal title={t("Sign Up")} onClose={()=>setShow(false)} dialogStyle={{maxWidth:'600px'}} contentStyle={{width:'600px'}}>
            <form style={{marginTop:'20px'}} onSubmit={(event)=>{
                event.preventDefault();

                onSignUp(signUpForm);
            }} className="signUp-form">
                <div className="row"s>
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
                    {/*<div className="col-12 col-md-6">

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

                    </div>*/}
                    {/*<div className="col-12 col-md-6" >
                        <label htmlFor="phone-primary">
                            <input type="checkbox" id={'phone-primary'} value={primaryContact.phone} checked={primaryContact.phone} onChange={e =>{
                                setPrimaryContact({...primaryContact,phone:!(e.target.value === "true")});
                            } }/>&nbsp; {t("Phone Finances")}
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

                    </div>*/}
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
                        {/*<label htmlFor="email-primary">
                            <input type="checkbox" id={'email-primary'} value={primaryContact.email} checked={primaryContact.email} onChange={e =>{
                                setPrimaryContact({...primaryContact,email:!(e.target.value === "true")});
                            } }/>&nbsp; {t("Email Finances")}
                        </label>*/}
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
                            {t("By clicking sign up, you accept our")} <span style={{textDecoration:'underline'}}><a href={`/${i18n.language}/terms`}>{t("Terms & Conditions")}</a></span> {t("and that you are over 18 years old")}
                        </label>
                    </div>
                    <div className={"error-text"}>{t(signUpError)}</div>
                    <div className="col-12">
                        <button type="submit" className="btn-primary" style={{width:'100%',position:'relative',overflow:'hidden'}}>
                            {signUpLoader && <SvgDot contentStyle={{background:'#ffcb39'}}/> }
                            {t("Sign Up")}
                        </button>
                    </div>
                </div>
            </form>
        </PLXModal>
    )




}
export default SignUp;
