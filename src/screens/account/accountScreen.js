import React, {useEffect, useState} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {Balance, Footer, Header, Information} from "../../components";

import "../../assets/styles/_select2.scss"
const AccountScreen = () =>{
    const nav  = useNavigation();
    useEffect(()=>{
    },[nav]);


    return (
        <>
            <Header page={'account'}/>

            <main className="account">
                <div className="container">
                    <div className="row">
                        <Balance/>

                        <Information/>
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default AccountScreen
