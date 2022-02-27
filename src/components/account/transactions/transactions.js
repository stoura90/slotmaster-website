import React, {useEffect, useState} from 'react';
import './transactions.scss';
import { useTranslation} from "../../../core";
import Deposit from '../deposit/Deposit';
import Withdraw from '../withdraw/Withdraw';
import {PLXModal, ShowMore} from "../../index";
import {useNavigation} from "../../../core/hooks/useNavigation";
import {arrowLeftBack, coinspaid} from "../../../assets/img/icons/icons";
import {DateRange} from "react-date-range";
import moment from "moment";

const Transactions = () => {
    const {t} = useTranslation();
    const nav = useNavigation()
    const [deposit,setDeposit]=useState(false);
    const [withdraw,setWithdraw]=useState(false);
    const [history,setHistory]=useState(false);
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
    return (
        <>
            <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <button className="d-flex align-items-center back bg-transparent">

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
                           {/* <div className="col-12 col-md-4 d-none d-md-block">
                                <div className="select-label">
                                    <select
                                        className="select2 select2-checkbox"
                                        name="vendor"
                                        multiple
                                        placeholder="Vendor"
                                        id="clear"
                                        type="vendor"
                                    >
                                        <option value=""></option>
                                        <option value="1">Netent</option>
                                        <option value="2">Bitcoin</option>
                                        <option value="3">Webmoney</option>
                                        <option value="4">Jeton</option>
                                        <option value="5">Skrill</option>
                                        <option value="6">Ecopayz</option>
                                        <option value="7">Visa Mastercard</option>
                                        <option value="8">Dogecoin</option>
                                        <option disabled>clear</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 d-none d-md-block">
                                <div className="select-label">
                                    <select
                                        className="select2 select2-checkbox"
                                        name="type"
                                        multiple
                                        placeholder="Type"
                                        id="clear"
                                        type="type"
                                    >
                                        <option value=""></option>
                                        <option value="deposit">Deposit</option>
                                        <option value="withdraw">Withdrawal</option>
                                        <option disabled>clear</option>
                                    </select>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                    <div className="col-12 transaction-table d-none d-md-block">
                        <div className="row mx-0 table-head">
                            <div className="col">
                                <div className="table-th">Date</div>
                            </div>
                            <div className="col">
                                <div className="table-th">Time</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-th">Vendor</div>
                            </div>
                            <div className="col">
                                <div className="table-th">Amount</div>
                            </div>
                            <div className="col">
                                <div className="table-th">Type</div>
                            </div>
                            <div className="col">
                                <div className="table-th">Status</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">11/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">22:11:19</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">100000.00 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">+ Deposit</div>
                            </div>
                            <div className="col">
                                <div className="table-td success">Successful</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">10/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">19:11:11</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">110.10 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">- Withdrawal</div>
                            </div>
                            <div className="col">
                                <div className="table-td canceled">Canceled</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">10/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">19:11:11</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">52.00 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">- Withdrawal</div>
                            </div>
                            <div className="col">
                                <div className="table-td canceled">Canceled</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">10/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">22:11:19</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">100000.00 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">+ Deposit</div>
                            </div>
                            <div className="col">
                                <div className="table-td success">Successful</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">10/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">19:11:11</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">110.10 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">- Withdrawal</div>
                            </div>
                            <div className="col">
                                <div className="table-td canceled">Canceled</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">11/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">22:11:19</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">100000.00 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">+ Deposit</div>
                            </div>
                            <div className="col">
                                <div className="table-td success">Successful</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">10/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">22:11:19</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">100000.00 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">+ Deposit</div>
                            </div>
                            <div className="col">
                                <div className="table-td success">Successful</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">10/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">19:11:11</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">52.00 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">- Withdrawal</div>
                            </div>
                            <div className="col">
                                <div className="table-td success">Successful</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">10/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">19:11:11</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">110.10 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">- Withdrawal</div>
                            </div>
                            <div className="col">
                                <div className="table-td canceled">Canceled</div>
                            </div>
                        </div>
                        <div className="row mx-0 table-tbody align-items-center">
                            <div className="col">
                                <div className="table-td">11/09/2020</div>
                            </div>
                            <div className="col">
                                <div className="table-td">22:11:19</div>
                            </div>
                            <div className="col ps-0">
                                <div className="table-td">
                                    <img src={coinspaid} alt=""/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="table-td">100000.00 USD</div>
                            </div>
                            <div className="col">
                                <div className="table-td">+ Deposit</div>
                            </div>
                            <div className="col">
                                <div className="table-td success">Successful</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-0 m-0 d-md-none">
                        <div className="col-12">
                            <div
                                className="all-transaction-filter"
                                data-bs-toggle="modal"
                                data-bs-target="#filterModal"
                            >
                                <div className="name">Filter:</div>
                                <div className="status">None</div>
                                <img src={coinspaid} alt=""/>
                            </div>
                        </div>
                        <div className="col-12 transaction-mb">
                            <div className="transaction-date">11/09/2020</div>
                            <div className="row">
                                <div className="col-12">
                                    <div
                                        className="d-flex align-items-center justify-content-between small-card"
                                    >
                                        <img src={coinspaid} alt="Skrill"/>
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
                                        <img src={coinspaid} alt="Bitcoin"/>
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
                                        <img src={coinspaid} alt="EcoPayz"/>
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
                                        <img src={coinspaid} alt="Webmoney"/>
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
                                        <img src={coinspaid} alt="Skrill"/>
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
                                        <img src={coinspaid} alt="EcoPayz"/>
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
                        <ShowMore page={1} count={20} length={100} setPage={(e)=>console.log(e)}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transactions;
