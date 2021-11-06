import React, {useEffect} from "react";
import {Link} from "react-router-dom";



const ContentNavigator = ({page,lang})=>{

    return (

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
                    <Link to={`/${lang}/terms`} className={`page-link  ${page==='terms'?'active':''}` }>Terms and conditions</Link>
                </div>
                <div className="col-auto col-md-3 col-lg-3 col-xl-2">
                    <Link to={`/${lang}/contact`} className={`page-link  ${page==='contact'?'active':''}` }>Contact Us</Link>
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

    )

}
export default ContentNavigator;
