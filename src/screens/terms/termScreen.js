import React, {useEffect} from 'react';

import {ContentNavigator, Footer, Header, Swp} from "../../components";


const TermScreen = () =>{

    return (
        <>
            <Header page={"terms"}/>

            <main className="page">
                <div className="container">
                    <ContentNavigator page="terms" lang="ka"/>
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Terms and conditions</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>
                                    1.1. Your use of any service and play of any game provided on
                                    this website – www.fortunejack.com (the “Website”), means that
                                    you agree on and accept the following legally binding Terms and
                                    Conditions. If you do not agree to be bound by these Terms and
                                    Conditions, you should quit using the services and leave the
                                    Website immediately. Please, read these Terms and Conditions
                                    carefully before using the Website or any of the services.
                                </p>

                                <p>
                                    1.2. The Website is operated by Nexus Group Enterprises N.V., a
                                    limited liability Company registered and established under the
                                    laws of Curaçao, with company registration number 139781 (the
                                    “Company” or “We”). We hold a gaming license allowing us to
                                    operate games of chance on the international market via
                                    Internet, duly issued and granted by Antillephone N.V.. Under
                                    the valid gaming license, We offer you the games and services on
                                    this Website (the “Gaming Services” or “Services”). Unless
                                    otherwise stated, “We” or the “Company” refers collectively to
                                    our subsidiaries, directors, officers, employees, agents and
                                    contractors.
                                </p>

                                <p>
                                    1.3. When you (the “End User” or “User” or “You” or “Customer”)
                                    use the Website or Services, these Terms and Conditions together
                                    with any and all documents referred to hereby and being an
                                    integral part of this document (the “Terms of Services” “Terms
                                    of Use” or “Agreement” or “User Agreement”) shall apply to such
                                    use.
                                </p>

                                <p>
                                    1.4. In addition to this document, the Privacy Policy, Bonus
                                    Terms and Conditions, Sportsbook Terms and Conditions and List
                                    of Prohibited Territories apply to Your use of the Website and
                                    the Services, and You should review it prior to any use of the
                                    Website or the Services. The Privacy Policy, Bonus Terms and
                                    Conditions, Sportsbook Terms and Conditions and List of
                                    Prohibited Territories are provided on the Website and form the
                                    integral part of this Terms and Conditions.
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
