import React, {useEffect} from 'react';
import {Balance, Finances, Footer, Header, Information, Verification,Transactions} from "../../components";

import "../../assets/styles/_select2.scss"
import {Redirect, useParams} from "react-router-dom";
import {useUser} from "../../core/hooks/useUser";
const AccountScreen = () =>{
    const {route,lang} = useParams()
    const {User} = useUser();
    const renderView=()=> {

        switch(route){
            case "verification":return <Verification/>
            case "finances":return <Finances/>
            case "transactions":return <Transactions/>
            default : return <Information/>
        }
    }

    return User.isLogged?(
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
    ):( <Redirect to={`/${lang}/main`}/>)
}

export default AccountScreen
