import {PLXModal} from "../../index";
import {useEffect, useState} from "react";
import EventEmitter from "../../../core/utils/eventEmitter";
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {useOTP} from "../../../core/hooks/useOTP";
import './Recover.scss';

const Recover = () =>{
    const {otp, PHONE,EMAIL,CLOSE,ERROR} = useOTP();
    const MobilePrefixList=[
        {id:1,prefix: "+1"},
        {id:673,prefix: "+673"},
        {id:359,prefix: "+359"},
        {id:226,prefix: "+226"},
        {id:257,prefix: "+257"}
    ]

    const {t} = useTranslation()
    const [type,setType] = useState(null)
    const eventEmitter = new EventEmitter();
    const [form,setForm] = useState({
        channel:'mobile',
        token:'',
        username:'',
        prefix:359,
        data:'',
        newPassword:false,
        pass1:'',
        pass2:''
    })

    const [error, setError] = useState(null);

    useEffect(()=>{
        eventEmitter.on("recover",setType)
        return ()=>eventEmitter.removeListener("recover",e=>setType(null))
    },[])

    const sendData =()=>{
        if (type === 'Username'){
            window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'recoverUsername'}).then(async(token)=> {
                Actions.User.recoverUserName({...form, token:token}).then(response=>{
                    console.log(response)
                    setType(null);
                    eventEmitter.emit('signIn',false);
                    window.pushEvent(`username გადმოგზავნილია`,'success');
                }).catch(reason => window.pushEvent(`დაფიქსირდა შეცდომა`,'error'))
            });
        }else{
            window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'recoverPassword'}).then(async(token)=> {
                //Actions.User.recoverUserName({...form, token:token}).then(response=>{
                    if (form.channel === 'email'){
                        EMAIL({
                            email: form.data,
                            send: `/us/v1/api/personal/recover/otp/get`,
                            additionalParams:{
                                username:form.username,
                                token:token
                            },
                            save: code => {
                                if (code) {
                                    recoverPassword(code)
                                }
                            }
                        })
                    }else{
                        PHONE({
                            prefix:form.prefix,
                            number:form.data,
                            additionalParams:{
                                username:form.username,
                                token:token
                            },
                            send:`/us/v1/api/personal/recover/otp/get`,
                            save:code=>{
                                if(code){
                                    recoverPassword(code)
                                }
                            }
                        })
                    }
                //}).catch(reason => window.pushEvent(`დაფიქსირდა შეცდომა`,'error'))
            });
        }
    }

    const recoverPassword =(code)=>{
        window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'recoverPassword'}).then(async(token)=> {
            Actions.User.recoverPassword({...form, token:token, otp:code}).then(response=>{
                setType(null);
                eventEmitter.emit('signIn',false);
                CLOSE();
                window.pushEvent(`დროებითი პაროლი გადმოგზავნილია`,'success');
            }).catch(reason => window.pushEvent(`დაფიქსირდა შეცდომა`,'error'))
        });
    }

    return type !==null && (
        <PLXModal
            title={t(`Forgot ${type}`)}
            //onClickBackDrop={e=>setType(null)}
            onClose={e=>setType(null)}
            contentStyle={{maxWidth:'350px'}}
            dialogStyle={{maxWidth:'350px'}}
        >

            <form onSubmit={(event)=>{
                event.preventDefault();
                sendData()
            }} className="form recover-password">
                <div className="row">


                    <div className="col-12">
                        <div className={`select-label-border`}>
                            <select onChange={(e)=> setForm({...form, channel:e.target.value})}  value={form?.channel} className="select2" placeholder="Type" id="channel">
                                <option value={""}>{t("Choose Type")} </option>
                                {
                                    _.map([{id:'email',value:"Email"},{id:'mobile',value:"Phone"}],  (v,k)=> <option key={k} value={v.id}> {v.value}</option>)
                                }
                            </select>
                            <label htmlFor="channel">{t("Type")}</label>
                        </div>
                    </div>

                    {
                        form.channel === 'email'?(
                                <div className="col-12">
                                    <div  className={`new-input-label`}>
                                        <input onChange={e => setForm({...form,data:e.target.value})} value={form.data} type="text" name="email" id="data-email"/>
                                        <label htmlFor="data-email">{form.channel === 'email' ? t("Email"):t("Phone")}</label>
                                    </div>
                                </div>
                            )

                            :
                            (
                                <div className="col-12">
                                    <div className={`new-input-label`}  >
                                        <div style={{display:'flex',width:"100%"}}>
                                            <div className="input-label" style={{width:"100px"}}>
                                                <select className="select2" id="Prefix" placeholder="Code"
                                                        value={form.prefix}
                                                        onChange={event => setForm({...form,prefix:event.target.value})}
                                                >
                                                    {
                                                        _.map(MobilePrefixList, (v,k)=><option key={k} value={v.id}>{v.prefix}</option>)
                                                    }
                                                </select>
                                                <label htmlFor="Prefix">{t("Prefix")}</label>
                                            </div>
                                            <div   style={{flex:1,position: "relative"}}>
                                                <input
                                                    type="number"
                                                    name="phone"
                                                    id="phone"
                                                    className="for-confirm"
                                                    value={form.data}
                                                    onChange={e => setForm({...form,data:e.target.value})}
                                                />
                                                <label htmlFor="phone">{t("Phone")}</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )


                    }

                    {
                        type === 'Password' && (
                            <div className="col-12">
                                <div  className={`new-input-label`}>
                                    <input onChange={e => setForm({...form,username:e.target.value})} value={form.username} type="text" name="username" id="data-username"/>
                                    <label htmlFor="data-username">{t("Username")}</label>
                                </div>
                            </div>
                        )
                    }

                </div>

                {
                    error && <div className="login_error" style={{color:'#ff7e7e'}}>{error}</div>
                }

                <button type="submit" className="btn-primary" >{t("Submit")}</button>
            </form>

        </PLXModal>
    )
}
export default Recover;
