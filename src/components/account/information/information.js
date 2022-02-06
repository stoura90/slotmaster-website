import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import Select from "../../forms/select/Select"
import {useOTP} from "../../../core/hooks/useOTP";

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
const questions = [
    { id:1,value:"What is your mother\'s maiden name?"},
    { id:2,value:"What was your first pet?"},
    { id:3,value:"What was the model of your first car?"},
    { id:4,value:"In what city were you born?"},
]
const gender = {
    F:"Female",
    M:'Male'
}
const Information = () => {
    const {t} = useTranslation();
    const {otp, PHONE,EMAIL,CLOSE,ERROR} = useOTP();
    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        phone:'',
        gender:'',
        lastName:'',
        username:'',
        currency: "",
        city:'',
        answer:'',
        country:"",
        mobileConfirmed:0,
        emailConfirmed:0,
        hasUserRequestedVerify:null,
        userVerifyStatus:null,
        question: {id:0, value:''}
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
                let res = response.data.data;
                console.log('res[\'mobile\']',res['mobile'])
                setInfoData(_.fromPairs(_.map(infoData, (v,k)=> {
                  switch (k){
                      case 'country':return [k,countries[res[k]]];
                      case 'currency':return [k,currency[res[k]]];
                      case 'gender':return [k,gender[res[k]]];
                      case 'phone':return [k,res['mobile']];
                      default: return [k,res[k]];
                  }
                })))
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


                                        {/*<div className="col-12 col-md-6">
                                            <Select data={gender} value={infoData.gender} label={t("Sex")}
                                                    plData={''} plName={t("Choose Sex")}
                                                    id={'countries'}
                                                    onSelect={(e)=> setInfoData({...infoData,gender:e})}
                                            />
                                        </div>*/}



                                        <div className="col-12 col-md-6 res-12">
                                            <div className={`input-label-border ${error("mobile")}`}  >
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
                                        <div className="col-12 col-md-6 res-12">
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
                                                                                //setInfoData({...infoData,emailConfirmed:1});
                                                                                //CLOSE();
                                                                                PHONE({
                                                                                    title:t('Operation Confirm'),
                                                                                    prefix:infoData.mobilePrefix,
                                                                                    number:infoData.mobile,
                                                                                    additionalParams:{'email':infoData.email},
                                                                                    send:"/us/v2/api/secured/personal/info/otp/get",
                                                                                    verify:"/us/v2/api/secured/personal/info/otp/verify",
                                                                                    save:e=>{
                                                                                        if(e){
                                                                                            setInfoData({...infoData,mobileConfirmed:1});
                                                                                            CLOSE()
                                                                                        }

                                                                                    }
                                                                                });
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
                                            <div className={`input-label-border ${error("dob")}`}>
                                                <input onChange={e => setInfoData({...infoData,dob:e.target.value})} value={infoData.dob} type="date" name="dob" id="dob"/>
                                                <label htmlFor="dob">{t("Date of birth")}</label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <Select data={gender} value={infoData.gender} label={t("Sex")}
                                                    plData={''} plName={t("Choose Sex")}
                                                    id={'countries'}
                                                    onSelect={(e)=> setInfoData({...infoData,gender:e})}
                                            />
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
                                                    onSelect={(e)=> setInfoData({...infoData,country:e})}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Select data={currency} value={infoData.currency} label={t("Currency")}
                                                    plData={''} plName={t("Choose Currency")}
                                                    id={'currency'}
                                                    onSelect={(e)=> setInfoData({...infoData,currency:e})}
                                            />
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
                                            <Select data={questions} value={infoData.question} label={t("Secret question")}
                                                    plData={{id:0,value:''}} plName={t('Choose')}
                                                    id={'question'}
                                                    onSelect={(e)=> setInfoData({...infoData,question:e})}
                                            />
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
        </>
    )
}

export default Information;
