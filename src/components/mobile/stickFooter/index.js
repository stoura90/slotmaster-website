import React from 'react';
import {Link, useParams} from "react-router-dom";
import {
    stickHome,
    stickDeposit,
    stickWithdraw,
    stickAccount
} from '../../../assets/img/icons/icons';

import './stickFooter.scss';
import {useUser} from "../../../core/hooks/useUser";

const StickFooter = () =>{
    const lang = 'en';
    const {User} = useUser();

    return (
        <>
            {
                User.isLogged && <ul className="stickFooter" id="stickFooter">
                    <li>
                        <Link to={`/${lang}/main`}>
                            <i><img src={stickHome} alt=""/></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/${lang}/account/finances?to=deposit`}>
                            <i><img src={stickDeposit} alt=""/></i>
                            <span>Deposit</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/${lang}/account/finances?to=withdraw`}>
                            <i><img src={stickWithdraw} alt=""/></i>
                            <span>Withdraw</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/${lang}/account`}>
                            <i><img src={stickAccount} alt=""/></i>
                            <span>Account</span>
                        </Link>
                    </li>
                </ul>
            }
        </>
    )
}
export default StickFooter;
