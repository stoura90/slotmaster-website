import React, {useEffect, useState} from 'react';
import './style.scss';


const Information = () => {
    const [infoData, setInfoData] = useState({
        name:'',
        email:'',
        phone:'',
        surname:'',
        dob:'',
        currency: {id:0, value:'empty'},
        city:'',
        answer:'',
        country: {id:0, value:'empty'},
        question: {id:0, value:'empty'}
    });

    return (
        <div className="tab-content" id="accountTabContent">
            <div
                className="tab-pane fade show active"
                id="personal"
                role="tabpanel"
                aria-labelledby="personal-tab"
            >
                <div className="account-tab-inner">
                    <div className="tab-headline">Personal Data</div>
                    <ul className="mb-sub-tabs nav nav-tabs d-md-none" id="myTab" role="tablist">
                        <li role="presentation">
                            <button
                                className="item active"
                                id="information-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#information"
                                type="button"
                                role="tab"
                                aria-controls="information"
                                aria-selected="true"
                            >
                                Information
                            </button>
                        </li>
                        <li role="presentation">
                            <button
                                className="item"
                                id="security-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#security"
                                type="button"
                                role="tab"
                                aria-controls="security"
                                aria-selected="false"
                            >
                                Security
                            </button>
                        </li>
                    </ul>


                    <form action="#" className="personal-data">
                        <div className="tab-content row">
                            <div
                                className="col-12 col-md-8 tab-pane show active"
                                id="information"
                                role="tabpanel"
                                aria-labelledby="information-tab"
                            >
                                <div className="row personal-row">
                                    <div className="col-12 d-none d-md-flex">
                                        <div className="form-title">Information</div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input
                                                type="number"
                                                name="phone"
                                                id="phone"
                                                className="for-confirm"
                                                value={infoData.phone}
                                                onChange={e => setInfoData({...infoData,phone:e.target.value})}
                                            />
                                            <label htmlFor="phone">Phone</label>
                                            <button
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirmPhone"
                                                className="btn-confirm"
                                            >
                                                Confirm
                                            </button>
                                        </div>

                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border ">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="for-confirm"
                                                value={infoData.email}
                                                onChange={e => setInfoData({...infoData,email:e.target.value})}
                                            />
                                            <label htmlFor="email">Email</label>
                                            <span className="confirmed">Confirmed</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input onChange={e => setInfoData({...infoData,name:e.target.value})} value={infoData.name} type="text" name="name" id="name"/>
                                            <label htmlFor="name">Name</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input onChange={e => setInfoData({...infoData,surname:e.target.value})} value={infoData.surname} type="text" name="surname" id="surname"/>
                                            <label htmlFor="surname">Surname</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input onChange={e => setInfoData({...infoData,dob:e.target.value})} value={infoData.dob} type="text" name="birthday" id="birthday" placeholder="DD.MM.YYYY"/>
                                            <label htmlFor="birthday">Date of birth</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="select-label-border">
                                            <select onChange={e => {
                                                setInfoData({...infoData,country:JSON.parse(e.target.value)})
                                            }} selValue={infoData.country.value} className="select2" placeholder="Country" id="account">
                                                <option value={JSON.stringify({id:0, value:'empty'})}/>
                                                <option value={JSON.stringify({id:1, value:'British Virgin Islands'})}>British Virgin Islands</option>
                                                <option value={JSON.stringify({id:2, value:'Brunei'})}>Brunei</option>
                                                <option value={JSON.stringify({id:3, value:'Bulgaria'})}>Bulgaria</option>
                                                <option value={JSON.stringify({id:4, value:'Burkina Faso'})}>Burkina Faso</option>
                                                <option value={JSON.stringify({id:5, value:'Burundi'})}>Burundi</option>
                                            </select>
                                            <label htmlFor="select">Country</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="select-label-border">
                                            <select onChange={e => {
                                                setInfoData({...infoData,currency:JSON.parse(e.target.value)})
                                            }} selValue={infoData.currency.value} className="select2" placeholder="Currency" id="account">
                                                <option value={JSON.stringify({id:0, value:'empty'})}/>
                                                <option value={JSON.stringify({id:1, value:'USD'})}>USD</option>
                                                <option value={JSON.stringify({id:2, value:'EUR'})}>EUR</option>
                                                <option value={JSON.stringify({id:3, value:'GEL'})}>GEL</option>
                                                <option value={JSON.stringify({id:4, value:'RUB'})}>RUB</option>
                                            </select>
                                            <label htmlFor="select">Currency</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input onChange={e => setInfoData({...infoData,city:e.target.value})} value={infoData.city} type="text" name="city" id="city"/>
                                            <label htmlFor="city">City</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-12 col-md-4 tab-pane"
                                id="security"
                                role="tabpanel"
                                aria-labelledby="security-tab"
                            >
                                <div className="row personal-row">
                                    <div className="col-12 d-none d-md-flex">
                                        <div className="form-title">Security</div>
                                    </div>
                                    <div className="col-12 order-2 order-md-1">
                                        <div className="select-label-border">
                                            <select onChange={e => {
                                                setInfoData({...infoData,question:JSON.parse(e.target.value)})
                                            }} selValue={infoData.question.value} className="select2" placeholder="Secret question" id="account">
                                                <option value={JSON.stringify({id:0, value:'empty'})}/>
                                                <option value={JSON.stringify({id:1, value:'What is your mother\'s maiden name?'})}>What is your mother's maiden name?</option>
                                                <option value={JSON.stringify({id:2, value:'What was your first pet?'})}>What was your first pet?</option>
                                                <option value={JSON.stringify({id:3, value:'What was the model of your first car?'})}>What was the model of your first car?</option>
                                                <option value={JSON.stringify({id:4, value:'In what city were you born?'})}>In what city were you born?</option>
                                            </select>
                                            <label htmlFor="select">Secret question</label>
                                        </div>
                                    </div>
                                    <div className="col-12 order-3 order-md-2">
                                        <div className="input-label-border">
                                            <input onChange={e => setInfoData({...infoData,answer:e.target.value})} value={infoData.answer} type="text" name="secret-answer" id="secretAnswer"/>
                                            <label htmlFor="secretAnswer">Secret answer</label>
                                        </div>
                                    </div>
                                    <div className="col-12 order-1 order-md-3">
                                        <button
                                            className="btn-change-password"
                                            data-bs-toggle="modal"
                                            data-bs-target="#passwordModal"
                                            type="button"
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn-primary">Save</button>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default Information;