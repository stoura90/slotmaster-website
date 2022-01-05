import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";

import {Balance, Footer, Guest, Header} from "../../components";
import "../../assets/styles/_select2.scss"
import {useTranslation} from "../../core";

const VerificationScreen = () =>{
    const {t} = useTranslation()
    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav);
        setTimeout(function (){
            document.getElementById('btn-confirm-verification').click();
        },1000)

    },[nav]);
    return (
        <>
            <Header page={"transaction"}/>

            <main className="account">
                <div className="container">
                    <Guest/>

                    <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#VerificationModal"
                        className="btn-confirm"
                        id="btn-confirm-verification"
                        style={{display:'none'}}
                    >
                        {t("Confirm")}
                    </button>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default VerificationScreen
