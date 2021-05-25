import React, {useEffect} from 'react';
import {logoM, sl2} from "../../assets/img/images";
import {Swp} from "../index";
import {useUser} from "../../core/hooks/useUser";
import {
    restriction18,
    account,
    arrowLeft,
    arrowLeftBack,
    borderDashed,
    checked,
    checkedMb,
    clockModal,
    close,
    discord,
    fileUpload,
    filter,
    hArrows,
    home,
    logo,
    logout,
    multiArrow,
    netnet,
    percent,
    percentModal,
    play,
    plus,
    reload,
    remove,
    search,
    searchLight,
    selectArrow,
    skrillSmall,
    sliderArrowNext,
    sliderArrowPrev,
    time,
    viewOff,
    viewOn,
} from '../../assets/img/icons/icons';

const Header = () =>{
    const {User,signOut} = useUser();
    useEffect(()=>{
        console.log(User)
    },[])
    return (
        <header>
            <nav className="navbar navbar-expand-md flex-column">
                <div className="navbar-head">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <a className="navbar-brand d-none d-lg-flex" href="/">
                                <img src={logo} alt=""/>
                            </a>
                            <a className="navbar-brand w-auto h-auto d-lg-none" href="/">
                                <img src={logoM} alt=""/>
                            </a>
                            <div
                                className="authorization-interface d-flex align-items-center"
                            >
                                {
                                    User.isLogged? <>
                                            <div className="navbar-balance d-flex flex-column">
                                                <span className="currency">USD</span>
                                                <span className="current-balance">911.11</span>
                                            </div>
                                            <a href="./account.html" className="account-link">
                                                <img src={account} alt=""/>
                                            </a>
                                            <a href="./deposit" className="deposit-link">deposit</a>
                                        <button
                                            class="navbar-toggler"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#navbarSupportedContent"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false"
                                            aria-label="Toggle navigation"
                                        >
                                            <span class="navbar-toggler-icon"></span>
                                        </button>

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
                                            data-bs-toggle="modal"
                                            data-bs-target="#LoginModal"
                                            id={"signIn-btn"}
                                        >
                                            log in
                                        </button>
                                        <button
                                            className="btn-primary text-capitalize"
                                            data-bs-toggle="modal"
                                            data-bs-target="#SignupModal"
                                            id={"signUp-btn"}
                                        >
                                            Sing up
                                        </button>
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <div className="container">
                        <ul className="navbar-nav">
                            <li className="nav-item d-none d-md-flex">
                                <a className="nav-link active home" href="./main">
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
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sport</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Live</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Virtuals</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./casino">Casino</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./slots">Slot</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./promo">Promo</a>
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
export default Header;