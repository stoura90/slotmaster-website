import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    ajax,
    bayern,
    betsoft,
    bitcoin,
    evolutionGaming,
    inter,
    kings,
    liver,
    logoM,
    manCity,
    manUn,
    milan,
    narcos,
    neteller,
    netent,
    pirate,
    sl2,
    slider1,
    slotSardCover,
    sun,
    tonys,
    webmoney
} from '../../assets/img/images';
import {discord, logo, play} from "../../assets/img/icons/icons";
import {Carousel, FooterCarousel, HeaderCarousel, SlotCard, Swp, Footer} from "../../components";
import _ from "lodash";
import {filter} from "../../assets/img/icons/icons"
import "../../assets/styles/_select2.scss"
import {CustomDropdown} from "../../components/dropdown/dropDown";
const SlotsScreen = () =>{
    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav)

    },[nav]);
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md flex-column">
                    <div className="navbar-head">
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <a className="navbar-brand d-none d-lg-flex" href="./index.html">
                                    <img src={logo} alt=""/>
                                </a>
                                <a className="navbar-brand w-auto h-auto d-lg-none" href="./index.html">
                                    <img src={logoM} alt=""/>
                                </a>
                                <div
                                    className="authorization-interface d-flex align-items-center"
                                >
                                    <button
                                        className="btn-text text-capitalize"
                                        data-bs-toggle="modal"
                                        data-bs-target="#LoginModal"
                                    >
                                        log in
                                    </button>
                                    <button
                                        className="btn-primary text-capitalize"
                                        data-bs-toggle="modal"
                                        data-bs-target="#SignupModal"
                                    >
                                        Sing up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                        <div className="container">
                            <ul className="navbar-nav">
                                <li className="nav-item d-none d-md-flex">
                                    <a className="nav-link home" href="./main">
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
                                    <a className="nav-link active" href="./slots">Slot</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="./promo">Promo</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container slider">
                    <Swp count={3}  data={[
                        {id:1, icon:sl2 },
                        {id:2, icon:sl2 },
                        {id:3, icon:sl2 },
                        {id:4, icon:sl2 },
                        {id:5, icon:sl2 },
                        {id:6, icon:sl2 },
                        {id:7, icon:sl2 }
                    ]}/>
                </div>
            </header>
            <main>
                <div className="container">

                    <div className="row">
                        <div className="col-12 d-flex align-items-center main-filter slot">
                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder="Search"
                                />
                                <span className="btn-search"></span>
                            </div>
                            <div className="select-label d-none d-lg-flex me-0">
                                <CustomDropdown label={"Provider"} data={[
                                    { id:1, name:"Evolution Gaming",checked:false},
                                    { id:2, name:"Pragmatic Play LC",checked:false},
                                    { id:3, name:"Pragmatic Play LC",checked:false},
                                    { id:4, name:"Evoplay Entertai...",checked:false},
                                    { id:5, name:"BetGames TV",checked:false},
                                    { id:6, name:"Authentic",checked:false},
                                    { id:7, name:"Playtech",checked:false},
                                ]}/>
                            </div>
                            <div className="filter-button d-lg-none" data-bs-toggle="modal"
                                 data-bs-target="#FilterModal">
                                <img src={filter} alt="Filter"/>
                            </div>
                        </div>
                        <div className="col-12 d-flex align-items-center section-head">
                            <a href="#">
                                <div className="section-heading">all Provider</div>
                            </a>
                        </div>

                        <div className="col-12">
                            <div className="row casino-list">

                                <SlotCard count={20} data={[
                                    {id:1,icon:slotSardCover},
                                    {id:1,icon:pirate},
                                    {id:1,icon:tonys},
                                    {id:1,icon:narcos},
                                    {id:1,icon:kings},
                                    {id:1,icon:slotSardCover},
                                    {id:1,icon:slotSardCover},
                                    {id:1,icon:pirate},
                                    {id:1,icon:tonys},
                                    {id:1,icon:narcos},
                                    {id:1,icon:kings},
                                    {id:1,icon:slotSardCover}
                                    ]} />


                            </div>
                        </div>


                        <div className="col-12">
                            <div className="show-more">
                                <div className="show-info">You’ve viewed 40 of 911 games</div>
                                <div className="show-more-btn">show more</div>
                            </div>
                        </div>

                    </div>


                </div>
            </main>

            <Footer/>

            <div
                className="modal fade"
                id="LoginModal"
                tabIndex="-1"
                aria-labelledby="LoginModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered auth-modal">
                    <div className="modal-content">
                        <div className="modal-head">
                            <button className="close" data-bs-dismiss="modal">
                                <img src="img/icons/close.svg" alt="Close modal"/>
                            </button>
                            <div className="modal-title">Log In</div>
                        </div>
                        <form action="" className="form">
                            <div className="input-label">
                                <input type="email" name="email" id="email"/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-label">
                                <input type="password" name="password" id="password"/>
                                <label htmlFor="password">Password</label>
                                <div className="toggle-password hide"></div>
                            </div>
                            <button type="submit" className="btn-primary">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SlotsScreen