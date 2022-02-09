import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import PLXModal from "../../modal/PLXModal";
import {Balance, SvgDot} from "../../index";

import {useOTP} from "../../../core/hooks/useOTP";
import _ from "lodash";
import {arrowLeftBack, coinspaid, percent, time} from "../../../assets/img/icons/icons";
import './Withdraw.scss';
import {QRCode} from "react-qrcode-logo";
import {logoM_jpg} from "../../../assets/img/images";
import SelectBox from "../../forms/select/NewSelect";

window.reSendInterval=null;
const Withdraw = ({onClose})=>{
    const {t} = useTranslation();
    const [withdraw,setWithdraw]=useState(null)
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [loader,setLoader]=useState(false)
    const errors=[];
    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }
    const withdrawDialog = () =>{
        return withdrawDialog && <PLXModal title={t("Withdraw")} onClose={()=>setWithdraw(null)} contentStyle={{width:'100%',maxWidth:"300px"}} dialogStyle={{width:"350px",maxWidth:"350px"}}  >
                <div style={{minWidth:'200px'}}>
                    <form onSubmit={e=>{
                        e.preventDefault()
                    }} className="personal-data">
                        <br/>
                        <div className="new-input-label" >
                            <div className="input-box">
                                <input type={"text"} name="Amount" id="amount"
                                       value={withdraw?.money} onChange={event => setWithdraw({...withdraw,money:event.target.value})}
                                />
                                <label htmlFor="amount">{t("Money")}</label>
                            </div>

                        </div>
                        <div className="new-input-label" >
                            <div className="input-box">
                                <input type="text" name="account" id="account"
                                       value={withdraw?.account} onChange={event => setWithdraw({...withdraw,account:event.target.value})}
                                />
                                <label htmlFor="account">{t("Account Number")}</label>
                            </div>
                        </div>
                        <div className="new-input-label" style={{display:'flex',justifyContent:'center'}} >
                        <button  onClick={()=>setWithdraw(true)} className="btn-primary"
                                id="withdraw-tab" type="submit" style={{width:"100%",marginTop:"16px",maxWidth:"100%"}}>
                            <span>Withdraw</span>
                        </button>
                        </div>
                    </form>
                </div>
        </PLXModal>
    }

    return (
        <>

            <div className="row withdraw-content">
                {withdrawDialog()}
                <div className="col-12">
                    <div onClick={()=>onClose()} className="d-flex align-items-center back close-btn">
                        <img src={arrowLeftBack} alt=""/>
                        <div className="tab-headline">{t('Withdraw')}</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-6 col-lg-3">
                            <div
                                className="d-flex flex-column billing-card align-items-start justify-content-between">
                                <div className="billing-name mx-auto">
                                    <img src={coinspaid} alt=""/>
                                </div>
                                <div
                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                    <div className="d-flex align-items-center">
                                        <span className="currency">USD</span>
                                        <div className="amount-limit">10 - 5000</div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                                <span className="percent">
                                                    <img src={percent} alt="Percent"/>
                                                </span>
                                        <div className="percent-com">0</div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                                <span className="reflection">
                                                    <img src={time} alt="Time"/>
                                                </span>
                                        <div className="reflection-duration">Instantly</div>
                                    </div>
                                </div>
                                <a target="_blank" className="btn-dark" onClick={()=>setWithdraw({
                                    money:"",
                                    account:""
                                })}>Withdraw</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Withdraw;
