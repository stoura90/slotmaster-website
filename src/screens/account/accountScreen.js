import React, {useEffect} from 'react';
import {Balance, Finances, Footer, Header, Information, Verification} from "../../components";

import "../../assets/styles/_select2.scss"
import {useParams} from "react-router-dom";
const AccountScreen = () =>{
    const {route} = useParams()

    const renderView=()=> {

        switch(route){
            case "verification":return <Verification/>
            case "finances":return <Finances/>
            default : return <Information/>
        }
    }

    return (
        <>
            <Header page={'account'}/>

            <main className="account">
                <div className="container">
                    <div className="row">
                        <Balance route={route}/>
                        {
                            renderView()
                        }
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default AccountScreen
