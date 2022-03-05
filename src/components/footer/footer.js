import React from 'react';
import '../footer/footer.scss';
import {FooterCarousel} from "../index";
import {betsoft, evolutionGaming, netent} from "../../assets/img/images";
import {discord, gr, kiron, pragmatic, wazdan} from "../../assets/img/icons/icons";
import {Link} from "react-router-dom";
import {i18n, useTranslation} from "../../core";
import {btc,ltc} from "../../assets/img/crypro/crypto";

const Footer =()=>{
    const {t} = useTranslation()
    return(
        <footer className="footer">
            <div className="container">
                <div className="row gx-0 align-items-center">
                    <div className="col-12 d-md-none">
                        <div className="d-flex align-items-center justify-content-between social-list">
                            <a
                                href="#"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-facebook-f facebook"/>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-reddit-alien reddit"/>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-instagram instagram"/>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-twitter twitter"/>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <img src={discord} alt="" className="discord"/>
                            </a>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <ul className="footer-menu">
                            <li>
                                <a href="#">{t("About Us")}</a>
                            </li>
                            <li>
                                <a href="#">{t("Blog")}</a>
                            </li>
                            <li>
                                <a href="#">{t('Promotions')}</a>
                            </li>
                            <li>
                                <a href="#">{t('Affiliates')}</a>
                            </li>
                            <li>
                                <Link to={`/${i18n.language}/terms`}>{t("Terms and conditions")}</Link>
                            </li>
                            <li>
                                <Link to={`/${i18n.language}/contact`}>{t("Contact Us")}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-3">
                        <ul className="footer-menu">
                            <li><Link to={`/${i18n.language}/privacy`}>{t("Privacy Policy")}</Link></li>
                            <li><Link to={`/${i18n.language}/kyc_aml`}>{t("KYC/AML Policy")}</Link></li>
                            <li className="d-none d-md-flex"><Link to={`/${i18n.language}/responsible_gaming`}>{t("Responsible Gaming")}</Link></li>
                            <li><Link to={`/${i18n.language}/self_exclusion_policy`}>{t("Self Exclusion Policy")}</Link></li>
                            <li><a href="#">{t("Underage Gaming Policy")}</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="row gx-0">
                            <div className={"position-relative  logo-list ft-carousel-1"}>
                                <FooterCarousel count={3} data={[
                                    {id:1,icon:evolutionGaming},
                                    {id:1,icon:wazdan},
                                    {id:1,icon:gr},

                                ]}/>
                            </div>
                            <div className={"position-relative  logo-list ft-carousel-2 last"}>
                                <FooterCarousel count={3} data={[
                                    {id:1,icon:kiron},
                                    {id:1,icon:pragmatic},
                                    {id:1,icon:betsoft},
                                ]}/>
                            </div>

                        </div>
                    </div>
                </div>

                <br/>

                <div className="row footer-crypto-soc">
                    <div className="col-12 col-lg-8">
                        <h6 style={{textAlign:'left',color:'#C6D1ED'}}>Accepted Currencies</h6>
                        <div style={{justifyContent:'left'}} className="crypto">
                            <i className="crypto"><img src={btc} /></i>
                            <i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i>
                            <i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i><i className="crypto"><img src={ltc} /></i>

                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <h6 style={{textAlign:'right',color:'#C6D1ED'}}>Follow Us</h6>
                        <div style={{justifyContent:'right'}} className="d-none d-md-flex social-list">
                                <a
                                    href="#"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <i className="fab fa-facebook-f facebook"/>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <i className="fab fa-reddit-alien reddit"/>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <i className="fab fa-instagram instagram"/>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <i className="fab fa-twitter twitter"/>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <img src={discord} alt="" className="discord"/>
                                </a>
                            </div>
                    </div>
                </div>

                <br/>

                <div className="row gx-0 align-items-center">
                    <div className="d-flex align-items-center footer-bt" style={{marginTop:'0'}}>
                        <div className="d-flex align-items-center justify-content-center restriction">
                            <span>+18</span>
                        </div>
                        <div className="footer-copyright d-flex align-items-center">
                            <p style={{margin:'0'}}>Copyright © 2021  www.planetaxbet.com is operated by Winfinity N.V. that is licensed by the Government of Curacao and operates under the Master License of Gaming Services Provider, N.V. #365/JAZ as an Information Service Provider. Winfinity N.V.’s registration number is 156346 and its registered address is Abraham de Veerstraat 9, Curaçao.</p>
                            <iframe src="https://licensing.gaming-curacao.com/validator/?lh=3a84155f3027a434172149ba09f2bce5&template=seal" style={{'width':'150px','height':'50px','border':'none','marginLeft':'20px'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
