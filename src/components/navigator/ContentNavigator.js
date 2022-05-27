import React, {useEffect} from "react";
import {Link} from "react-router-dom";



const ContentNavigator = ({page,lang})=>{

    return (

        <div className="row scroll">
                {/*<div className="col-auto col-md-3 col-lg-3 col-xl-2">
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
                </div>*/}
                <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <Link to={`/${lang}/terms`} className={`page-link  ${page==='terms'?'active':''}` }>Terms and conditions</Link>
                </div>
                <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <Link to={`/${lang}/contact`} className={`page-link  ${page==='contact'?'active':''}` }>Contact Us</Link>
                </div>
                <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <Link to={`/${lang}/privacy_policy`} className={`page-link  ${page==='privacy_policy'?'active':''}` }>Privacy Policy</Link>
                </div>
                <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <Link to={`/${lang}/kyc_aml`} className={`page-link  ${page==='kyc_aml'?'active':''}` }>KYC/AML Policy</Link>
                </div>
                {/*<div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <Link to={`/${lang}/aml`} className={`page-link  ${page==='aml'?'active':''}` }>AML Policy</Link>
                </div>*/}
                <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <Link to={`/${lang}/responsible_gaming`} className={`page-link  ${page==='responsible_gaming'?'active':''}` }>Responsible Gaming</Link>
                </div>
                {/*<div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <a href="#" className="page-link">Underage Policy</a>
                </div>*/}
                <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <Link to={`/${lang}/self_exclusion_policy`} className={`page-link  ${page==='self_exclusion_policy'?'active':''}` }>Self Exclusion Policy</Link>
                </div>
            </div>

    )

}
export default ContentNavigator;
