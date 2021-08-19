import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {Balance, Footer, Header} from "../../components";

import "../../assets/styles/_select2.scss"
const AccountScreen = () =>{
    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav)

    },[nav]);
    return (
        <>
            <Header page={'account'}/>

            <main className="account">
                <div className="container">
                    <div className="row">
                        <Balance/>
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default AccountScreen
