import React, {useEffect} from 'react';
import './style.scss';


const Information = () => {
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
                    <ul
                        className="mb-sub-tabs nav nav-tabs d-md-none"
                        id="myTab"
                        role="tablist"
                    >
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
                                        <div className="input-label-border active">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value="test@test.com"
                                                className="for-confirm"
                                            />
                                            <label htmlFor="email">Email</label>
                                            <span className="confirmed">Confirmed</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input type="text" name="name" id="name"/>
                                            <label htmlFor="name">Name</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input type="text" name="surname" id="surname"/>
                                            <label htmlFor="surname">Surname</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                placeholder="DD.MM.YYYY"
                                            />
                                            <label htmlFor="birthday">Date of birth</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="select-label-border">
                                            <select
                                                className="select2"
                                                placeholder="Country"
                                                id="account"
                                            >
                                                <option value=""></option>
                                                <option value="1">
                                                    British Virgin Islands
                                                </option>
                                                <option value="2">Brunei</option>
                                                <option value="3">Bulgaria</option>
                                                <option value="4">Burkina Faso</option>
                                                <option value="5">Burundi</option>
                                            </select>
                                            <label htmlFor="select">Country</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="select-label-border">
                                            <select
                                                className="select2"
                                                placeholder="Currency"
                                                id="account"
                                            >
                                                <option value=""></option>
                                                <option value="1">USD</option>
                                                <option value="2">EUR</option>
                                                <option value="3">GEL</option>
                                                <option value="4">RUB</option>
                                            </select>
                                            <label htmlFor="select">Currency</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-label-border">
                                            <input type="text" name="city" id="city"/>
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
                                            <select
                                                className="select2"
                                                placeholder="Secret question"
                                                id="account"
                                            >
                                                <option value=""></option>
                                                <option value="1">
                                                    What is your mother's maiden name?
                                                </option>
                                                <option value="2">
                                                    What was your first pet?
                                                </option>
                                                <option value="3">
                                                    What was the model of your first car?
                                                </option>
                                                <option value="4">
                                                    In what city were you born?
                                                </option>
                                            </select>
                                            <label htmlFor="select">Secret question</label>
                                        </div>
                                    </div>
                                    <div className="col-12 order-3 order-md-2">
                                        <div className="input-label-border">
                                            <input
                                                type="text"
                                                name="secret-answer"
                                                id="secretAnswer"
                                            />
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