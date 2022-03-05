import React, {useEffect, useState} from 'react';
import './style.scss';
import { useTranslation} from "../../../core";
import Deposit from '../deposit/Deposit';
import Withdraw from '../withdraw/Withdraw';
import {PLXModal} from "../../index";
import {useNavigation} from "../../../core/hooks/useNavigation";

const Finances = () => {
    const {t} = useTranslation();
    const nav = useNavigation()
    const [deposit,setDeposit]=useState(false);
    const [withdraw,setWithdraw]=useState(false);
    const [history,setHistory]=useState(false);

    useEffect(()=>{
        if(nav.get('to') === "deposit"){
            setWithdraw(false)
            setDeposit(true);
        }else if(nav.get('to') === "withdraw"){
            setDeposit(false);
            setWithdraw(true)
        }
        nav.remove('to')
    },[nav])

    const svgArrow =()=>{
        return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16.828" viewBox="0 0 20 16.828">
                <g id="arrow-left" transform="translate(1 1.414)">
                    <line id="Line_1" data-name="Line 1" x2="18" transform="translate(0 7)"
                          fill="none" stroke="#7385b1" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="2"/>
                    <path id="Path_235" data-name="Path 235" d="M5,19l7-7L5,5"
                          transform="translate(6 -5)" fill="none" stroke="#7385b1"
                          stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"/>
                </g>
            </svg>)
    }


    return (
        <>
            <div className="tab-content" id="verificationTabContent">
                <div
                    className="tab-pane fade show active"
                    id="verification"
                    role="tabpanel"
                    aria-labelledby="personal-tab"
                >

                    {
                        !deposit && !withdraw && !history && (
                            <div className="account-tab-inner">
                                <div className="tab-headline">{t("Finances")}</div>

                                <ul className="finances account-tabs nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button onClick={(e)=>setDeposit(true)} className="d-flex align-items-center justify-content-between nav-link secondery"
                                                id="deposit-tab" type="button">
                                            <span>Deposit</span>
                                            {svgArrow()}
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=>setWithdraw(true)} className="d-flex align-items-center justify-content-between nav-link secondery"
                                                id="withdraw-tab" type="button">
                                            <span>Withdraw</span>
                                            {svgArrow()}
                                        </button>
                                    </li>
                                    {/*<li className="nav-item" role="presentation">
                                        <button onClick={()=>setHistory(true)} className="d-flex align-items-center justify-content-between nav-link secondery"
                                                id="transaction-tab" type="button">
                                            <span>Transaction history</span>
                                            {svgArrow()}
                                        </button>
                                    </li>*/}
                                </ul>
                            </div>
                        )
                    }


                    {
                        deposit ? <Deposit onClose={()=> setDeposit(false)}/> : ''
                    }
                    {
                        withdraw ? <Withdraw onClose={()=> setWithdraw(false)}/>:''
                    }



                </div>
            </div>
        </>
    )
}

export default Finances;
