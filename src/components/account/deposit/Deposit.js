import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import PLXModal from "../../modal/PLXModal";
import {arrowLeftBack, coinspaid, percent, time} from "../../../assets/img/icons/icons";
import {logoM, logoM_jpg} from "../../../assets/img/images"
import './Deposit.scss';
import {QRCode} from "react-qrcode-logo";
import {SvgDot} from "../../index";

window.reSendInterval=null;
const Deposit = ({onClose})=>{
    const {t} = useTranslation();
    const [loader,setLoader]=useState(false)
    const [qr,setQr] = useState(null)

    const QRGenerator = () =>{
        return  qr  !==null && <PLXModal title={t("QR")} onClose={()=>setQr(null)} contentStyle={{width:'auto'}} >
            <div className="user_verify_test"> 1 BTC  ~ {qr?.rate} EURO </div> <br/>
            <a href={qr?.url} target={"_blank"}>
                <QRCode value={qr?.url} fgColor={"black"} size={300} logoImage={logoM_jpg} style={{width:"300px",height:"300px" }}/>
            </a>
        </PLXModal>
    }
    return (
        <>
            {QRGenerator()}
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
                                            className="btn-dep"
                                            disabled={loader}
                                            style={{position:'relative',overflow:'hidden'}}
                                            onClick={()=>{
                                                Actions.Deposit.getCoinSpaidOrder({loader:setLoader})
                                                    .then(response=>{

                                                        setQr(response.status?response?.data?.data:null)
                                                    }).catch((reason)=>{
                                                        console.log(reason)
                                                })
                                            }}
                                        >
                                            {loader?<SvgDot/>:  t("Deposit")}
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
