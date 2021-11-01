import React, {useState} from "react";
import {close} from "../../../assets/img/icons/icons";
import _ from 'lodash'
import {Actions} from "../../../core";
import "./signUp.scss"
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

    const [signUpForm,setSignUpForm]=useState({
        mail:"",
        firstName:"",
        lastName:"",
        mobilePrefix:1,
        mobile:"",
        countryCode:"VGB",
        currencyCode:840,
        password:"",
        password2:""
    })
    const [terms,setTerms]=useState(false)
    const [termsError,setTermsError]=useState(false);
    const [passType, setPassType] = useState({
        pass1:'password',
        pass2:'password'
    });
    const togglePassType=(pass)=>{
        if(pass === 'pass1'){
            setPassType(passType.pass1 === 'text'?{...passType,pass1:'password'}:{...passType,pass1:'text'})
        }else{
            setPassType(passType.pass2 === 'text'?{...passType,pass2:'password'}:{...passType,pass2:'text'})
        }

        console.log(pass)
    }

    const [errors,setErrors]=useState([])
    const onSignUp=()=>{
        let error = _.chain(signUpForm).map((v,k)=>{ return  {key:k,value:v}}).filter(v=>!v.value).map(v=>v.key).value();
        if(signUpForm.password.trim().length<6 || signUpForm.password !== signUpForm.password2){
            error=[...error,"password","password2"]
        }
        if(error.length>0 || !terms){
            setTermsError(terms? false:true)
            setErrors([...error])
            if(error.length===2 && error[0]==="password" && error[1]==="password2"){
                alert("Passwords do not match")
            }

        }else{
            localStorage.removeItem("GRD_access_token")
            Actions.User.signUp(signUpForm).then(response=>{
                if(response.status){
                    document.getElementById("close-sign-up").click();
                    document.getElementById("signIn-btn").click();
                    alert("Registration completed successfully")
                }
            })
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
                        <div className="modal-title">Sign Up</div>
                    </div>
                    <form onSubmit={(event)=>{
                        event.preventDefault();
                        onSignUp();
                    }} className="signUp-form">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("firstName")}`}>
                                    <input type="text" name="name" id="name"
                                           value={signUpForm.firstName}
                                           onChange={event => setSignUpForm({...signUpForm,firstName:event.target.value})}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("lastName")}`}>
                                    <input type="text" name="surname" id="surname"
                                           value={signUpForm.lastName}
                                           onChange={event => setSignUpForm({...signUpForm,lastName:event.target.value})}
                                    />
                                    <label htmlFor="surname">Surname</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("mail")}`}>
                                    <input type="email" name="email" id="email"
                                           value={signUpForm.mail}
                                           onChange={event => setSignUpForm({...signUpForm,mail:event.target.value})}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6" style={{display:"flex"}}>
                                <div className="input-label" style={{width:"150px"}}>
                                    <select className="select2" placeholder="Code"
                                            value={signUpForm.mobilePrefix}
                                            onChange={event => setSignUpForm({...signUpForm,mobilePrefix:event.target.value})}
                                    >
                                        {
                                            _.map(MobilePrefixList, (v,k)=><option key={k} value={v.id}>{v.prefix}</option>)
                                        }
                                    </select>
                                    <label htmlFor="phone">Prefix</label>
                                </div>
                                <div className={`input-label ${error("mobile")}`} style={{width:"100%",marginLeft:'10px'}}>
                                    <input type="number" name="phone" id="phone"
                                           value={signUpForm.mobile}
                                           onChange={event => setSignUpForm({...signUpForm,mobile:event.target.value})}
                                    />
                                    <label htmlFor="phone">Phone</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="select-label" >
                                    <select className="select2" placeholder="Country"
                                            value={signUpForm.countryCode}
                                            onChange={event => setSignUpForm({...signUpForm,countryCode:event.target.value})}
                                    >
                                        {
                                            _.map(CountryList, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="select">Country</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="select-label">
                                    <select className="select2" placeholder="Currency"
                                            value={signUpForm.currencyCode}
                                            onChange={event => setSignUpForm({...signUpForm,currencyCode:event.target.value})}
                                    >
                                        {
                                            _.map(CurrencyList, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="select">Currency</label>
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
                                    <label htmlFor="password">Password</label>
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
                                    <label htmlFor="confirmPassword">Repeat Password</label>
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
                                    By clicking sign up, you accept our <span style={{textDecoration:'underline'}}>Terms & Conditions</span> and that you are over 18 years old.
                                </label>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn-primary">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignUp;
