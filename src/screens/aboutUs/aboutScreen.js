import React, {useEffect} from 'react';

import {ContentNavigator, Footer, Header, Swp} from "../../components";
import {useTranslation} from "../../core";


const AboutUsScreen = () =>{
    const {i18n} = useTranslation()

    return (
        <>
            <Header page={"aboutUs"}/>

            <main className="page">
                <div className="container">
                    <ContentNavigator page="aboutUs" lang={i18n.language}/>
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">About Us</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>
                                    PlanetaXBet is an online casino founded by enthusiasts of gambling, who value the activity for its true virtue - betting against or according to the odds and enjoying the thrill of winning.                                 </p>

                                <p>
                                    PlanetaXBet was created in 2021 and since then has improved to satisfy both experienced gamblers and amateur players, as well as crypto adventurers. We offer a fast payment system and ever-perfecting crypto-gambling platform with a vast variety of games and categories - all secured with advanced privacy protocols, created to shield our users from interrupting their amusement.                                 </p>
                                <p>
                                    So, check your odds and let the entertainment begin!
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </main>




            <Footer/>
        </>
    )
}

export default AboutUsScreen
