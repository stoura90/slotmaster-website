import React, {useEffect} from 'react';
import {logoM, sl2} from "../../assets/img/images";
import {Swp} from "../index";
import {useUser} from "../../core/hooks/useUser";
import {
    restriction18,
    account,
    arrowLeft,
    arrowLeftBack,
    borderDashed,
    checked,
    checkedMb,
    clockModal,
    close,
    discord,
    fileUpload,
    filter,
    hArrows,
    home,
    logo,
    logout,
    multiArrow,
    netnet,
    percent,
    percentModal,
    play,
    plus,
    reload,
    remove,
    search,
    searchLight,
    selectArrow,
    skrillSmall,
    sliderArrowNext,
    sliderArrowPrev,
    time,
    viewOff,
    viewOn,
} from '../../assets/img/icons/icons';
import {Link, useParams} from "react-router-dom";

const Balance = () =>{
    const {User,signOut} = useUser();
    const {lang} = useParams();
    console.log('lang',lang)
    useEffect(()=>{
        console.log(User)
    },[])
    return (
        <>

            <div className="col-12 d-flex justify-content-between">
                <div className="d-flex flex-column flex-md-row align-items-md-center">
                    <span className="user-fullname">Nick Tamarashvili</span>
                    <span className="user-id">(938433748)</span>
                </div>
                <a href="#" className="user-logout d-flex align-items-center">
                    <svg
                        id="noun_Log_Out_639972"
                        data-name="noun_Log Out_639972"
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.245"
                        height="13.796"
                        viewBox="0 0 17.245 13.796"
                    >
                        <path
                            id="Path_211"
                            data-name="Path 211"
                            d="M132.9,58.136a1.007,1.007,0,0,0-.467-.235.71.71,0,0,0-.87.757c-.008.886,0,1.768,0,2.655,0,.1-.009.219-.016.318h-.386c-1.544,0-3.088.006-4.632.007-.737,0-.994.236-.994.9v3.69c0,.665.256.89.992.89,1.544,0,3.088-.006,4.632-.006h.415v.365q0,1.317-.006,2.634a.705.705,0,0,0,.482.732.821.821,0,0,0,.879-.222l6.247-5.688a.654.654,0,0,0,0-1.093Q136.039,60.981,132.9,58.136Z"
                            transform="translate(-122.22 -57.49)"
                        />
                        <path
                            id="Path_212"
                            data-name="Path 212"
                            d="M6.93,59.336H3.547a1.83,1.83,0,0,1-2.055-1.88q-.006-3.639,0-7.278A1.832,1.832,0,0,1,3.552,48.3c1.036,0,2.073,0,3.109,0,.851,0,.9-.051.865-.841-.021-.452-.113-.535-.6-.536-1.128,0-2.256,0-3.383,0a5.626,5.626,0,0,0-.848.062,3.2,3.2,0,0,0-2.7,3.09c.021,1.245,0,2.487,0,3.741H0c0,1.286-.028,2.618.007,3.927A3.144,3.144,0,0,0,3.134,60.69c1.166.052,2.336.021,3.5.024.876,0,.928-.049.89-.854C7.506,59.392,7.446,59.337,6.93,59.336Z"
                            transform="translate(0.012 -46.924)"
                        />
                    </svg>
                    <span onClick={()=>{
                        signOut(()=>{
                            console.log("callback")
                            try {
                                localStorage.clear()
                            }finally {
                                window.location.href="/"
                            }


                        });

                    }}>Log Out</span>
                </a>
            </div>
            <div className="col-12">
                <div
                    className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between account-billing-info"
                >
                    <div className="d-flex align-items-center justify-content-between px-1 px-lg-0">
                        <div className="d-flex d-lg-none flex-column balance-item mob">
                            <span>Balance</span>
                            <div className="sum">100000.00 <span>USD</span></div>
                        </div>
                        <div className="d-flex align-items-center">
                            <button className="btn-for-icon">
                                <img src={viewOn} alt=""/>
                            </button>
                            <button className="btn-for-icon reload-balance">
                                <img src={reload} alt=""/>
                            </button>
                        </div>
                    </div>
                    <hr className="balance-double"/>
                    <div className="row mx-0 w-100 balance-info">
                        <div className="col-12 col-lg-4 d-none d-lg-flex">
                            <div className="d-flex flex-column balance-item">
                                <span>Balance</span>
                                <div className="sum">100000.00 <span>USD</span></div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-4">
                            <div className="d-flex flex-column balance-item">
                                <span>Pending Bets</span>
                                <div className="sum">0.00 <span>USD</span></div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-4">
                            <div className="d-flex flex-column balance-item">
                                <span className="text-nowrap">Pending Withdrawals</span>
                                <div className="sum">100000.00 <span>USD</span></div>
                            </div>
                        </div>
                    </div>
                    <button className="btn-dep">Make a Deposit</button>
                </div>
            </div>
            <div className="col-12">
                <ul
                    className="row account-tabs d-flex flex-column flex-md-row list-unstyled"
                >
                    <li className="col nav-item" role="presentation">
                        <a
                            href="/personal.html"
                            className="d-flex align-items-center justify-content-between nav-link"
                        >
                            <span>Personal Data</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    id="add"
                                    d="M14.571,6.571H9.714a.286.286,0,0,1-.286-.286V1.429a1.429,1.429,0,0,0-2.857,0V6.286a.286.286,0,0,1-.286.286H1.429a1.429,1.429,0,0,0,0,2.857H6.286a.286.286,0,0,1,.286.286v4.857a1.429,1.429,0,1,0,2.857,0V9.714a.286.286,0,0,1,.286-.286h4.857a1.429,1.429,0,1,0,0-2.857Zm0,0"
                                />
                            </svg>
                        </a>
                    </li>
                    <li className="col nav-item" role="presentation">
                        <a
                            href="/confirmation.html"
                            className="d-flex align-items-center justify-content-between nav-link"
                        >
                            <span>Account Confirmation</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    id="add"
                                    d="M14.571,6.571H9.714a.286.286,0,0,1-.286-.286V1.429a1.429,1.429,0,0,0-2.857,0V6.286a.286.286,0,0,1-.286.286H1.429a1.429,1.429,0,0,0,0,2.857H6.286a.286.286,0,0,1,.286.286v4.857a1.429,1.429,0,1,0,2.857,0V9.714a.286.286,0,0,1,.286-.286h4.857a1.429,1.429,0,1,0,0-2.857Zm0,0"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Balance;
