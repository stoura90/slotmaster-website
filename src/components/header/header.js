import React, {useEffect} from 'react';
import {logoM, sl2} from "../../assets/img/images";
import {useUser} from "../../core/hooks/useUser";
import {
    account,
    logo2,
    user_ico
} from '../../assets/img/icons/icons';
import {Link, useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import {useTranslation} from "../../core";
import ChangeLagunge from "../languages/ChangeLagunge";
import {UseEvent} from "../../core/hooks/useEvent";
const Header = ({page}) =>{
    const {t} = useTranslation();
    const ev = UseEvent();
    const {User} = useUser();
    const {lang} = useParams();
    useEffect(()=>{
        console.log(User)
    },[page])
    return (
        <header>
            <nav className="navbar navbar-expand-md flex-column">
                <div className="navbar-head">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <Link className="navbar-brand d-none d-lg-flex" to="/">
                                <img src={logo2} alt=""/>
                            </Link>
                            <Link className="navbar-brand w-auto h-auto d-lg-none" to="/">
                                <img src={logoM} alt=""/>
                            </Link>
                            <div
                                className="authorization-interface d-flex align-items-center"
                            >
                                {
                                    User.isLogged? <>
                                            {/*<div className="user-information">
                                                <div data-user>{User.data.username}</div>
                                                <div data-pin>id: {User.data.id}</div>
                                            </div>*/}
                                            <div className="navbar-balance d-flex flex-column">
                                                <span className="currency">{User.data.accounts.main.currency.iso3}</span>
                                                <span className="current-balance">{(User.data.accounts.main.amount/100).toFixed(2)}</span>
                                            </div>


                                            <Link  to={`/${lang}/account/finances?to=withdraw`} className="withdraw-link">{t("withdraw")}</Link>
                                            <Link  to={`/${lang}/account/finances?to=deposit`} className="deposit-link">{t("deposit")}</Link>
                                            <Link  to={`/${lang}/account`} className="account-link"><img src={user_ico} alt=""/></Link>
                                        {/*<button
                                            className="navbar-toggler"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#navbarSupportedContent"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false"
                                            aria-label="Toggle navigation"
                                        >
                                            <span className="navbar-toggler-icon"/>
                                        </button>*/}

                                        {/*<div className="btn-primary text-capitalize">
                                            {User.data.firstName}

                                        </div>
                                            &nbsp;&nbsp;
                                            <button
                                                className="btn-text text-capitalize"
                                                onClick={()=>signOut()}
                                            >
                                                SignOut
                                            </button>*/}

                                    </>:
                                    <>
                                        <button
                                            className="btn-text text-capitalize"
                                            id={"signIn-btn"}
                                            onClick={()=>ev.emit('signIn',true)}
                                        >
                                            {t('Log In')}
                                        </button>
                                        <button
                                            className="btn-primary text-capitalize"
                                            onClick={()=>ev.emit('signUp',true)}
                                            id={"signUp-btn"}
                                        >
                                            {t("Sing Up")}
                                        </button>
                                    </>
                                }
                                <ChangeLagunge style={User.isLogged? {}:{marginLeft:'20px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <div className="container">
                        <ul className="navbar-nav">
                            <li className="nav-item d-none d-md-flex">
                                <Link to={`/${lang}/main`} className={`nav-link  home ${page==='main'? 'active':''}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            id="Interface-Essential_Home_house-entrance"
                                            data-name="Interface-Essential / Home / house-entrance"
                                            transform="translate(-275 -117)"
                                        >
                                            <g id="Group_13">
                                                <g id="house-entrance">
                                                    <path
                                                        id="Shape_15"
                                                        d="M299,126.5a1,1,0,0,0-.389-.791l-11-8.5a1,1,0,0,0-1.224,0l-11,8.5a1,1,0,0,0-.387.791V140a1,1,0,0,0,1,1h8a.5.5,0,0,0,.5-.5V136a2.5,2.5,0,0,1,5,0v4.5a.5.5,0,0,0,.5.5h8a1,1,0,0,0,1-1Z"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/${lang}/sport`} className={`nav-link ${page==='sport'? 'active':''}`}>{t("Sport")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link  className={`nav-link ${page==='live'? 'active':''}`} to={`/${lang}/live`}>{t("Live")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/${lang}/virtuals`}  className={`nav-link ${page==='virtuals'? 'active':''}`} >{t("Virtuals")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/${lang}/casino`}  className={`nav-link ${page==='casino'? 'active':''}`}>{t("Casino")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/${lang}/slots`}  className={`nav-link ${page==='slots'? 'active':''}`}>{t("Slot")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link  to={`/${lang}/promo`}  className={`nav-link ${page==='promo'? 'active':''}`}>{t("Promo")}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/*<div className="header.bkp-slider">
                    <HeaderCarousel count={3}  data={[
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 }
                    ]} />
                </div>*/}
        </header>
    )
}
Header.propTypes={
    page:PropTypes.string
}
Header.defaultProps={
    page:'main'
}
export default Header;
