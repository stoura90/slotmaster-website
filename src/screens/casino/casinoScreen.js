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
    sl2,
    slider1,
    slotSardCover,
    sun,
    tonys,
    webmoney
} from '../../assets/img/images';
import {discord, logo, play} from "../../assets/img/icons/icons";
import {Carousel, FooterCarousel, Header, HeaderCarousel, SlotCard, Swp} from "../../components";
import _ from "lodash";
import {CustomDropdown} from "../../components/dropdown/dropDown";


const CasinoScreen = () =>{
    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav)

    },[nav]);
    return (
        <>
            <Header/>
            <main>
                <div className="container">

                    <div className="row">
                        <div className="col-12 d-flex align-items-center flex-row main-filter">

                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder="Search"
                                />
                                <span className="btn-search"></span>
                            </div>
                            <CustomDropdown style={{height:"174px"}}label={"Categories"} data={[
                                { id:1, name:"Live Blackjacks",checked:false},
                                { id:2, name:"Live Roulette",checked:false},
                                { id:3, name:"Live Baccarat",checked:false}
                            ]}/>
                            <div style={{marginLeft:'10px'}}>

                            </div>
                            <CustomDropdown label={"Provider"} data={[
                                { id:1, name:"Evolution Gaming",checked:false},
                                { id:2, name:"Pragmatic Play LC",checked:false},
                                { id:3, name:"Pragmatic Play LC",checked:false},
                                { id:4, name:"Evoplay Entertai...",checked:false},
                                { id:5, name:"BetGames TV",checked:false},
                                { id:6, name:"Authentic",checked:false},
                                { id:7, name:"Playtech",checked:false},
                            ]}/>
                            <div
                                className="filter-button d-lg-none"
                                data-bs-toggle="modal"
                                data-bs-target="#FilterModal"
                            >
                                <img src="img/icons/filter.svg" alt="Filter"/>
                            </div>
                        </div>

                        <div className="col-12 d-flex align-items-center section-head">
                            <a href="#">
                                <div className="section-heading">all Provider</div>
                            </a>
                        </div>

                        <div className="col-12">
                            <div className="row casino-list">

                                <SlotCard count={20} data={[
                                    {id:1,icon:slotSardCover},
                                    {id:1,icon:pirate},
                                    {id:1,icon:tonys},
                                    {id:1,icon:narcos},
                                    {id:1,icon:kings},
                                    {id:1,icon:slotSardCover},
                                    {id:1,icon:slotSardCover},
                                    {id:1,icon:pirate},
                                    {id:1,icon:tonys},
                                    {id:1,icon:narcos},
                                    {id:1,icon:kings},
                                    {id:1,icon:slotSardCover}
                                    ]} />


                            </div>
                        </div>


                        <div className="col-12">
                            <div className="show-more">
                                <div className="show-info">You’ve viewed 40 of 911 games</div>
                                <div className="show-more-btn">show more</div>
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

export default CasinoScreen