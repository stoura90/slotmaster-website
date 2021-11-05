import React from "react";
import {Balance, Footer, Header, Information} from "../../components";

const ContactScreen = ()=>{

    return <>
    <Header page={"contact"}/>
        <main className="page">
            <div className="container">
                <div className="row scroll">
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">About Us</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">Blog</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">Promotions</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">Affiliates</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="./terms.html" className="page-link">Terms and conditions</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="./contact.html" className="page-link active">Contact Us</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">Privacy Policy</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">KYC Policy</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">AML Policy</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">Responsible Gaming</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">Underage Policy</a>
                    </div>
                    <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                        <a href="#" className="page-link">Self Exclusion Policy</a>
                    </div>
                </div>
                <div className="page-wrapper contact">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-headline">Contact Us</div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/uk-flag.png").default} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">Phone</div>
                                                <a href="tel:0-800-210-410" className="contact-type">0-800-210-410</a>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/email.png").default} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">Email</div>
                                                <a href="mailto:support@planetaxbet.com"
                                                   className="contact-type">support@planetaxbet.com</a>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/telegram.png").default} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">Telegram</div>
                                                <a href="mailto:support@planetaxbet.com" target="_blank"
                                                   className="contact-type">@HelpPlanetaXbet</a>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/chat.png").default} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">Chat</div>
                                                <div className="contact-type underline">Write a Message</div>
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
}
export default ContactScreen;
