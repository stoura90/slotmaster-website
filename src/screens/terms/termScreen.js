import React, {useEffect} from 'react';

import {ContentNavigator, Footer, Header, Swp} from "../../components";
import {useTranslation} from "../../core";


const TermScreen = () =>{
    const {i18n} = useTranslation()
    const {t} = useTranslation();

    return (
        <>
            <Header page={"terms"}/>

            <main className="page">
                <div className="container">
                    <ContentNavigator page="terms" lang={i18n.language}/>
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('Terms and conditions')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>
                                    1.1. Your use of any service and play of any game provided on this website – www.planetaxbet.com, means that you agree on and accept the following legally binding terms and conditions. If you do not agree to be bound by these terms and conditions, you should quit using the services and leave the website immediately. Please, read these terms and conditions carefully before using the website or any of the services.
                                </p>

                                <p>
                                    1.2. The Website is operated by Winfinity N.V., a limited liability company registered and established under the laws of Curaçao, with company registration number 156346 (the “Company” or “We”). We hold a gaming license allowing us to operate games of chance on the international market via Internet, duly issued and granted by Master License of Gaming Services Provider, N.V. #365/JAZ. Under the valid gaming license, We offer you the games and services on this website (the “Gaming Services” or “Services”). Unless otherwise stated, “We” or the “Company” refers collectively to our subsidiaries, directors, officers, employees, agents and contractors.
                                </p>

                                <p>
                                    1.3. When you (the “End User” or “User” or “You” or “Customer”) use the website or services, these Terms and Conditions together with any and all documents referred to hereby and being an integral part of this document (the “Terms of Services” “Terms of Use” or “Agreement” or “User Agreement”) shall apply to such use.
                                </p>

                                <p>
                                    1.4. In addition to this document, the Privacy Policy, Bonus Terms and Conditions, Sportsbook Terms and Conditions and List of Prohibited Territories apply to Your use of the Website and the Services, and You should review it prior to any use of the Website or the Services. The Privacy Policy, Bonus Terms and Conditions, Sportsbook Terms and Conditions and List of Prohibited Territories are provided on the Website and form the integral part of these Terms and Conditions.
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

export default TermScreen
