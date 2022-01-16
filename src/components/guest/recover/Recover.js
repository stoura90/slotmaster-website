import {PLXModal} from "../../index";
import {useEffect, useState} from "react";
import EventEmitter from "../../../core/utils/eventEmitter";
import {useTranslation} from "../../../core";
import _ from "lodash";

const Recover = () =>{
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
        prefix:'',
        data:''
    })

    const [error, setError] = useState(null);

    useEffect(()=>{
        eventEmitter.on("recover",setType)
        return ()=>eventEmitter.removeListener("recover",e=>setType(null))
    },[])

    return type !==null && (
        <PLXModal
            title={t(`Forgot ${type}`)}
            //onClickBackDrop={e=>setType(null)}
            onClose={e=>setType(null)}
        >

            <form onSubmit={(event)=>{
                event.preventDefault();
            }} className="form">
                <div className="row">

                    <div className="col-12">
                        <div className={`select-label-border`}>
                            <select onChange={(e)=> setForm({...form, channel:e.target.value})}  value={form?.channel} className="select2" placeholder="Type" id="channel">>
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
                                    <div  className={`input-label-border`}>
                                        <input onChange={e => setForm({...form,data:e.target.value})} value={form.data} type="text" name="email" id="data-email"/>
                                        <label htmlFor="data-email">{form.channel === 'email' ? t("Email"):t("Phone")}</label>
                                    </div>
                                </div>
                            )

                        :
                            (
                                <div className="col-12">
                                    <div className={`input-label-border`}  >
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
