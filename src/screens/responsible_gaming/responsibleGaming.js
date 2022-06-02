import React, {useEffect} from 'react';

import {ContentNavigator, Footer, Header, Swp} from "../../components";
import {useTranslation} from "../../core";


const ResponsibleGaming = () =>{
    const {i18n} = useTranslation()
    const {t} = useTranslation();
    return (
        <>
            <Header page={"responsible_gaming"}/>

            <main className="page">
                <div className="container">
                    <ContentNavigator page="responsible_gaming" lang={i18n.language}/>
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('Responsible Gaming Policy')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>Responsible Gaming Policy means that the user should not be dependent on the company or restricted in his decisions while gambling.</p>
                                <p>The user gets acquainted with the regulations of the company and expresses his consent in regard to those terms and conditions provided by the company at the Supervisory Board.</p>
                                <p>In order to support principles of responsible gambling, Winfinity N.V. follows listed principles:</p>
                                <p>Age verification to prevent minor’s participation in gambling</p>
                                <p>The user may at his own discretion choose to exclude himself from playing any games on our websites</p>
                                <p>The user may also set a limit on the amount he may bet within a specified period of time</p>
                                <p>Cooperation with companies that provide support for people with gambling addiction</p>
                                <p>Availability of support services 24/7. Customers can contact support team for any questions and get proper professional assistance any time when needed.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>


            <Footer/>
        </>
    )
}

export default ResponsibleGaming
