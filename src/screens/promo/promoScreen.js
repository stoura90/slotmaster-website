import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    ajax,
    bayern,
    betsoft,
    bitcoin,
    evolutionGaming,
    inter,
    kings,
    liver,
    logoM,
    manCity,
    manUn,
    milan,
    narcos,
    neteller,
    netent,
    pirate,
    slider1,
    slotSardCover,
    sun,
    tonys,
    webmoney,
    promo1,
    promo2,
    promo3,
    promo4,
    promo5,
    promoCardCover,
    sl2
} from '../../assets/img/images';
import {discord, logo, play} from "../../assets/img/icons/icons";
import {Carousel, FooterCarousel, Header, HeaderCarousel, SlotCard, Swp} from "../../components";
import _ from "lodash";
import PromoCard from "../../components/promo/promoCard";


const PromoScreen = () =>{
    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav)

    },[nav]);
    return (
        <>
            <Header/>
            <main>
                <div className="container">

                    <ul className="d-flex align-items-center flex-wrap promo-tabs list-unstyled">
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link active"> All </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> Casino </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> Sports </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> Shop </a>
                        </li>
                    </ul>
                    <div className="col-12 d-flex align-items-center section-head">
                        <a href="#">
                            <div className="section-heading">all Provider</div>
                        </a>
                    </div>

                    <div className="tab-content promo-list" id="myTabContent">
                        <div>
                            <div className="row">
                                <PromoCard count={20} data={[
                                    {id:1,icon:promo1},
                                    {id:1,icon:promo2},
                                    {id:1,icon:promo3},
                                    {id:1,icon:promo4},
                                    {id:1,icon:promo5},
                                    {id:1,icon:promoCardCover}
                                ]} />

                            </div>
                        </div>
                    </div>


                </div>
            </main>
            <footer>
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
                                    <i className="fab fa-twitter twitter"></i>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <img src="img/icons/discord.svg" alt="" className="discord"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <ul className="footer-menu">
                                <li>
                                    <a href="#">About Us</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">Promotions</a>
                                </li>
                                <li>
                                    <a href="#">Affiliates</a>
                                </li>
                                <li>
                                    <a href="./terms.html">Terms and conditions</a>
                                </li>
                                <li>
                                    <a href="./contact.html">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-3">
                            <ul className="footer-menu">
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">KYC Policy</a></li>
                                <li><a href="#">AML Policy</a></li>
                                <li className="d-none d-md-flex"><a href="#">Responsible Gaming Policy</a></li>
                                <li className="d-md-none"><a href="#">Responsible Gaming</a></li>
                                <li><a href="#">Self Exclusion Policy</a></li>
                                <li><a href="#">Underage Gaming Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="row gx-0">
                                <div className={"position-relative  logo-list ft-carousel-1"}>
                                    <FooterCarousel count={3} data={[
                                        {id:1,icon:evolutionGaming},
                                        {id:1,icon:netent},
                                        {id:1,icon:betsoft},
                                        {id:1,icon:betsoft},
                                    ]}/>
                                </div>
                                <div className={"position-relative  logo-list ft-carousel-2 last"}>
                                    <FooterCarousel count={3} data={[
                                        {id:1,icon:evolutionGaming},
                                        {id:1,icon:netent},
                                        {id:1,icon:betsoft},
                                        {id:1,icon:betsoft},
                                    ]}/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center footer-bt">
                        <div
                            className="d-flex align-items-center justify-content-center restriction"
                        >
                            <span>+18</span>
                        </div>
                        <div className="footer-copyright">
                            Copyright © 2021 www.planetaxbet.com is operated by Group
                            Enterprises N.V., a company registered and established under the
                            laws of Curaçao. Nexus Group Enterprises N.V. is licensed
                        </div>
                        <div className="d-none d-md-flex align-items-center social-list">
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
            </footer>

        </>
    )
}

export default PromoScreen