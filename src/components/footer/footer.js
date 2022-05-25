import React from 'react';
import '../footer/footer.scss';
import {FooterCarousel} from "../index";
import {betsoft, netent} from "../../assets/img/images";
import {discord, gr,
    evolutionGaming,
    relax,
    pragmatic,
    playngo,
    isoftbet,
    kiron,
    wazdan,
} from "../../assets/img/icons/icons";
import {Link} from "react-router-dom";
import {i18n, useTranslation} from "../../core";
import {
    ada,
    bnb,
    btc,
    busd,
    dash,
    eth,
    ltc,
    neo,
    trx,
    usdc,
    usdt} from "../../assets/img/crypro/crypto";

const Footer =()=>{
    const {t} = useTranslation()
    return(
        <footer className="footer">
            <div className="container">
                <div className="row gx-0 align-items-center foot-wrap">
                    <div className="col-12 d-md-none">
                        <h6 style={{textAlign:'left',color:'#C6D1ED',paddingLeft:'3px'}}>Follow Us</h6>
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
                    <div className="mob-col col-12 col-lg-3" >
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
                    <div className="mob-col col-12 col-lg-3">
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
                                    {id:67,icon:evolutionGaming, page:'casino'},
                                    {id:63,icon:relax, page:'slots'},
                                    {id:69,icon:pragmatic, page:'slots'},

                                ]}/>
                            </div>
                            <div className={"position-relative  logo-list ft-carousel-2 last"}>
                                <FooterCarousel count={3} data={[
                                    {id:62,icon:playngo , page:'slots'},
                                    {id:58,icon:isoftbet, page:'slots'},
                                    {id:57,icon:kiron, page:'virtuals'},
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
                            <i className="crypto" data-color="btc"><img src={btc} /></i>
                            <i className="crypto" data-color="ltc"><img src={ltc} /></i>
                            <i className="crypto" data-color="eth"><img src={eth} /></i>
                            <i className="crypto" data-color="bnb"><img src={bnb} /></i>
                            <i className="crypto" data-color="busd"><img src={busd} /></i>
                            <i className="crypto" data-color="usdt"><img src={usdt} /></i>
                            <i className="crypto" data-color="dash"><img src={dash} /></i>
                            <i className="crypto" data-color="neo"><img src={neo} /></i>
                            <i className="crypto" data-color="ada"><img src={ada} /></i>
                            <i className="crypto" data-color="trx"><img src={trx} /></i>
                            <i className="crypto" data-color="usdc"><img src={usdc} /></i>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-none d-md-flex  flex-md-column">
                        <h6 style={{textAlign:'right',color:'#C6D1ED'}}>Follow Us</h6>
                        <div style={{justifyContent:'right'}} className="d-none d-md-flex social-list">
                                <a
                                    href="https://www.facebook.com/Planetaxbet"
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
                                    href="https://discord.gg/sbjFXbbcBK"
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
