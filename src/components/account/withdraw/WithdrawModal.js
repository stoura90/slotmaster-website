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
import {UseEvent} from "../../../core/hooks/useEvent";


window.reSendInterval=null;

const currencyList = [
    { id:"BTC",title:"BTC",name:"Bitcoin"},
    { id:"LTC",title:"LTC",name:"Litecoin"},
    { id:"ETH",title:"ETH",name:"Ethereum"},
    { id:"BNB",title:"BNB",name:"Binance Coin"},
    { id:"BUSD",title:"BUSD",name:"Binance USD"},
    { id:"USDTE",title:"USDTE",name:"Tether USD ERC20"},
    { id:"USDTT",title:"USDTT",name:"Tether USD TRC20"},
    { id:"DOGE",title:"DOGE",name:"Dogecoin"},
    { id:"NEO",title:"NEO",name:"Neo"},
    { id:"ADA",title:"ADA",name:"Cardano"},
    { id:"TRX",title:"TRX",name:"TRON"},
    { id:"USDC",title:"USDC",name:"USD Coin"},
    { id:"USDT",title:"USDT",name:"Tether* USD"},
    //{ id:"XRP",title:"XRP",name:"Ripple"},
    //{ id:"BCH",title:"BCH",name:"Bitcoin cash"},
    //{ id:"ERC20",title:"ERC20",name:"ERC20"},
    //{ id:"EURS",title:"EURS",name:"STASIS EURS"},
    //{ id:"XED",title:"XED",name:"Exeedme ERC20 tok"},
    //{ id:"DAI",title:"DAI",name:"Dai ERC20 Stablec"},
    //{ id:"MRX",title:"MRX",name:"Metrix Coin"},
    //{ id:"WBTC",title:"WBTC",name:"Wrapped Bitcoin"},
    //{ id:"CPD",title:"CPD",name:"CoinsPaid token"},
]

const Withdraw = ({onClose})=>{
    const {t} = useTranslation();
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [withdraw,setWithdraw]=useState({amount:'', address:""});
    const [crypto,setCrypto]=useState('');
    const [selectedCurrency,setSelectedCurrency] = useState({ id:"BTC",title:"BTC",name:"Bitcoin"});
    const [exRate,setExRate]=useState(null)
    const [loader,setLoader]=useState(false)

    useEffect(()=>{
        if(selectedCurrency){
            setExRate(null)
            getExchangeRate(selectedCurrency?.id)
        }
    },[selectedCurrency])

    useEffect(()=>{
        setExRate(null)
        getExchangeRate(selectedCurrency?.id)
    },[])



    const withdrawHandler=()=> {

        if(withdraw?.amount > 0 && withdraw?.address !== ''){
            MULTI({
                send:"/os/v1/api/secured/otp/withdraw-coinspaid",
                title:t('Confirm Operation'),
                save:({code,sourceId})=>{
                    if(code){
                        Actions.User.withdraw_coinsPaid({data:{
                                otp:code,
                                amount:withdraw?.amount,
                                address:withdraw?.address,
                                sourceId:sourceId,
                                currency: selectedCurrency.id
                            },loader:"verifyOtp"}).then(response=>{
                            if(response.status){
                                CLOSE();
                                setSelectedCurrency(null);
                                window.pushEvent(t("The operation was performed successfully"),"success")
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
        }else{
            window.pushEvent('Please fill fields','error');
        }
    }

    const getExchangeRate = (currency)=>{
        Actions.Deposit.getCoinExchangeRate({currency:currency,loader:setLoader})
            .then(response=>{
                if(response.status){
                    setExRate(response.data.data)
                }else{
                    setExRate(null)
                    window.pushEvent(response.error?.message,"error")

                }

            })
    }

    return (
        <div className="row withdraw-content">
            {
                <PLXModal title={t("Withdraw")} onClose={()=>onClose(false)} contentStyle={{width:'350px'}} dialogStyle={{width:"350px"}}  >
                    <div style={{minWidth:'200px'}}>
                        <form onSubmit={e=>{
                            e.preventDefault()
                        }} className="personal-data">
                            <br/>

                            <div className="new-input-label" style={{marginBottom:'0px'}}>
                                <SelectBox
                                    data={currencyList}
                                    id={"crypto-currency"}
                                    placeholder={t("currency")}
                                    className="crypto-currency"
                                    value={selectedCurrency.id}
                                    onSelect={e => setSelectedCurrency(e)}
                                />
                                {
                                    exRate? <p style={{color:'#8594c1',fontSize:'12px',margin:'4px 3px'}}>
                                        {exRate?.exchangeRate?.rateFrom} {exRate.currency} ~ {exRate?.exchangeRate?.rateTo} {exRate.toCurrency}
                                    </p>:''

                                }

                            </div>
                            {
                                exRate? <>
                                        <div className="new-input-label">
                                            <div className="input-box">
                                                <input type={"number"} name="Amount" id="amount" value={withdraw?.amount} onChange={event => {
                                                    setWithdraw({...withdraw,amount:event.target.value});
                                                    setCrypto(event.target.value * exRate?.exchangeRate?.rateTo);
                                                }}
                                                />
                                                <label htmlFor="amount">EUR</label>
                                                {/*{t("Money")}*/}
                                            </div>
                                            <p style={{color:'#8594c1',fontSize:'12px',margin:'4px 3px'}}>Min Withdraw: {exRate?.exchangeRate?.minAmountFrom} {exRate.currency}</p>
                                        </div>


                                        <div className="new-input-label">
                                            <div className="input-box">
                                                <input type={"number"} name="Amount" id="amount" value={crypto} onChange={event => {
                                                    setCrypto(event.target.value);
                                                    setWithdraw({...withdraw,amount: (event.target.value / exRate?.exchangeRate?.rateTo)});
                                                }}
                                                />
                                                <label htmlFor="amount">{exRate.toCurrency}</label>
                                            </div>
                                        </div>

                                        <div className="new-input-label" >
                                            <div className="input-box">
                                                <input type="text" name="account" id="account"
                                                       value={withdraw?.address} onChange={event => setWithdraw({...withdraw,address:event.target.value})}
                                                />
                                                <label htmlFor="account">{t("Address")}</label>
                                            </div>
                                        </div>
                                        <div className="new-input-label" style={{display:'flex',justifyContent:'center'}} >
                                            <button  onClick={()=> withdrawHandler()} className="btn-primary"
                                                     id="withdraw-tab" type="submit" style={{width:"100%",marginTop:"16px",maxWidth:"100%"}}>
                                                <span>Withdraw</span>
                                            </button>
                                        </div>
                                    </>:
                                    <div style={{height:"150px",position:'relative'}}>
                                        {loader && <div className="loader-wrap"><SvgDot/></div>}
                                    </div>
                            }

                        </form>
                    </div>
                </PLXModal>

            }
        </div>

    )

}
export default Withdraw;
