import React, {useEffect} from 'react';

import {ContentNavigator, Footer, Header, Swp} from "../../components";
import {useTranslation} from "../../core";


const KycAmlScreen = () =>{
    const {t,i18n}  = useTranslation()
    return (
        <>
            <Header page={"kyc_aml"}/>

            <main className="page">
                <div className="container">
                    <ContentNavigator page="kyc_aml" lang={i18n.language}/>
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('Preamble')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>
                                    Winfinity N.V. (hereinafter – Organization) represents the organizer of gambling business and owner of gambling business license, operating since 2022 and provides service on the online gaming
                                </p>

                                <p>
                                    website https://planetaxbet.com/  organized within the frames of the gaming license.
                                </p>

                                <p>
                                    With the purpose of ensuring the highest standards of the offered service and complete fulfillment of requirements of Law of Client’s Country, the organization has elaborated the given policy “On Anti-Money-Laundering Control”, based on: the international law of  “On Facilitating the Prevention of Illicit Income Legalization”, provision of financial monitoring service “On receiving, systematization, processing information by Tax Service Provider and the rule of submitting such information to FMS” and recommendations of Financial Action Task Force (FATF). The goal of the Policy is to elaborate identification of risks, analyses, conduct, reduce and control system for the Organization against money laundering and financing terrorism.
                                </p>

                                <p>
                                    The Policy is confirmed by the head of organization and is subject to annual renovation.
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('Definition of Terms')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>
                                    Money Laundering – Making illicit income appear legitimate (acquisition, use, transfer and other action), and the hiding or concealment of its true origin, or its owner or possessor, and/or property rights, or the attempt thereof;
                                </p>

                                <p>
                                    Terrorism Financing – any transaction (regardless the amount) implemented by any entity using any remedy whether directly or indirectly, illicitly and purposely, whose aim is to gain or collect monetary fund with the aim or, on the basis of the information that such amount is partially or wholly used for preparation or conduct of terrorist acts. In certain cases this may also apply to the legally gained assets.
                                </p>

                                <p>
                                    Illicit Income - illegal and/or undocumented property owned or possessed by a person;

                                </p>

                                <p>
                                    Identification - obtaining such information on a person that, where necessary, allows for investigating a person or for distinguishing a person from the others;

                                </p>
                                <p>Client – An individual, who registers on the website as a service receiver (player).</p>
                                <p>Business Relationship – Relationship with the client based on the contract, which directly relates to receiving non-single-use service. Under such policy, opening an account on the website for the client, filling the balance, participating in gaming (placing bets, getting winnings), and cash-out are deemed as business relationships.</p>
                                <p>Politically Exposed Person – a foreign citizen who occupies a state (public) political position and/or carries out important public and political activities under the legislation of the country. Politically exposed persons are: the Head of the State, the Head of the Government and Government members, and their deputies, heads of governmental institutions, Members of Parliament, members of the Supreme Court, members of the Constitutional Court, senior officials of the military forces, members of the Central (National) Bank / Financial Supervision Agency Council, ambassadors, heads of enterprises operating with state participation, heads of political parties (associations), members of the executive body of a political party (association), other significant political figures, and their family members and close associates; a person shall be considered as a politically exposed person for one year after his/her resignation from the above positions;</p>
                                <p>Suspicious Transaction – a transaction (irrespective of the amount and type of the transaction), with regard to which there are reasonable grounds for suspecting that the transaction has been entered into or conducted for the purpose of illicit income legalization and/or that property (including funds), based on which the transaction has been entered into or conducted for financial terrorism (a party to the transaction or the origin of the transaction amount is suspicious, or there are other grounds for which the transaction may be considered suspicious), or that any party to the transaction is included in the list of terrorists or there are other grounds for which the transaction may be considered suspicious), or that any party to the transaction is included in the list of terrorists or persons supporting terrorism and/or may be related to them, and/or the amount involved in the transaction may be related to or used for terrorism, terrorist acts, or by terrorists or terrorist organizations or by entities financing terrorism, or that the legal or actual address or place of residence of a party to the transaction is within a non-cooperative area, or that the transaction amount is transferred to or from a non-cooperative area;</p>

                                <p>Unusual Transaction - an unusually large, complex transaction (operation) and/or the unusual constituent parts of a transaction (operation) with no clear economic (commercial) content or clear legitimate purpose and/or those that are inconsistent with the ordinary course of activities of a party to the transaction;</p>
                                <p>Division of Transactions - under the given policy, means the unity of the implemented transactions, carried out by a person or in favor of a person during certain period of time,
                                    the total amount of which exceeds 30 000 GEL or its equivalent in different rates and with regard to which there is reasonable ground for suspecting that they were divided deliberately with the aim to prevent sending reports on transactions. The analysis conducted by monitoring staff members, represents the ground for substantiating the doubt.</p>
                                <p>Monitoring Staff Member – the employee designated on the ground of the resolution, properly drafted by the organization, who is liable for anti-money laundering coordination within the organization</p>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('Inner Control System')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>
                                    With the aim to prevent financing of money laundering and terrorism, the organization ensures creation of effective inner control system consisting of the following components:

                                </p>

                                <p>
                                    internal policies and procedures monitoring staff members
                                </p>

                                <p>
                                    Risk-based approach
                                </p>

                                <p>
                                    Procedure “Know Your Client” Data stores and data register Report
                                </p>
                                <p>
                                    Selection of the cooperators and training New products and services approval
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('Inner Control System')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>
                                    With the aim to prevent financing of money laundering and terrorism, the organization ensures creation of effective inner control system consisting of the following components:

                                </p>

                                <p>
                                    internal policies and procedures monitoring staff members
                                </p>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('Risk-based approach')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>Procedure “Know Your Client” Data stores and data register Report
                                    Selection of the cooperators and training New products and services approval
                                    Internal Policies and Procedures</p>
                                <p>The given policy is the basis for the internal control of the Organization, which determines the main control mechanisms, responsibilities and principles for money laundering and terrorist financing prevention.</p>

                                <p>The procedure “Know Your Client” represents an integral part of the Policy, where the description of monitoring processes of the client identification, verification and business relationship is provided.</p>
                                <p>The given Policy determines the criteria of granting risks to the organization products and the Clients, and corresponding risk measures for the clients’ identification and verification. The given policy is available for all employees of the organization.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('Monitoring Staff Members')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>On the basis of a properly drafted resolution, the organization assigns the cooperator (hereinafter – Responsible Cooperator) responsible for anti-money laundering.</p>
                                <p>The Responsible Cooperator has to create and manage internal control systems determined under the given policy. In order to fulfill this function effectively, the organization must make all the resources available for the responsible cooperator, such as: appropriate technical and software facilities with the function of storing information and documents safely etc.</p>
                                <p>Alongside the Responsible Cooperator, it is the organization’s official’s liability to ensure the effectiveness of the anti-money laundering System. Above all, those cooperators, who indirectly participate within the process of establishing business relations with the clients, are liable for inculcating separate control mechanisms.</p>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Monitoring Staff Members</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>On the basis of properly drafted Resolution, the Organization assigns the cooperator (hereinafter – Responsible Cooperator) responsible for Anti-Money Laundering.
                                </p>
                                <p>The Responsible Cooperator has to create and manage internal control system determined under the given Policy. In order to fulfill this function effectively, the Organization must make all the resources available for the Responsible Cooperator, such as: appropriate technical and software facilities with the function of storing information and documents safely etc.
                                </p>
                                <p>Alongside with the Responsible Cooperator, it is the Organization’s official’s liability to ensure effectiveness of Anti-money Laundering System. Above all, those cooperators, who indirectly participate within the process of establishing business relations with the clients, are liable for inculcating separate control mechanisms.
                                </p>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Risk-Based Approach</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>Risk-based approach stands for the main principle of anti-money laundering within the organization, according to which the organization differentiates its products and clients into low, medium and high risk categories. The identification and assessment of relevant risk-factors for financing of money laundering and terrorism by the organization represents the grounds of risk specification.
                                </p>
                                <p>Specification of proper control mechanisms for medium and high risk category products represents the goal for identification and assessment of risk-factors, on the grounds of which it will be possible to reduce and manage the current risks, threating the organization, of money laundering and terrorism.</p>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Procedure “Know Your Client”</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>Identification of the Clients</p>
                                <p>Identification and verification of the clients represents one of the most significant control mechanisms for reduction of risks of financing money laundering and terrorism. Taking into account the approach based on the risk, the intensity of verification measures depend on the specific risk category, which the client belongs to.</p>
                                <p>The organization identifies the client and takes reasonable measures for verification prior to making the deal or within the process of building business relationships.</p>

                                <p>Standard Measures of Identification</p>
                                <p>Standard measures of identification are used for low and medium-risk clients. According to the given procedure, the Client has to provide the following necessary documentation at the moment of making a deal or building business relations:</p>
                                <p>ID card of a foreign country’s citizen;</p>
                                <p>Passport of a foreign country’s citizen;</p>
                                <p>The document confirming the entity’s identity must meet the following requirements:
                                    Must include requisites specific to such type of document (number, date of issue and validity, protective attributes etc.);
                                    Must include passport holder’s photo;</p>
                                <p>Photo must enable affirmation of the authentication with the document holder; Must be valid Must not be substantially damaged.</p>
                                <p>In case of necessity (for instance, if there is a doubt with regard to accuracy and/or correspondence of Identity details of the current clients), the entity, responsible for
                                    monitoring, requires documents and/or any other information on transaction (operation) and its participants.</p>
                                <p>As a result of identification procedure of the Client, the following data should be indicated:
                                    Full name; Nationality;</p>
                                <p>Date and place of birth; Place of residence;</p>
                                <p>ID (passport) number and personal number of the citizen according to the ID card (Passport);</p>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Termination of Business Relation</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>The Organization refuses to build any business relations with the Client, or considers termination of current business relationship in following cases:
                                </p>
                                <p>Client acts strangely;
                                </p>
                                <p>The terms of the Agreement are violated from the Client’s side;
                                </p>
                                <p>The Organization has reasonable grounds to believe that the Client is involved in Money Laundering and fraudulent transactions;
                                </p>
                                <p>In other cases – in accordance with the decision of the Responsible Individual.
                                </p>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Data Stores and Date Register</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>The Organization registers and stores the following type of recordings and documentations:
                                </p>
                                <p>Requisites, documents and/or their copies provided for identification of the Client; Information on transaction (operation) (if applicable), as well as in the form of electronic recording;

                                </p>
                                <p>The Organization ensures storing other evidences in relation to all recordings, documents and transactions listed above for the terms of at least three years since implementation of transaction.
                                </p>
                            </div>
                        </div>





                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Report</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>The monitoring of transactions, carried out by the Clients and sending reporting on appropriate transactions to Financial Monitoring Service of customers residency country (hereinafter “FMS of Customer”), is the most significant part of the Organization.
                                </p>
                                <p>The following transactions subject to sending reporting to FMS of Customer:
                                </p>
                                <p>If the total amount of transaction, or transactions, implemented for the purpose of its division, exceeds 10 000 USD since the moment of implementation of transaction or not later than 5 business days since receiving the information on existence of such transaction or total transactions;
                                </p>
                                <p>If transaction or identity details are deemed suspicious – since the day when such presumption or doubt was originated;
                                </p>
                                <p>The Responsible Cooperator shall immediately investigate doubtful, unusual and noteworthy cases. If there is any reasonable doubt with regard to legality of origination of money, used in transaction and business relationship or with regard to reputation of the participant, reporting on suspicious transactions shall be immediately provided to FMS of Client. Detailed indications for identifying financing of Money Laundering and Terrorism are given in the procedure “Know Your Client”.
                                </p>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Selection of the Cooperator and Training</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>The Organization takes reinforced measures of identification when hiring the new employees. The significant attention is paid to reputation, qualification and respectability of the candidates for hiring them.
                                </p>
                                <p>Face-to-face training should be held for all the employees of the Organization, who participate within the process of building business relationship with the clients within the terms of one month and afterwards – restudy training annually.
                                </p>
                                <p>The Responsible Cooperator of the Organization shall participate in training for the purpose to increase knowledge and professional skills at least annually. Training should be of an appropriate quality in order to increase his awareness concerning liabilities under the relevant Regulation.
                                </p>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">New Products and Services Approval</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>In case the Organization creates new Product or Services for the clients or significantly changes the specifics of the existing products and services, it should assess Money Laundering risk prior to inculcation of innovations and changes. The Responsible Cooperator participates in the process of risk assessment related to the new products/services, whose recommendations should be taken into account before final affirmation of the product/service design.
                                </p>
                                <p>Money Laundering risks assessment is mandatory, even when segmentation of the service as well as using mediator organizations for managing the processes are considered.
                                </p>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">Anti-Bribery Policy</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>Basic anti-bribery policy goals are:
                                    <ul>
                                        <li>Determination of general policy of combating corruption;
                                        </li>
                                        <li>Elaboration of anti-bribery strategy and plan of actions for its implementation, periodic renovation, progress monitoring and assessment;
                                        </li>
                                        <li>Taking into account recommendations of relevant state bodies with regard to elaboration and implementation process of anti-bribery strategy and plan of actions for its implementation.
                                        </li>
                                    </ul>
                                </p>
                                <p>Elaboration of Anti-Bribery Plan:
                                </p>
                                <p>It is necessary to underline strategic, operative and tactical management levels within the system of combating corruption. Each and every official will be liable for holding anti-bribery events and planning relevant management activity.
                                </p>
                                <p>Attracting workers with relevant skills, giving trainings for the current workers, and ensuring their work process technically and in other ways plays a vital role in anti-bribery strategy success.
                                </p>
                                <p>Preventive Measures
                                </p>
                                <p>Structural and staff optimization of the establishments must be necessarily done, statement of duties of an employee must be elaborated and vividly stated; It should involve principles for both specification-distribution of responsibility and supervisor’s control; for that purpose:
                                </p>
                                <p>Ensure awareness of implementation of anti-bribery programs, giving skills development classes to the employees, taking decisions based on the true information and obtaining culture of execution oriented to work product and developing culture of relationship with the citizens, for that purpose:
                                    <ul>
                                        <li>Mandatory (willful may also take place) workshops and trainings should also be periodically held for the employees;
                                        </li>
                                        <li>Typical thematic planning for raising qualification and training modules should be prepared;
                                        </li>
                                        <li>The principles of information availability, benevolent attitude and assistance, skill in error correction should be inculcated at workplace.
                                        </li>
                                    </ul>
                                </p>
                                <p>The employees must be necessarily stimulated in order to prevent temptation with regard to temptation that implies wage increase of the employees. Above all, the opportunity of a firm career development also plays significant role at the workplace.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </main>




            <Footer/>
        </>
    )
}

export default KycAmlScreen
