import React, {useEffect} from 'react';

import {ContentNavigator, Footer, Header, Swp} from "../../components";
import {useTranslation} from "../../core";


const SepScreen = () =>{
    const {i18n} = useTranslation()
    return (
        <>
            <Header page={"self_exclusion_policy"}/>

            <main className="page">
                <div className="container">
                    <ContentNavigator page="self_exclusion_policy" lang={i18n.language}/>
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Self-exclusion and Self limitation</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>The user can choose to self-exclude for a specific period of time. The account recovery is possible upon the user’s request.</p>
                                <p>The user can open only one account.</p>
                                <p>The user also can set a deposit limit for a specific period of time.</p>
                                <p>In order to establish self-exclusion or self-limitation, you can write the request to support mail from registered e-mail. The user should include the User ID and desired requisition for limitation in this request. Requisition for limitation should include limit amount and period of limitation.</p>
                                <p>Suggestions for responsible gambling
                                    Do not think of gambling as a way to make money or as a distraction from everyday problems.</p>
                                <p>Take regular breaks. Set a time limit and when the time is up, quit. The odds are that the more time you spend gambling, the more you will lose.
                                    Only gamble with money you can afford to lose, not money you have set aside for bills,</p>
                                <p>Set a monthly money limit in advance and stick with it.</p>
                                <p>Once setting a maximum limit, do not further increase it.</p>
                                <p>Never chase your losses, if you set a limit and then try and win some of it back after you reached it, you haven’t set a limit.</p>
                                <p>Do not play under the influence of alcohol or drugs.</p>
                                <p>Do not gamble when you are depressed or upset, decision making can be more difficult when you are stressed or emotionally upset.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Loss of control</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>Gambling should be seen as entertainment and not as a means to make money. The user can keep track of the time and money you spend while gambling. If the user need a break from gambling, self-exclusion can be set in such case. The user must not chase his losses. He should gamble what he can afford to lose.</p>
                                <p>Responsible Gaming Policy also means protection of the company and other users from fraud users and players that means:</p>
                                <p>Bets placed from the different accounts (whether they are verified or unverified), where only one IP is detected, the company will regard these bets to be placed by one person, Winfinity N.V. reserves the right to block such accounts for the period of 6 (six) months, in purpose to supervise such accounts, cancel the placed bets and refund the player with his own (deposited) amounts without any wins.</p>
                                <p>The users, noticed by the company representatives, acting in respect of the agreed game principle (artificial loss or artificial win), will be blocked and restricted from using the account at least for 60 days, in order to reveal the reason of activity from such user. If there is a doubt that the players use collective gaming method (conspiration), the company reserves the right to investigate such cases, when it can block the accounts of the noticed entities and deprive such users of using such account for unspecified period.</p>
                                <p>The company reserves the right, for the purpose of fight against fraud with respect to credit cards, to check the user’s deposition and require credit cards copies from him. In case of disclosure of fraud activities from the player’s side, as a result of which the company will gain emotional distress and/or financial loss, its “commercial goodwill”, the company reserves the right to: a) restrict from betting or cancel all previously placed bets; b) close the client’s account and all his monetary balances; c) restrict access to the system; d) confiscate (deprive) all wins gained as a result of illegal activities; e) Apply to legal authorities in order to eradicate doubtful acts of the users, registered within his system;</p>
                                <p>(f) Judicially require reimbursement of losses and legal fees from the player; g) Cancel bets that are placed purposefully by neglecting the company’s restrictions by means of such redundant and similar activities; h) Forbid wagering or cancel placed bet, close the user’s account and his monetary balance or apply to legal authorities in case the user was preliminarily aware of course of events while placing the bet, represents indirect participant of the match or an interested person.</p>
                                <p>In case the amount was transferred to the user incorrectly due to any reason, such user is liable to immediately inform the company representatives concerning it. In case of withdrawal of such amount from the system, the company reserves the right to apply to the appropriate authorities and require reimbursement of losses from the user.</p>
                                <p>The company is serious about keeping honesty principle when it comes to wagering. We cooperate with our gaming regulatory bodies and independent sports associations in order to ensure the existence of principles of fairness and honesty in gaming and sports.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>


            <Footer/>
        </>
    )
}

export default SepScreen
