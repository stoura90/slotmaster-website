import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {Verification} from "../../index";

const countries =[
    { id:"VGB",value:"British Virgin Islands"},
    { id:"BRN",value:"Brunei Darussalam"},
    { id:"BGR",value:"Bulgaria"},
    { id:"BFA",value:"Burkina Faso"},
    { id:"BDI",value:"Burundi"}
]
const curencies =[
    { id:"840",value:"US Dollar"},
    { id:"978",value:"Euro"},
    { id:"981",value:"Lari"},
    { id:"643",value:"Russian Ruble"},
]
const questions = [
    { id:1,value:"What is your mother\'s maiden name?"},
    { id:2,value:"What was your first pet?"},
    { id:3,value:"What was the model of your first car?"},
    { id:4,value:"In what city were you born?"},
]

const Information = () => {
    const {t} = useTranslation()
    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        phone:'',
        lastName:'',
        username:'',
        currency: "",
        city:'',
        answer:'',
        country:"",
        question: {id:0, value:'empty'}
    });
    const [status,setStatus]=useState({
        status:"",
        msg:""
    })
    useEffect(()=>{
        getInfo()

    },[])
    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){
                setInfoData(response.data.data)
                console.log(response.data.data)
            }
        })
    }
    const [errors,setErrors]=useState([])

    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }


    const onUpdate = ()=>{
        let error = _.chain(infoData).map((v,k)=>{ return  {key:k,value:v}}).filter(v=>!v.value).map(v=>v.key).value();


        if(error.length>0){
            setErrors([...error])
        }else{
            Actions.User.updateInfo({data:infoData}).then(response=>{
                setTimeout(()=>{
                    setStatus({
                        ...status,
                        status:'',
                        msg:''
                    })
                },2000)

                console.log(response)

                if(response.status){
                    setStatus({
                        ...status,
                        status:'success',
                        msg:t('The information was successfully updated')
                    })
                }else {
                    setStatus({
                        ...status,
                        status:"error",
                        msg:t("An error occurred while updating the information")
                    })
                }
            })
        }

    }
    return (
        <>
            <div className="tab-content" id="accountTabContent">
                <div
                    className="tab-pane fade show active"
                    id="personal"
                    role="tabpanel"
                    aria-labelledby="personal-tab"
                >
                    <div className="account-tab-inner">
                        <div className="tab-headline">{t("Personal Data")}</div>
                        <ul className="mb-sub-tabs nav nav-tabs d-md-none" id="myTab" role="tablist">
                            <li role="presentation">
                                <button
                                    className="item active"
                                    id="information-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#information"
                                    type="button"
                                    role="tab"
                                    aria-controls="information"
                                    aria-selected="true"
                                >
                                    {t("Information")}
                                </button>
                            </li>
                            <li role="presentation">
                                <button
                                    className="item"
                                    id="security-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#security"
                                    type="button"
                                    role="tab"
                                    aria-controls="security"
                                    aria-selected="false"
                                >
                                    {t("Security")}
                                </button>
                            </li>
                        </ul>


                        <form onSubmit={e=>{
                            e.preventDefault()

                            onUpdate();

                        }} className="personal-data">
                            <div className="tab-content row">
                                <div
                                    className="col-12 col-md-8 tab-pane show active"
                                    id="information"
                                    role="tabpanel"
                                    aria-labelledby="information-tab"
                                >
                                    <div className="row personal-row">
                                        <div className="col-12 d-none d-md-flex">
                                            <div className="form-title">{t("Information")}</div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border ${error("mobile")}`}  >
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
                                                    infoData?.additions?.is_mobile_verified?<span className="confirmed">{t("Confirmed")}</span>:
                                                        <button
                                                            type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#confirmPhone"
                                                            className="btn-confirm"
                                                        >
                                                            {t("Confirm")}
                                                        </button>
                                                }
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
                                                    infoData?.additions?.is_email_verified?<span className="confirmed">Confirmed</span>:
                                                        <button
                                                            type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#confirmEmail"
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
                                                }} value={infoData?.country?.iso3} className="select2" placeholder="Country" id="account">
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
                                                }} value={infoData.currency.iso} className="select2" placeholder="Currency" id="account">
                                                    <option value={""}>{t("Choose Currency")} </option>
                                                    {
                                                        _.map(curencies,(v,k)=><option key={k} value={v.id}>{v.value}</option>)
                                                    }
                                                </select>
                                                <label htmlFor="select">{t("Currency")}</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div
                                    className="col-12 col-md-4 tab-pane"
                                    id="security"
                                    role="tabpanel"
                                    aria-labelledby="security-tab"
                                >
                                    <div className="row personal-row">
                                        <div className="col-12 d-none d-md-flex">
                                            <div className="form-title">{t("Security")}</div>
                                        </div>
                                        <div className="col-12 order-2 order-md-1">
                                            <div className="select-label-border">
                                                <select onChange={e => {
                                                    setInfoData({...infoData,question:e.target.value})
                                                }} selValue={infoData.question} value={infoData?.question} className="select2" placeholder={t("Secret question")} id="account">
                                                    <option value={""}>Choose Question </option>
                                                    {
                                                        _.map(questions, (v,k)=> <option value={v.id} key={k}>{v.value}</option>)
                                                    }

                                                </select>
                                                <label htmlFor="select">{t("Secret question")}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 order-3 order-md-2">
                                            <div className="input-label-border">
                                                <input onChange={e => setInfoData({...infoData,answer:e.target.value})} value={infoData.answer} type="text" name="secret-answer" id="secretAnswer"/>
                                                <label htmlFor="secretAnswer">{t("Secret answer")}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 order-1 order-md-3">
                                            <button
                                                className="btn-change-password"
                                                data-bs-toggle="modal"
                                                data-bs-target="#passwordModal"
                                                type="button"
                                            >
                                                {t("Change Password")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{color:`${status.status ==="success"? 'green':'red'}`}}>{status.msg}</div>
                            <button type="submit" className="btn-primary">{t("Save")}</button>
                        </form>


                    </div>
                </div>
            </div>
            <Verification.MobileVerificationModal number={infoData.mobile}/>
            <Verification.EmailVerificationModal email={infoData.email}/>
        </>

    )
}

export default Information;
