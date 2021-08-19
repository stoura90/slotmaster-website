import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    bitcoin,
    webmoney
} from '../../assets/img/images';

import {
    skrillSmall,
} from '../../assets/img/icons/icons';

import {Balance, Footer, Header} from "../../components";
import "../../assets/styles/_select2.scss"
const TransactionScreen = () =>{
    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav)

    },[nav]);
    return (
        <>
            <Header/>

            <main className="account">
                <div className="container">
                    <div className="row">
                        <Balance/>

                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <button className="d-flex align-items-center back bg-transparent">
                                        <img src="img/icons/arrow-left-back.svg" alt=""/>
                                        <div className="tab-headline">Transaction History</div>
                                    </button>
                                </div>
                                <div className="col-12">
                                    <div className="row px-0 transaction-filter">
                                        <div className="col-12 col-md-4 d-none d-md-block">
                                            <div className="datepicker-label">
                                                <input
                                                    type="number"
                                                    name="date"
                                                    className="date-filter"
                                                    id="date"
                                                />
                                                <label htmlFor="date">Date: <span>All</span></label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4 d-none d-md-block">
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
                                        </div>
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
                                                <img src={skrillSmall} alt=""/>
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
                                                <img src={bitcoin} alt=""/>
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
                                                <img src={webmoney} alt=""/>
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
                                                <img src="img/billing-ecopayz.png" alt=""/>
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
                                                <img src="img/billing-netent.png" alt=""/>
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
                                                <img src="img/billing-skrill.png" alt=""/>
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
                                                <img src="img/billing-ecopayz.png" alt=""/>
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
                                                <img src="img/billing-webmoney.png" alt=""/>
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
                                                <img src="img/billing-netent.png" alt=""/>
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
                                                <img src="img/billing-skrill.png" alt=""/>
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
                                        <div className="show-more-btn">show more</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default TransactionScreen
