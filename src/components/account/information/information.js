import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {useOTP} from "../../../core/hooks/useOTP";
import ChangePassword from '../../account/changePassword/ChangePassword'
import SelectBox from "../../forms/select/NewSelect";
import {SvgDot} from "../../index";
import PLXModal from "../../modal/PLXModal";




const currency = [
/*
    {  id:'USD',title:"US Dollar" },
*/
    {  id:'EUR',title:"Euro" },
   /* {  id:'GEL',title:"Lari" },
    {  id:'RUB',title:"Russian Ruble" }*/
]

const passportType= [
    {id: "id_card", title: "ID Card"},
    {id: "passport",title: "Passport"},
    {id: "resident_identification",title: "Resident Identification"},
]

const gender = [
    { id:"F",title:"Female",},
    { id:"M",title:"Male",}
]

const Information = () => {
    const {t} = useTranslation();
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [forEdit,setForEdit] = useState({
        email:'',
        mobile:''
    })
    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        mobile:'',
        dob:'',
        gender:'',
        lastName:'',
        username:'',
        currency: "EUR",
        country:"",
        mobileConfirmed:0,
        emailConfirmed:0,
        mobilePrefix:'',
        hasUserRequestedVerify:null,
        verifyStatus:null,
    });
    const [questions, setQuestions] = useState({
        question1:'',
        answer1:'',
        question2:'',
        answer2:''
    });
    const [loader,setLoader]=useState(false)
    const [securityQuestionsLoader,setSecurityQuestionsLoader]=useState(false)
    const [status,setStatus]=useState({
        status:"",
        msg:""
    })
    const [errors,setErrors]=useState([])
    const [openChangePass,setOpenChangePass]=useState(false);
    const [openSecretQuestion,setOpenSecretQuestion]=useState(false);
    const [securityQuestions,setSecurityQuestions]=useState([]);
    const [open2FA,setOpen2FA]=useState(false);
    const [dat2FA,setDat2FA]=useState(false);

    const [otpSource,setOtpSource]=useState('');
    const [countries,setCountries]=useState([])
    const [mobileCode,setMobileCode]=useState([])

    const getSecurityQuestion =(ans={})=>{
        Actions.User.getSecurityQuestion({loader:setSecurityQuestionsLoader})
            .then((response)=>{
                setSecurityQuestions((response.status && response.data?response.data?.data:[]))

                if(ans !== {}){
                    console.log(ans)
                    setQuestions({
                        question1:parseInt(ans?.data?.security_question1),
                        answer1:ans?.data?.security_answer1,
                        question2:parseInt(ans?.data?.security_question2),
                        answer2:ans?.data?.security_answer2
                    })
                }
            })
    }

    useEffect(()=>{

        getCountryList();
        getMobileCodeList();

        getInfo();
    },[])

    useEffect(()=>{
        if(openSecretQuestion && securityQuestions.length===0){

            Actions.User.checkSecurityQuestion({loader:setSecurityQuestionsLoader})
                .then((response)=>{
                    if(response.status){
                        getSecurityQuestion()
                    }else{
                        if(response?.error && response?.error?.resultCode === 81){
                            MULTI({
                                title:t('Confirm Operation'),
                                send:"/os/v1/api/secured/otp/profile-info-security-question-get",
                                save:({code,sourceId})=>{
                                    if(code){
                                        Actions.User.confirmSQOTP({data:{
                                                otp:code,
                                                sourceId:sourceId
                                            },loader:"verifyOtp"}).then(response=>{
                                            //setSecurityQuestions((response.status && response.data?response.data?.data:[]))
                                            if(response.status){
                                                window.pushEvent(t("The operation was performed successfully"),"success");
                                                getSecurityQuestion(response.data);
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
                    }
                    //console.log(response.status);
                    //setSecurityQuestions((response.status && response.data?response.data?.data:[]))

                })
        }
    },[openSecretQuestion])

    const getCountryList = ()=> {
        Actions.User.getCountryList().then(response=>{
            if(response.status){
                setCountries(_.map(response.data, (v,k)=> {
                    return _.map(v,(val) => {return {title:val.name,id:val.iso3} })
                })[0])
            }
        })
    }

    const getMobileCodeList = ()=> {
        Actions.User.getMobileCodeList().then(response=>{
            if(response.status){
                setMobileCode(_.map(response.data, (v,k)=> {
                    return _.map(v,(val) => {return {id:val.code,title:val.title,code:val.iso3} })
                })[0])
            }
        })
    }

    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){
                let res = response.data.data;
                setInfoData(_.fromPairs(_.map(infoData, (v,k)=> {
                  switch (k){
                      case 'mobilePrefix':
                          let cod = "+"+res[k];
                          return [k,cod];
                      default: return [k,res[k]];
                  }
                })))

                //console.log('InfoData',infoData)
            }
        })
    }

    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }

    const saveSecurityAnswers=()=>{
        let error = _.chain(questions).map((v,k)=>{ return  {key:k,value:v}}).filter(v=>!v.value).map(v=>v.key).value();
        if(error.length>0){
            setErrors([...error])
        }else{
            setErrors([])
            MULTI({
                title:t('Confirm Operation'),
                send:"/os/v1/api/secured/otp/profile-info-security-question",
                save:({code,sourceId})=>{
                    if(code){

                        Actions.User.saveSecurityQuestions({data:{
                                otp:code,
                                sourceId:sourceId,
                                ...questions
                            },loader:"verifyOtp"}).then(response=>{
                            if(response.status){
                                window.pushEvent(t("The operation was performed successfully"),"success");
                                setOpenSecretQuestion(false);
                                setSecurityQuestions([]);
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
    }

    const save2faAuthentication =()=> {
        MULTI({
            title:t('Confirm Operation'),
            send:"/os/v1/api/secured/otp/profile-info-2fa-authentication",
            save:({code,sourceId})=>{
                if(code){
                    Actions.User.save2faAuthentication({data:{
                            otp:code,
                            sourceId:sourceId,
                            twoFA:dat2FA
                        },loader:"verifyOtp"}).then(response=>{
                        if(response.status){
                            window.pushEvent(t("The operation was performed successfully"),"success");
                            setOpen2FA(false)
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

    const onUpdate = ()=>{

        setErrors([])

        let error = _.chain(infoData).map((v,k)=>{
            if(["mobileConfirmed","emailConfirmed","mobilePrefix","mobile","email","hasUserRequestedVerify"].includes(k)){
                return {key:k,value:1}
            }
            return {key:k,value:v}
        }).filter(v=>!v.value).map(v=>v.key).value();

        //let error = _.chain(infoData).map((v,k)=>{ return{key:k,value:v}}).filter(v=>!v.value).map(v=>v.key).value();


        if(error.length>0){
            setErrors([...error])
            console.log('error',error)
        }else{
            Actions.User.updateInfo({data:infoData,loader:setLoader}).then(response=>{
                setTimeout(()=>{
                    setStatus({
                        ...status,
                        status:'',
                        msg:''
                    })
                },2000)

                if(response.status){
                    setStatus({
                        ...status,
                        status:'success'//, msg:t('The information was successfully updated')
                    })
                    window.pushEvent('The information was successfully updated','success')
                }else {
                    setStatus({
                        ...status,
                        status:"error"//,msg:t("An error occurred while updating the information")
                    })
                    window.pushEvent('An error occurred while updating the information','error')
                }
            })
        }

    }

    const getPrimaryOtp = () =>{
        Actions.Otp.getPrimary().then(response=>{
            console.log(223,response)
            if(response){
                if(response?.enabled){
                    setDat2FA(response?.enabled);
                }
                if(response?.source){
                    setOtpSource(response?.source);
                }
            }
            // show 2fa dialog
            setOpen2FA(true)
        })
    }

    return (
        <>

            {
                infoData?.hasUserRequestedVerify === true && infoData?.verifyStatus !== 0 &&
                <div className="col-12">
                    <div className="user_verify_test">Your information has been submitted and Waiting for Review </div>
                </div>
            }
            <br/>
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
                                        <div className="col-12">
                                                <div style={{display:"flex"}} >
                                                    <div className="input-select" style={{width:"100%",maxWidth:'100px'}}>
                                                        <SelectBox
                                                            data={mobileCode}
                                                            id={"prefix"}
                                                            placeholder={t("Prefix")}
                                                            className="prefix"
                                                            value={infoData.mobilePrefix}
                                                            onSelect={e =>{
                                                                console.log(e)
                                                                setInfoData({...infoData,mobilePrefix:e.title})
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`input-label-border ${error("mobile")}`} style={{width:"100%",marginLeft:'10px'}}>
                                                        <input
                                                            type="number"
                                                            name="mobile"
                                                            id="mobile"
                                                            className="for-confirm"
                                                            value={infoData.mobile}
                                                            onChange={e => setInfoData({...infoData,mobile:e.target.value})}
                                                            disabled={forEdit.mobile === '' && infoData.mobileConfirmed?'disabled':''}
                                                        />
                                                        <label htmlFor="phone">{t("Phone")}</label>
                                                        {
                                                            (forEdit.mobile === '' && infoData.mobileConfirmed === 1)?
                                                            <button
                                                                onClick={()=>{
                                                                    setForEdit({...forEdit,mobile:infoData.mobile});
                                                                    setInfoData({...infoData,mobileConfirmed:0,mobile:''});
                                                                    /*if(infoData.email.trim().length>0){
                                                                        EMAIL({
                                                                            email:infoData.email,
                                                                            send:"/os/v1/api/secured/otp/profile-info-email",
                                                                            verify:"/os/v1/api/secured/otp/profile-info-email",
                                                                            permitAll:false,
                                                                            save:e=>{
                                                                                if(e){
                                                                                    //setInfoData({...infoData,emailConfirmed:1});
                                                                                    //CLOSE();
                                                                                    MULTI({
                                                                                        title:t('Confirm Operation'),
                                                                                        email:infoData.email,
                                                                                        send:"/os/v1/api/secured/otp/profile-info-email",
                                                                                        additionalParams:{'email':infoData.email},
                                                                                        save:({code,sourceId})=>{
                                                                                            if(code){
                                                                                                Actions.User.verification_email({data:{
                                                                                                        otp:code,
                                                                                                        sourceId:sourceId,
                                                                                                        email:infoData.email

                                                                                                    },loader:"verifyOtp"}).then(response=>{
                                                                                                    if(response.status){
                                                                                                        window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                                        getInfo();
                                                                                                        CLOSE();
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
                                                                            }
                                                                        })
                                                                    }*/
                                                                }}
                                                                type="button" className="btn-confirm"
                                                            >{t("Edit")}</button>
                                                            :
                                                            <div className="btn-group">
                                                                {
                                                                    forEdit.mobile !== '' && <button
                                                                        onClick={()=>{
                                                                            setInfoData({...infoData,mobile:forEdit.mobile,mobileConfirmed:1});
                                                                            setForEdit({...forEdit,mobile:''});

                                                                        }}
                                                                        type="button" className="btn-confirm"
                                                                        style={{marginRight:'5px',padding:'0 20px'}}
                                                                    >X</button>
                                                                }
                                                                <button
                                                                    type="button"
                                                                    className="btn-confirm"
                                                                    onClick={()=>{
                                                                        if(forEdit.mobile === infoData.mobile) {
                                                                            window.pushEvent('use another mobile number','error');
                                                                            return;
                                                                        }

                                                                        if(infoData.mobile.trim().length>0){
                                                                            setForEdit({...forEdit,mobile:''});
                                                                            PHONE({
                                                                                prefix:infoData.mobilePrefix,
                                                                                number:infoData.mobile,
                                                                                //send:"/us/v2/api/secured/personal/info/otp/get",
                                                                                send:"/os/v1/api/secured/otp/profile-info-mobile",
                                                                                verify:"/os/v1/api/secured/otp/profile-info-mobile",
                                                                                permitAll:false,
                                                                                save:e=>{
                                                                                    if(e){
                                                                                        //CLOSE()
                                                                                        MULTI({
                                                                                            title:t('Confirm Operation'),
                                                                                            email:infoData.email,
                                                                                            send:"/os/v1/api/secured/otp/profile-info-mobile",
                                                                                            additionalParams:{'email':infoData.email},
                                                                                            save:({code,sourceId})=>{
                                                                                                if(code){
                                                                                                    Actions.User.verification_phone({data:{
                                                                                                            otp:code,
                                                                                                            sourceId:sourceId,
                                                                                                            mobile:infoData.mobile,
                                                                                                            mobilePrefix:infoData.mobilePrefix.replace("+","")

                                                                                                        },loader:"verifyOtp"}).then(response=>{
                                                                                                        if(response.status){
                                                                                                            window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                                            getInfo();
                                                                                                            CLOSE();
                                                                                                            //history.push(`/${lang}/account/info`)
                                                                                                        }else{
                                                                                                            console.log("catch",response)
                                                                                                            ERROR({error:t("error")})
                                                                                                        }
                                                                                                    }).catch(e=>{
                                                                                                        console.log("catch",e)
                                                                                                        ERROR({error:t("error")})
                                                                                                    })
                                                                                                }

                                                                                            }
                                                                                        })
                                                                                    }

                                                                                }
                                                                            })
                                                                        }
                                                                    }}
                                                                >
                                                                    {t("Confirm")}
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="col-12">
                                            <div  className={`input-label-border ${error("email")}`}>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="for-confirm"
                                                    value={infoData.email}
                                                    onChange={e => setInfoData({...infoData,email:e.target.value})}
                                                    disabled={forEdit.email === '' && infoData.emailConfirmed?'disabled':''}
                                                />
                                                <label htmlFor="email">Email</label>
                                                {
                                                    (forEdit.email === '' && infoData.emailConfirmed === 1)?
                                                    <button
                                                        onClick={()=>{
                                                            setForEdit({...forEdit,email:infoData.email});
                                                            setInfoData({...infoData,emailConfirmed:0,email:''});
                                                            /*if(infoData.email.trim().length>0){
                                                                EMAIL({
                                                                    email:infoData.email,
                                                                    send:"/os/v1/api/secured/otp/profile-info-email",
                                                                    verify:"/os/v1/api/secured/otp/profile-info-email",
                                                                    permitAll:false,
                                                                    save:e=>{
                                                                        if(e){
                                                                            //setInfoData({...infoData,emailConfirmed:1});
                                                                            //CLOSE();
                                                                            MULTI({
                                                                                title:t('Confirm Operation'),
                                                                                email:infoData.email,
                                                                                send:"/os/v1/api/secured/otp/profile-info-email",
                                                                                additionalParams:{'email':infoData.email},
                                                                                save:({code,sourceId})=>{
                                                                                    if(code){
                                                                                        Actions.User.verification_email({data:{
                                                                                                otp:code,
                                                                                                sourceId:sourceId,
                                                                                                email:infoData.email

                                                                                            },loader:"verifyOtp"}).then(response=>{
                                                                                            if(response.status){
                                                                                                window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                                getInfo();
                                                                                                CLOSE();
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
                                                                    }
                                                                })
                                                            }*/
                                                        }}
                                                        type="button" className="btn-confirm"
                                                    >{t("Edit")}</button>
                                                    :
                                                    <div className="btn-group">
                                                        {
                                                            forEdit.email !== '' && <button
                                                                onClick={()=>{
                                                                    console.log('forEdit',forEdit)
                                                                    setInfoData({...infoData,email:forEdit.email,emailConfirmed:1});
                                                                    setForEdit({...forEdit,email:''});

                                                                }}
                                                                type="button" className="btn-confirm"
                                                                style={{marginRight:'5px',padding:'0 20px'}}
                                                            >X</button>
                                                        }

                                                        <button
                                                            onClick={()=>{
                                                                if(forEdit.email === infoData.email) {
                                                                    window.pushEvent('use another email address','error');
                                                                    return;
                                                                }
                                                                if(infoData.email.trim().length>0){
                                                                    setForEdit({...forEdit,email:''});
                                                                    EMAIL({
                                                                        email:infoData.email,
                                                                        send:"/os/v1/api/secured/otp/profile-info-email",
                                                                        verify:"/os/v1/api/secured/otp/profile-info-email",
                                                                        permitAll:false,
                                                                        save:e=>{
                                                                            if(e){
                                                                                //setInfoData({...infoData,emailConfirmed:1});
                                                                                //CLOSE();
                                                                                MULTI({
                                                                                    title:t('Confirm Operation'),
                                                                                    email:infoData.email,
                                                                                    send:"/os/v1/api/secured/otp/profile-info-email",
                                                                                    additionalParams:{'email':infoData.email},
                                                                                    save:({code,sourceId})=>{
                                                                                        if(code){
                                                                                            Actions.User.verification_email({data:{
                                                                                                    otp:code,
                                                                                                    sourceId:sourceId,
                                                                                                    email:infoData.email

                                                                                                },loader:"verifyOtp"}).then(response=>{
                                                                                                if(response.status){
                                                                                                    window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                                    getInfo();
                                                                                                    CLOSE();
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
                                                                        }
                                                                    })
                                                                }
                                                            }}
                                                            type="button" className="btn-confirm"
                                                        >{t("Confirm")}</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div  className={`input-label-border ${error("firstName")}`}>
                                                <input disabled value={infoData.firstName} type="text" name="name" id="name"/>
                                                <label htmlFor="name">{t("Name")}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border ${error("lastName")}`}>
                                                <input disabled value={infoData.lastName} type="text" name="surname" id="surname"/>
                                                <label htmlFor="surname">{t("Surname")}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div  className={`input-label-border`}>
                                                <input disabled value={infoData.dob} type="text" name="dob" id="dob"/>
                                                <label htmlFor="dob">{t("Date of birth")}</label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border`}>
                                                <input disabled value={infoData.gender ? (gender.filter(v=> v.id === infoData.gender).map(v=> v.title)):''} type="text" name="gender" id="gender"/>
                                                <label htmlFor="gender">{t("gender")}</label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border`}>
                                                <input disabled value={infoData.country? (countries.filter(v=> v.id === infoData.country).map(v=> v.title)):''} type="text" name="Country" id="Country"/>
                                                <label htmlFor="Country">{t("Country")}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border`}>
                                                <input value={currency[0].title} type="text" name="currency" id="currency" disabled/>
                                                <label htmlFor="currency">{t("currency")}</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12 col-md-4 tab-pane" id="security" role="tabpanel" aria-labelledby="security-tab"
                                >
                                    <div className="row personal-row">
                                        <div className="col-12 d-none d-md-flex">
                                            <div className="form-title">{t("Security")}</div>
                                        </div>
                                        {/*<div className="col-12 order-2 order-md-1">
                                            <SelectBox data={questions} value={infoData.question} placeholder={t("Secret question")}
                                                    id={'question1'}
                                                    onSelect={(e)=> setInfoData({...infoData,question:e.id})}
                                            />
                                        </div>
                                        <div className="col-12 order-3 order-md-2">
                                            <div className="input-label-border">
                                                <input onChange={e => setInfoData({...infoData,answer:e.target.value})} value={infoData.answer} type="text" name="secret-answer" id="secretAnswer"/>
                                                <label htmlFor="secretAnswer">{t("Secret answer")}</label>
                                            </div>
                                        </div>*/}
                                        <div className="col-12 order-1 order-md-3">
                                            <button
                                                className="btn-change-password"
                                                type="button"
                                                onClick={()=>setOpenSecretQuestion(true)}
                                            >
                                                {t("Secret Question")}
                                            </button>
                                        </div>
                                        <div className="col-12 order-1 order-md-3">
                                            <button
                                                className="btn-change-password"
                                                type="button"
                                                onClick={()=>getPrimaryOtp()}
                                            >
                                                {t("2FA Autorization")}
                                            </button>
                                        </div>
                                        <div className="col-12 order-1 order-md-3">
                                            <button
                                                className="btn-change-password"
                                                type="button"
                                                onClick={()=>setOpenChangePass(true)}
                                            >
                                                {t("Change Password")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div style={{color:`${status.status ==="success"? 'green':'red'}`}}>{status.msg}</div>
                            <button type="submit" className="btn-primary" style={{position:'relative',overflow:'hidden'}}>
                                {loader? <SvgDot/>:t("Save")}
                            </button>*/}
                        </form>
                    </div>
                </div>
            </div>
            {
                openChangePass && <ChangePassword
                title={t("Change Password")}
                onClose={setOpenChangePass}
                />
            }
            {
                open2FA && (
                    <PLXModal title={t('Set 2FA Authentication')} onClose={()=>setOpen2FA(false)} dialogStyle={{maxWidth:'360px'}} >
                        <form onSubmit={e=>{
                            e.preventDefault();
                            save2faAuthentication();
                        }} className="confirm-form aut-2fa">
                            {
                                otpSource === '' ? (
                                    <>
                                        <div style={{color: '#ff4646',paddingTop: '20px'}}>Error was reported. Contact the hotline</div>
                                    </>
                                ):(
                                    <>
                                        <div className="row">
                                            <div  className="col-12" style={{marginBottom:'0'}}>
                                                <br/>

                                                <p style={{fontSize:'14px',lineHeight:'14px',color:'#707c9b'}}>Two-factor authentication (2FA) adds an additional layer of security to your account by requiring to enter a one-time verification code sent using your preferred channel in order to login</p>
                                                <div className="out-2fa-box">
                                                    <div style={{color:'#707c9b'}}>Turn on Two-factor authentication:</div>
                                                    <div onClick={()=>setDat2FA(!dat2FA)} className={`btn-2fa ${dat2FA?'active':'disable'}`}><i/></div>
                                                </div>
                                                <br/>
                                                {
                                                    dat2FA && <p style={{fontSize:'14px',lineHeight:'14px',color:'#707c9b',marginBottom:'0'}}>on next time login one time verification code will be sent to this channel: <span style={{color:'#ccc'}}>{otpSource}</span></p>
                                                }
                                            </div>
                                        </div>


                                        <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden',marginLeft:'0'}}>
                                            {loader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                                            {t("Save")}
                                        </button>
                                    </>
                                )
                            }
                        </form>
                    </PLXModal>
                )
            }
            {
                openSecretQuestion && securityQuestions.length > 0 && (
                    <PLXModal title={t('Secret Question')} onClose={()=>{setOpenSecretQuestion(false);setSecurityQuestions([]);}} dialogStyle={{maxWidth:'360px'}} >
                        <form onSubmit={e=>{
                            e.preventDefault();
                            console.log(questions)
                            //changePassword();
                            saveSecurityAnswers()
                        }} className="confirm-form password-change">

                            <div className="row">
                                <h6 style={{color: '#727fa4'}}>{t("Question")} 1</h6>
                                <div  className={`input-select-border col-12 ${error("question1")}`}>
                                    <SelectBox data={securityQuestions.filter(v=>questions.question2 !==v.id)} value={questions.question1} placeholder={t("Secret question")}
                                               id={'question1'}
                                               onSelect={(e)=> setQuestions({...questions,question1:e.id})}
                                    />
                                </div>
                                <div className="col-12">
                                    <div className={`input-label-border ${error("answer1")}`}>
                                        <input onChange={e => setQuestions({...questions,answer1:e.target.value})} value={questions.answer1} type="text" name="secret-answer" id="secretAnswer"/>
                                        <label htmlFor="secretAnswer">{t("Secret answer")}</label>
                                    </div>
                                </div>


                                <h6 style={{color: '#727fa4'}}>{t("Question")} 2</h6>
                                <div  className={`input-select-border col-12 ${error("question2")}`}>
                                    <SelectBox data={securityQuestions.filter(v=>questions.question1 !==v.id)} value={questions.question2} placeholder={t("Secret question")}
                                               id={'question2'}
                                               onSelect={(e)=> setQuestions({...questions,question2:e.id})}
                                    />
                                </div>
                                <div className="col-12">
                                    <div className={`input-label-border ${error("answer2")}`}>
                                        <input onChange={e => setQuestions({...questions,answer2:e.target.value})} value={questions.answer2} type="text" name="secret-answer" id="secretAnswer"/>
                                        <label htmlFor="secretAnswer">{t("Secret answer")}</label>
                                    </div>
                                </div>

                            </div>

                            <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden'}}>
                                {securityQuestionsLoader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                                {t("Save")}
                            </button>
                        </form>
                    </PLXModal>
                )
            }
        </>
    )
}

export default Information;
