import React, {useEffect, useState} from 'react';
import './style.scss';
import {Balance, Footer, Header, SvgDot} from "../../components";
import "../../assets/styles/_select2.scss"
import {Actions, useTranslation} from "../../core";
import moment from "moment";
import _ from "lodash";
import {Redirect, useParams} from "react-router-dom";
import {useUser} from "../../core/hooks/useUser";
import PLXModal from "../../components/modal/PLXModal";
import SelectBox from "../../components/forms/select/NewSelect";
import {QRCode} from "react-qrcode-logo";
import {logoM_jpg} from "../../assets/img/images";
import {copy} from "../../assets/img/icons/icons";
const TransactionScreen = () =>{
    const {t} = useTranslation()

    const {User} = useUser();
    const {lang} = useParams()
    const [trData,setTrData] = useState(null)
    const [slotHistoryData,setSlotHistoryData] = useState(null)
    const [showDetailModal,setShowDetailModal] = useState(false)
    const [dateRange,setDateRange] = useState({
        start:moment(new Date((new Date()).getFullYear(), (new Date()).getMonth(),  (new Date()).getDate()-2)).format("YYYY-MM-DD"),
        end:moment(new Date((new Date()).getFullYear(), (new Date()).getMonth(),  (new Date()).getDate()+1)).format("YYYY-MM-DD")
    })

    useEffect(()=>{
        trHistory()
    },[dateRange]);

    const trHistory=()=> {
        Actions.User.getTransactionHistory({d1:dateRange.start,d2:dateRange.end})
            .then(response=>{
                if(response.status){
                    setTrData(response?.data?.data)
                }
            }).catch((reason)=>{
            console.log(reason)
        })
    }

    const getType=(v)=>{
        if(v.providerId === "DIGITAIN"){
           return v.amount < 0 ? 'Bet':'Win'
        }else{
            return v.winAmount + ' '+ v.currency
        }
    }

    const showDetail=(v)=>{
        Actions.User.getSlotTransactionHistory({date:v.startDate})
            .then(response=>{
                if(response.status){
                    setSlotHistoryData(response?.data?.data);
                    setShowDetailModal(true);
                }
            }).catch((reason)=>{
        })


    }

    const getIcon=(v)=>{
        if(v.providerId === "DIGITAIN"){
            return <div className="ticket-svg"><svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.022 5.44l5.626 9.743M4.495 15.776a.624.624 0 01.127-.78 2.5 2.5 0 00-2.45-4.243.624.624 0 01-.739-.28l-.97-1.679a.625.625 0 01.23-.854l12.99-7.5a.625.625 0 01.854.23l.969 1.678a.625.625 0 01-.127.78 2.5 2.5 0 002.45 4.243.624.624 0 01.739.28l.969 1.678a.625.625 0 01-.229.854l-12.99 7.5a.625.625 0 01-.854-.229l-.97-1.678z"></path></g><defs><clipPath id="clip0"><path fill="#b5121b" d="M0 0h20v20H0z"></path></clipPath></defs></svg></div>
        }else {
            return <i className="slot-icon"/>
        }
    }

    const getStatus=(v)=>{
        if(v.action === "SummaryRecord"){
            return <button className="det-button" onClick={()=>showDetail(v)}>Detailed</button>
        }else{
            return v.status === 1 ? t("Successful"):t("Pending")
        }
    }

    return User.isLogged?(
        <>
            <Header page={"transaction"}/>

            <main className="account">
                <div className="container">
                    <div className="row">

                        <Balance/>

                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <button className="d-flex align-items-center back bg-transparent">
                                        <img src="img/icons/arrow-left-back.svg" alt=""/>
                                        <div className="tab-headline">{t("Transaction History")}</div>
                                    </button>
                                </div>
                                <div className="col-12">
                                    <div className="row px-0 transaction-filter">
                                        <div className="col-12 col-md-3">
                                            <div className={`input-label-border`}>
                                                <input onChange={e => setDateRange({...dateRange,start:e.target.value})} value={dateRange.start} type="date" name="dob" id="tr-start" />
                                                <label htmlFor="tr-start">Date: <span>{t("from")}</span></label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className={`input-label-border`}>
                                                <input onChange={e => setDateRange({...dateRange,end:e.target.value})} value={dateRange.end} type="date" name="dob" id="tr-end" />
                                                <label htmlFor="tr-end">Date: <span>{t("to")}</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 transaction-table d-none d-md-block">

                                    <div className="row mx-0 table-head">
                                        <div className="col">
                                            <div className="table-th">{t('Date')}</div>
                                        </div>
                                        <div className="col">
                                            <div className="table-th">{t("Time")}</div>
                                        </div>
                                        <div className="col ps-0">
                                            <div className="table-th">{t("Vendor")}</div>
                                        </div>
                                        <div className="col">
                                            <div className="table-th">{t("Amount")}</div>
                                        </div>
                                        <div className="col">
                                            <div className="table-th">{t("Type")}</div>
                                        </div>
                                        <div className="col">
                                            <div className="table-th">{t("Status")}</div>
                                        </div>
                                    </div>
                                    <div className="transaction-list">
                                        {
                                            _.map(trData, (v,k)=> {
                                                return (
                                                    <div className="row mx-0 table-tbody align-items-center" key={k}>
                                                        <div className="col">
                                                            <div className="table-td">{v.startDate.split('T')[0]}</div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="table-td">{v.startDate.split('T')[1]}</div>
                                                        </div>
                                                        <div className="col ps-0">
                                                            <div className="table-td">
                                                                {/*<img src={skrillSmall} alt=""/>*/}
                                                                {getIcon(v)}
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="table-td tr-amount">
                                                                {
                                                                    v.action === "SummaryRecord"? (<span>- {v.betAmount+' '+ v.currency}</span> ):( <span>{v.amount +' '+ v.currency}</span> )
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="table-td">{
                                                                getType(v)
                                                            }</div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="table-td success">{
                                                                getStatus(v)
                                                            }</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="p-0 m-0 d-md-none">

                                    <div className="col-12">
                                        <div
                                            className="all-transaction-filter"
                                            data-bs-toggle="modal"
                                            data-bs-target="#filterModal"
                                        >
                                            <div className="name">{t('Filter')}:</div>
                                            <div className="status">{t("None")}</div>
                                            <img src="img/icons/h-arrows.svg" alt=""/>
                                        </div>
                                    </div>

                                    <div className="col-12 transaction-mb">
                                        <div className="transaction-date">11/09/2020</div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div
                                                    className="d-flex align-items-center justify-content-between small-card"
                                                >
                                                    <img src="img/skrill-small.png" alt="Skrill"/>
                                                    <div className="d-flex flex-column text-right">
                                                        <div className="money">- 110.10 USD</div>
                                                        <div className="tr-time">22:11:19</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div
                                                    className="d-flex align-items-center justify-content-between small-card"
                                                >
                                                    <img src="img/bitcoin-small.png" alt="Bitcoin"/>
                                                    <div className="d-flex flex-column text-right">
                                                        <div className="money">+ 100000.00 USD</div>
                                                        <div className="tr-time">22:11:19</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div
                                                    className="d-flex align-items-center justify-content-between small-card wrong"
                                                >
                                                    <img src="img/ecopayz-small.png" alt="EcoPayz"/>
                                                    <div className="d-flex flex-column text-right">
                                                        <div className="money">52.00 USD</div>
                                                        <div className="tr-time">22:11:19</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 transaction-mb">
                                        <div className="transaction-date">11/09/2020</div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div
                                                    className="d-flex align-items-center justify-content-between small-card"
                                                >
                                                    <img src="img/webmoney-small.png" alt="Webmoney"/>
                                                    <div className="d-flex flex-column text-right">
                                                        <div className="money">- 110.10 USD</div>
                                                        <div className="tr-time">22:11:19</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div
                                                    className="d-flex align-items-center justify-content-between small-card"
                                                >
                                                    <img src="img/skrill-small.png" alt="Skrill"/>
                                                    <div className="d-flex flex-column text-right">
                                                        <div className="money">+ 100000.00 USD</div>
                                                        <div className="tr-time">22:11:19</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div
                                                    className="d-flex align-items-center justify-content-between small-card wrong"
                                                >
                                                    <img src="img/ecopayz-small.png" alt="EcoPayz"/>
                                                    <div className="d-flex flex-column text-right">
                                                        <div className="money">52.00 USD</div>
                                                        <div className="tr-time">22:11:19</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 transaction-loading">
                                        <div className="loading-dots">
                                            <div className="loading-dots--dot"></div>
                                            <div className="loading-dots--dot"></div>
                                            <div className="loading-dots--dot"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-none d-md-block">
                                    <div className="show-more">
                                        <div className="show-info">
                                            You’ve viewed 20 of 911 Transaction
                                        </div>
                                        <div className="show-more-btn">{t("show more")}</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </main>

            <Footer/>

            {
                showDetailModal && <PLXModal title={t("Transaction History")} onClose={()=>setShowDetailModal(false)} className={'slot-transaction-history'} dialogStyle={{width:'700px'}} contentStyle={{width:'700px'}} >
                    <div className="slot-transaction-detail head">
                        <ul>
                            <li>Provider</li>
                            <li>Date</li>
                            <li>Time</li>
                            <li>Amount</li>
                            <li>Type</li>
                        </ul>
                    </div>
                    <div className="slot-transaction-detail">
                    {
                        _.map(slotHistoryData, (v,k)=> {
                            return (
                                <ul key={k}>
                                    <li>{v.providerId}</li>
                                    <li>{v.startDate.split('T')[0]}</li>
                                    <li>{v.startDate.split('T')[1]}</li>
                                    <li>{v.amount +' '+v.currency }</li>
                                    <li>{v.action}</li>
                                </ul>
                            )
                        })
                    }
                    </div>
                </PLXModal>
            }

        </>
    ):( <Redirect to={`/${lang}/main`}/>)
}

export default TransactionScreen
