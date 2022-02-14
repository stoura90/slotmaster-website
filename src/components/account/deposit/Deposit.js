import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import PLXModal from "../../modal/PLXModal";
import {arrowLeftBack, coinspaid, percent, time} from "../../../assets/img/icons/icons";
import {logoM, logoM_jpg} from "../../../assets/img/images"
import './Deposit.scss';
import {QRCode} from "react-qrcode-logo";
import {SvgDot} from "../../index";
import SelectBox from "../../forms/select/NewSelect";
import {copy} from "../../../assets/img/icons/icons"

window.reSendInterval=null;

const currencyList = [
    { id:"BTC",title:"BTC",name:"Bitcoin"},
    { id:"LTC",title:"LTC",name:"Litecoin"},
    { id:"BCH",title:"BCH",name:"Bitcoin cash"},
    { id:"ADA",title:"ADA",name:"Cardano"},
    { id:"ETH",title:"ETH",name:"Ethereum"},
    { id:"DOGE",title:"DOGE",name:"Dogecoin"},
    { id:"NEO",title:"NEO",name:"Neo"},
    { id:"XRP",title:"XRP",name:"Ripple"},
    { id:"USDT",title:"USDT",name:"Tether* USD"},
    { id:"USDTE",title:"USDTE",name:"Tether USD ERC20"},
    { id:"USDTT",title:"USDTT",name:"Tether USD TRC20"},
    { id:"ERC20",title:"ERC20",name:"ERC20"},
    { id:"BNB",title:"BNB",name:"Binance Coin"},
    { id:"EURS",title:"EURS",name:"STASIS EURS"},
    { id:"USDC",title:"USDC",name:"USD Coin"},
    { id:"TRX",title:"TRX",name:"TRON"},
    { id:"XED",title:"XED",name:"Exeedme ERC20 tok"},
    { id:"DAI",title:"DAI",name:"Dai ERC20 Stablec"},
    { id:"MRX",title:"MRX",name:"Metrix Coin"},
    { id:"WBTC",title:"WBTC",name:"Wrapped Bitcoin"},
    { id:"CPD",title:"CPD",name:"CoinsPaid token"},
]

const Deposit = ({onClose})=>{
    const {t} = useTranslation();
    const [loader,setLoader]=useState(false)
    const [qr,setQr] = useState(true)
    const [qrData,setQrData] = useState({})
    const [selectedCurrency,setSelectedCurrency] = useState({id:"BTC",title:"BTC",name:"Bitcoin"});
    const [copyText,setCopyText] = useState(false);
    useEffect(()=>{
        if(qr){
            getCurrencyCourse();
            setQrData({...qrData,url:''})
        }
    },[selectedCurrency,qr])
    const getCurrencyCourse=()=>{
        //Actions.Deposit.getCoinRate({currency:selectedCurrency,loader:setLoader})
        Actions.Deposit.getCoinSpaidOrder({currency:selectedCurrency.id,loader:setLoader})
            .then(response=>{
                if(response.status){
                    setQrData(response?.data?.data);
                }else{
                   window.pushEvent(response.error?.message,"error")

                }
            }).catch((reason)=>{
            console.log(reason)
        })
    }
    const QRGenerator = () =>{
        return  qr !==null && <PLXModal title={t("Deposit QR")} onClose={()=>setQr(null)} className={'deposit-modal-new'} dialogStyle={{width:'300px'}} contentStyle={{width:'300px'}} >
            <br/>
            <SelectBox
                data={currencyList}
                id={"crypto-currency"}
                placeholder={t("currency")}
                className="crypto-currency"
                value={selectedCurrency.id}
                onSelect={e => setSelectedCurrency(e)}
            />
            <div className="dep-wrap" >

                {
                    (qrData?.url) ? (
                        <>
                            <p style={{color:'#8594c1',fontSize:'12px',margin:'4px 3px'}}>{qrData?.exchangeRate?.rateFrom} {qrData.currency}  ~ {qrData?.exchangeRate?.rateTo} {qrData.toCurrency}</p>
                            <br/>
                            <a href={qr?.url} target={"_blank"} style={{textAlign:'center',borderRadius:'3px'}}>
                                <QRCode value={`bitcoin:`+qrData?.url} fgColor={"black"} size={150} logoImage={logoM_jpg} />
                            </a>
                            <br/>
                            <br/>
                            <div className="row">
                                <div className="col-12">
                                    <div  className={`input-label-border qr-address`}>
                                        <input  value={qrData?.url} type="text" name="name" id="qrUrl"/>
                                        <label htmlFor="qrUrl">{selectedCurrency.name+' '+t("Address")}</label>
                                        <i onClick={()=> {
                                            window.navigator.clipboard.writeText(qrData?.url);
                                            setCopyText(true);
                                            setTimeout(function(){
                                                setCopyText(false)
                                            },3000);
                                        }}><img src={copy}/></i>
                                        <span data-show={copyText}>copied</span>

                                    </div>
                                </div>
                            </div>
                        </>
                    ):(
                        <div style={{height:"150px"}}>
                            {loader && <div className="loader-wrap"><SvgDot/></div>}
                        </div>
                    )
                }


            </div>
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
                                                setQr(true);
                                            }}
                                        >
                                            {t("Deposit")}
                                            {/*{loader?<SvgDot/> : t("Deposit")}*/}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="currency">
                                <h5 style={{color:'#c6d1ed'}}>Supported crypto currencies</h5>
                                <div className="currency-list">
                                    <span>BTC - Bitcoin,</span>
                                    <span>LTC - Litecoin,</span>
                                    <span>BCH - Bitcoin cash,</span>
                                    <span>ADA - Cardano,</span>
                                    <span>ETH - Ethereum,</span>
                                    <span>DOGE - Dogecoin,</span>
                                    <span>NEO - Neo,</span>
                                    <span>XRP - Ripple,</span>
                                    <span>USDT - Tether* USD,</span>
                                    <span>USDTE - Tether USD ERC20 token,</span>
                                    <span>USDTT - Tether USD TRC20 token,</span>
                                    <span>ERC20 token(s),</span>
                                    <span>BNB - Binance Coin,</span>
                                    <span>EURS - STASIS EURS,</span>
                                    <span>USDC - USD Coin,</span>
                                    <span>TRX - TRON,</span>
                                    <span>XED - Exeedme ERC20 token,</span>
                                    <span>DAI - Dai ERC20 Stablecoin,</span>
                                    <span>MRX - Metrix Coin,</span>
                                    <span>WBTC - Wrapped Bitcoin,</span>
                                    <span>CPD - CoinsPaid token</span>
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
