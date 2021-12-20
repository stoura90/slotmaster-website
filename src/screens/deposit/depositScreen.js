import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    bitcoin,
    netent,
    webmoney
} from '../../assets/img/images';

import {
    arrowLeftBack,
    percent,
    skrillSmall,
    time,
} from '../../assets/img/icons/icons';


import {Balance, Footer, Header} from "../../components";

import "../../assets/styles/_select2.scss"
import {useTranslation} from "../../core";
const DepositScreen = () =>{
    const nav  = useNavigation();
    const {t} = useTranslation()
    useEffect(()=>{
        console.log(nav)

    },[nav]);
    return (
        <>
            <Header page={"deposit"}/>

            <main className="account">
                <div className="container">
                    <div className="row">
                        <Balance/>

                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <a href="/finances.html" className="d-flex align-items-center back">
                                        <img src={arrowLeftBack} alt=""/>
                                        <div className="tab-headline">{t('Deposit')}</div>
                                    </a>
                                </div>
                                <div className="col-12">
                                    <div className="row px-0">
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src={netent} alt=""/>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src={bitcoin} alt=""/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">4 - ∞</div>
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
                                                        <div className="reflection-duration"></div>
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
                                                    {t('Deposit')}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src={webmoney} alt="Webmoney"/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">1 - 10000</div>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src="img/jeton.png" alt="Jeton"/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">1 - 10000</div>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src={skrillSmall} alt="Skrill"/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">1 - 10000</div>
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
                                                    {t('Deposit')}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src="img/ecopayz.png" alt="Eco Payz"/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">5 - 999999</div>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src={netent} alt=""/>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src={bitcoin} alt=""/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">4 - ∞</div>
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
                                                        <div className="reflection-duration"></div>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src="img/webmoney.png" alt="Webmoney"/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">1 - 10000</div>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src="img/jeton.png" alt="Jeton"/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">1 - 10000</div>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src="img/skrill.png" alt="Skrill"/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">1 - 10000</div>
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
                                        <div className="col-md-6 col-lg-3 col-xl-2">
                                            <div
                                                className="d-flex flex-column billing-card align-items-start justify-content-between"
                                            >
                                                <div className="billing-name mx-auto">
                                                    <img src="img/ecopayz.png" alt="Eco Payz"/>
                                                </div>
                                                <div
                                                    className="w-100 d-flex flex-md-column align-items-center align-items-md-start justify-content-between billing-info">
                                                    <div className="d-flex align-items-center">
                                                        <span className="currency">USD</span>
                                                        <div className="amount-limit">5 - 999999</div>
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
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default DepositScreen
