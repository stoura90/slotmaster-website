import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import PLXModal from "../../modal/PLXModal";
import {Balance, SvgDot} from "../../index";
import {useOTP} from "../../../core/hooks/useOTP";
import _ from "lodash";
import {arrowLeftBack, coinspaid, percent, time} from "../../../assets/img/icons/icons";
import './Deposit.scss';

window.reSendInterval=null;
const Deposit = ({onClose})=>{
    const {t} = useTranslation();
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [loader,setLoader]=useState(false)

    return (
        <>
            <div className="row deposit-content">

                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <div onClick={()=>onClose()} className="d-flex align-items-center back close-btn">
                                <img src={arrowLeftBack} alt=""/>
                                <div className="tab-headline">{t('Deposit')}</div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row px-0">
                                <div className="col-md-6 col-lg-3">
                                    <div
                                        className="d-flex flex-column billing-card align-items-start justify-content-between"
                                    >
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
                                        <button
                                            type="button"
                                            href="#"
                                            target="_blank"
                                            data-bs-toggle="modal"
                                            data-bs-target="#depositModal"
                                            className="btn-dep"
                                        >
                                            {t("Deposit")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Deposit;