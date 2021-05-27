import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import { ajax, bayern, betsoft, bitcoin, evolutionGaming,inter, kings,liver,logoM,manCity,manUn,milan, narcos, neteller, netent,pirate,slider1,sl2, slotSardCover,sun,tonys, webmoney} from '../../assets/img/images';
import {discord, logo, play} from "../../assets/img/icons/icons";
import {Carousel, FooterCarousel, Header, HeaderCarousel, Swp, Footer} from "../../components";
import {useSLot} from "../../core/hooks/useSLot";


const MainScreen = () =>{
    const nav  = useNavigation();
    const {play}=useSLot()
    const ref=useRef();
    const [containerWidth,setContainerWidth]=useState(window.innerWidth)
    useEffect(()=>{
        if(ref){
            setContainerWidth(ref.current.clientWidth)
        }

    },[nav]);
    return (
        <>
            <Header/>

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

            <main>
                <div className="container" ref={ref}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div
                                    className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                                    <div className="section-heading">Sport</div>
                                    <a href="#">View all</a>
                                </div>
                                <div className="col-12">
                                    <div className="row scroll">
                                        <div className="sport-col col-md-6">
                                            <div
                                                className="d-flex flex-column justify-content-between sport-card"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={milan} alt="A.C. Milan"/>
                                                        <span className="team-name">A.C. Milan</span>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={inter} alt="Inter Milan"/>
                                                        <span className="team-name">Inter Milan</span>
                                                    </div>
                                                </div>
                                                <div className="d-block w-100 text-center match-date">
                                                    Jan 28, 12:00 AM
                                                </div>
                                                <div className="match-bets d-flex justify-content-between">
                                                    <div>1.23</div>
                                                    <div>4.09</div>
                                                    <div>1.21</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sport-col col-md-6">
                                            <div
                                                className="d-flex flex-column justify-content-between sport-card"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={manCity} alt="Manchester City"/>
                                                        <span className="team-name">Manchester City</span>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={liver} alt="Liverpool FC"/>
                                                        <span className="team-name">Liverpool FC</span>
                                                    </div>
                                                </div>
                                                <div className="d-block w-100 text-center match-date">
                                                    Jan 29, 12:00 AM
                                                </div>
                                                <div className="match-bets d-flex justify-content-between">
                                                    <div>3.58</div>
                                                    <div>3.92</div>
                                                    <div>2.02</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div
                                    className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                                    <div className="section-heading">live</div>
                                    <a href="#">View all</a>
                                </div>
                                <div className="col-12">
                                    <div className="row scroll">
                                        <div className="sport-col col-md-6">
                                            <div
                                                className="d-flex flex-column justify-content-between sport-card live"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={bayern} alt="FC Bayern Mu"/>
                                                        <span className="team-name">FC Bayern Munchen</span>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={ajax} alt="ajax amsterdam"/>
                                                        <span className="team-name">ajax amsterdam</span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between match-live-details"
                                                >
                                                    <span className="score">1</span>
                                                    <span className="match-time">54</span>
                                                    <span className="score">0</span>
                                                </div>
                                                <div className="match-bets d-flex justify-content-between">
                                                    <div>1.03</div>
                                                    <div>2.03</div>
                                                    <div>2.23</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sport-col col-md-6">
                                            <div
                                                className="d-flex flex-column justify-content-between sport-card live"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={manCity} alt="Manchester City"/>
                                                        <span className="team-name">Manchester City</span>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={manUn} alt="Manchester United"/>
                                                        <span className="team-name">Manchester United</span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between match-live-details"
                                                >
                                                    <span className="score">2</span>
                                                    <span className="match-time">90+</span>
                                                    <span className="score">2</span>
                                                </div>
                                                <div className="match-bets d-flex justify-content-between">
                                                    <div>1.23</div>
                                                    <div>3.33</div>
                                                    <div>2.11</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                            <div className="section-heading">slots</div>
                            <a href="#">View all</a>
                        </div>
                        <div className="col-12">
                            <Carousel
                                id={"font-slot"}
                                count={Math.round(containerWidth/300)}
                                onClick={(e)=>play(e)}
                                data={[
                                    {id:"c7b1d1e6171965bbe4e6394d2bdf1600aeb45994",icon:"https://staging.slotegrator.com/api/index.php/image/get?hash=c7b1d1e6171965bbe4e6394d2bdf1600aeb45994.png"},
                                    {id:"3b678c88129d8adafea920128d761f7a81fd2294",icon:"https://staging.slotegrator.com/api/index.php/image/get?hash=3b678c88129d8adafea920128d761f7a81fd2294.png"},
                                ]}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                            <div className="section-heading">casino</div>
                            <a href="#">View all</a>
                        </div>
                        <div className="col-12">
                            <Carousel
                                id={"font-games"}
                                onClick={e=>console.log(e)} count={6} data={[{id:1,icon:slotSardCover},{id:1,icon:slotSardCover},{id:1,icon:slotSardCover},{id:1,icon:slotSardCover},{id:1,icon:slotSardCover},{id:1,icon:slotSardCover},{id:1,icon:slotSardCover},{id:1,icon:slotSardCover}]}/>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default MainScreen
