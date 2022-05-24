import React, {useEffect, useState,useMemo} from 'react';
import './transactions.scss';
import {Actions, useTranslation} from "../../../core";
import Deposit from '../deposit/Deposit';
import Withdraw from '../withdraw/Withdraw';
import {PLXModal, ShowMore} from "../../index";
import {useNavigation} from "../../../core/hooks/useNavigation";
import {arrowLeftBack, coinspaid} from "../../../assets/img/icons/icons";
import {DateRange} from "react-date-range";
import moment from "moment";
import {useUser} from "../../../core/hooks/useUser";
import {useParams} from "react-router-dom";
import _ from "lodash";

const Transactions = ({onClose}) => {
    const {t} = useTranslation();
    const nav = useNavigation()
    const [deposit,setDeposit]=useState(false);
    const [withdraw,setWithdraw]=useState(false);
    const [history,setHistory]=useState(false);
    const [page,setPage]=useState(1);
    const count = ()=>20
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [datePickerShow,setDatePickerShow]=useState(false)
    const svgArrow =()=>{
        return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16.828" viewBox="0 0 20 16.828">
                <g id="arrow-left" transform="translate(1 1.414)">
                    <line id="Line_1" data-name="Line 1" x2="18" transform="translate(0 7)"
                          fill="none" stroke="#7385b1" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="2"/>
                    <path id="Path_235" data-name="Path 235" d="M5,19l7-7L5,5"
                          transform="translate(6 -5)" fill="none" stroke="#7385b1"
                          stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"/>
                </g>
            </svg>)
    }

    const {User} = useUser();
    const {lang} = useParams()
    const [trData,setTrData] = useState(null)
    const [slotHistoryData,setSlotHistoryData] = useState(null)
    const [showDetailModal,setShowDetailModal] = useState(false)
    const [dateRange,setDateRange] = useState({
        start:moment(new Date((new Date()).getFullYear(), (new Date()).getMonth(),  (new Date()).getDate()-1)).format("YYYY-MM-DD"),
        end:moment(new Date((new Date()).getFullYear(), (new Date()).getMonth(),  (new Date()).getDate())).format("YYYY-MM-DD")
    })

    useEffect(()=>{
        trHistory()
    },[]); // dateRange

    const trHistory=()=> {
        Actions.User.getTransactionHistory({d1:dateRange.start,d2:dateRange.end})
            .then(response=>{
                if(response.status){
                    setTrData(response?.data?.data.reverse())
                }
            }).catch((reason)=>{
            console.log(reason)
        })
    }



    const showDetail=(v)=>{
        Actions.User.getSlotTransactionHistory({date:v.startDate})
            .then(response=>{
                if(response.status){
                    setSlotHistoryData(response?.data?.data.reverse());
                    setShowDetailModal(true);
                }
            }).catch((reason)=>{
        })


    }

    const getIcon=(v)=>{
        if(v.providerId === "DIGITAIN"){
            return <div className="ticket-svg"><svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.022 5.44l5.626 9.743M4.495 15.776a.624.624 0 01.127-.78 2.5 2.5 0 00-2.45-4.243.624.624 0 01-.739-.28l-.97-1.679a.625.625 0 01.23-.854l12.99-7.5a.625.625 0 01.854.23l.969 1.678a.625.625 0 01-.127.78 2.5 2.5 0 002.45 4.243.624.624 0 01.739.28l.969 1.678a.625.625 0 01-.229.854l-12.99 7.5a.625.625 0 01-.854-.229l-.97-1.678z"></path></g><defs><clipPath id="clip0"><path fill="#b5121b" d="M0 0h20v20H0z"></path></clipPath></defs></svg>
                <span style={{paddingLeft:'5px'}}>Sport</span>
            </div>
        }else if(v.action === "SummaryRecord"){
            return <i className="slot-icon"/>
        }else {
            return <span>{v.providerId}</span>
        }
    }

    const getAmount=(v)=>{

        if(v.action === "SummaryRecord"){
            return v.betAmount !== null?<><span>- {v.betAmount}</span><span style={{marginLeft:'5px',fontSize:'12px',color:'#909eac'}}>{v.currency}</span></>:''
        }else{
            return v.amount !== null? <><span>{v.amount}</span><span style={{marginLeft:'5px',fontSize:'12px',color:'#909eac'}}>{v.currency}</span></>:''
        }
    }

    const getType=(v)=>{
        if(v.providerId === "DIGITAIN"){
            return v.amount < 0 ? 'Bet':'Win'
        }else{
            if(v.action === "deposit" || v.action === "withdrawal"){
                return <>
                    <p>{v.action}</p>
                </>
            }else{
                return v.winAmount !== null ? <><p style={{fontSize:'12px',color:'#5d9323'}}>WIN</p>{v.winAmount}<span style={{marginLeft:'5px',fontSize:'12px',color:'#909eac'}}>{v.currency}</span></>:''
            }

        }


        //return v.action === "SummaryRecord"? (<span>- {v.betAmount+' '+ v.currency}</span> ):( <span>{v.amount +' '+ v.currency}</span> )
    }

    const getStatus=(v)=>{
        if(v.action === "SummaryRecord"){
            return <button className="det-button" onClick={()=>showDetail(v)}>Detailed</button>
        }else{
            if(v.action === "deposit" || v.action === "withdrawal"){
                return <>
                    {/*<p>{v.action}</p>*/}
                    <span data-status={v.status}>{v.status === 1 ? t("Successful"):t("Pending")}</span>
                </>
            }else{
                return v.status === 1 ? t("Successful"):t("Pending")
            }

        }
    }
    const transactions=useMemo(()=> {
        return _.filter(trData,(v,k)=>k<page*count());
    },[page,trData])
    return (
        <>
            <div className="col-12">
                <div className="row">
                    {/*<div className="col-12">
                        <button className="d-flex align-items-center back bg-transparent" onClick={()=>onClose()}>

                            <img src={arrowLeftBack} alt=""/>

                            <div className="tab-headline">Transaction History</div>
                        </button>
                    </div>
                    <div className="col-12">
                        <div className="row px-0 transaction-filter">
                            <div className="col-12 col-md-4 d-none d-md-block">
                               {
                                   datePickerShow? <div className={"date-range-picker"}>
                                        <DateRange

                                            editableDateInputs={true}
                                            onChange={item => {
                                                console.log(item)
                                                setDate([item.selection])
                                            }}
                                            moveRangeOnFirstSelection={false}
                                            ranges={date}
                                        />
                                       <span className={"select-button"} onClick={()=>setDatePickerShow(false)}>Select</span>
                                    </div>: (
                                        <div className="datepicker-label" onClick={()=>setDatePickerShow(true)}>
                                            <div className="custom-date-filter">
                                                Date: {
                                                (date.startDate && date.endDate)?<span>&nbsp;All</span>:
                                                    (
                                                        <div> &nbsp; {moment(new Date(date[0].startDate)).format("DD/MM/YYYY")} - {moment(new Date(date[0].endDate)).format("DD/MMYYYY")}</div>
                                                    )
                                            }

                                            </div>
                                        </div>
                                    )
                                }

                            </div>

                        </div>
                    </div>*/}

                    <div className="col-12">
                        <button className="d-flex align-items-center back bg-transparent" onClick={()=>onClose()}>

                            <img src={arrowLeftBack} alt=""/>

                            <div className="tab-headline">Transaction History</div>
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
                            <div className="col-12 col-md-3">
                                <div className={`input-label-border history-confirm-btn`}>
                                    <button onClick={()=>trHistory()}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 transaction-table d-none d-md-block">

                        <div className="row mx-0 table-head">
                            <div className="col">
                                <div className="table-th">{t('Date') +'/'+ t("Time")}</div>
                            </div>
                            {/*<div className="col">
                                <div className="table-th">{t("Time")}</div>
                            </div>*/}
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
                                _.map(transactions, (v,k)=> {
                                    return (
                                        <div className="row mx-0 table-tbody align-items-center" key={k}>
                                            <div className="col">
                                                <div className="table-td">
                                                    <span>{v.startDate.split('T')[1]}</span><br/>
                                                    <span style={{fontSize:'12px'}}>{v.startDate.split('T')[0]}</span>
                                                </div>
                                            </div>
                                            {/*<div className="col">
                                                <div className="table-td">{v.startDate.split('T')[1]}</div>
                                            </div>*/}
                                            <div className="col ps-0">
                                                <div className="table-td">
                                                    {/*<img src={skrillSmall} alt=""/>*/}
                                                    {getIcon(v)}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="table-td tr-amount">
                                                    {getAmount(v)}

                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="table-td">{
                                                    getType(v)
                                                }</div>
                                            </div>
                                            <div className="col">
                                                <div className="table-td">{
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
                        {/*<div className="col-12">
                            <div
                                className="all-transaction-filter"
                                data-bs-toggle="modal"
                                data-bs-target="#filterModal"
                            >
                                <div className="name">Filter:</div>
                                <div className="status">None</div>
                                <img src={coinspaid} alt=""/>
                            </div>
                        </div>*/}

                        <div className="transaction-list mobile">
                            {
                                _.map(transactions, (v,k)=> {
                                    return (
                                        <div className="col-12 transaction-mb" key={k}>
                                            <div className="row table-tbody align-items-center">
                                                <div className="col-3 date-time">
                                                    <span>{v.startDate.split('T')[1]}</span><br/>
                                                    <span style={{fontSize:'12px'}}>{v.startDate.split('T')[0]}</span>
                                                </div>
                                                <div className="col-6 prov-amount">
                                                    <div className="provider">
                                                        {getIcon(v)}
                                                    </div>
                                                    <div className="amount">
                                                        {getAmount(v)}
                                                    </div>
                                                </div>
                                                <div className="col-3 type-status">
                                                    <div className="type">
                                                        {getType(v)}
                                                    </div>
                                                    <div className="status">
                                                        {getStatus(v)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                            {/*<div className="row mx-0 table-tbody align-items-center" key={k}>
                                <div className="col">
                                    <div className="table-td">
                                        <span>{v.startDate.split('T')[1]}</span><br/>
                                        <span style={{fontSize:'12px'}}>{v.startDate.split('T')[0]}</span>
                                    </div>
                                </div>
                                <div className="col">
                                                <div className="table-td">{v.startDate.split('T')[1]}</div>
                                            </div>
                                <div className="col ps-0">
                                    <div className="table-td">
                                        <img src={skrillSmall} alt=""/>
                                        {getIcon(v)}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="table-td tr-amount">
                                        {getAmount(v)}

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="table-td">{
                                        getType(v)
                                    }</div>
                                </div>
                                <div className="col">
                                    <div className="table-td">{
                                        getStatus(v)
                                    }</div>
                                </div>
                            </div>*/}
                        </div>

                        {/*<div className="col-12 transaction-loading">
                            <div className="loading-dots">
                                <div className="loading-dots--dot"></div>
                                <div className="loading-dots--dot"></div>
                                <div className="loading-dots--dot"></div>
                            </div>
                        </div>*/}
                    </div>
                    <div className="col-12">
                        <ShowMore page={page} count={count()} length={trData?trData.length:0} setPage={setPage}/>
                    </div>
                </div>
            </div>
            {
                showDetailModal && <PLXModal title={t("Transaction History")} onClose={()=>setShowDetailModal(false)} className={'slot-transaction-history'} dialogStyle={{width:'700px'}} contentStyle={{width:'700px'}} >
                    <div className="slot-transaction-detail head">
                        <table>
                            <tr>
                                <td>Provider</td>
                                <td>Date Time</td>
                                <td>Amount</td>
                                <td>Type</td>
                            </tr>
                        </table>
                    </div>
                    <div className="slot-transaction-detail">
                    <table>
                        {
                            _.map(slotHistoryData, (v,k)=> {
                                return (
                                    <tr key={k}>
                                        <td data-prov="">{v.providerId}</td>
                                        <td data-date=""><span>{v.startDate.split('T')[0]}</span> <span>{v.startDate.split('T')[1]}</span></td>
                                        <td className="amount">{v.amount}<span>{v.currency}</span></td>
                                        <td data-status={v.action}>{v.action}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                    </div>
                </PLXModal>
            }
        </>
    )
}

export default Transactions;
