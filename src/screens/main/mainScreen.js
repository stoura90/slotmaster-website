import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { ajax, bayern,inter,liver,manCity,manUn,milan,sl2,w1,w2,prg, slotSardCover} from '../../assets/img/images';
import {Carousel, Header, Swp, Footer, Sport} from "../../components";
import {useSLot} from "../../core/hooks/useSLot";
import {Link, useParams} from "react-router-dom";
import {Actions} from "../../core";


const MainScreen = () =>{
    const {lang}=useParams();
    const {play}=useSLot()
    const ref=useRef();
    const [resize,setResize]=useState(window.innerWidth)
    const [mainPageSlotList,setMainPageSlotList]=useState([])
    const [mainPageCasinoList,setMainPageCasinoList]=useState([])

    const getList = (pageId) =>{
        return Actions.Slot.listByPage({webPageId:pageId})
    }

    useEffect(()=>{
        getList(4).then(response=>{
           setMainPageSlotList(response.status? response.data.data:[])
        })
        getList(5).then(response=>{
            setMainPageCasinoList(response.status? response.data.data:[])
        })
        window.addEventListener("resize",()=>{
            setResize(window.innerWidth)
        })
        return ()=>{
            window.removeEventListener("resize",()=>{
                setResize(window.innerWidth)
            })
        }
    },[])
    return (
        <>
            <Header page={"main"}/>

            <div className=" slider">
                <Swp count={3}  data={[
                    {id:1, icon:prg },
                    {id:2, icon:w2 },
                    {id:3, icon:sl2 },
                    {id:4, icon:sl2 },
                    {id:5, icon:sl2 },
                    {id:6, icon:sl2 },
                    {id:7, icon:sl2 }
                ]}/>
            </div>

            <main className="widget_cont">
                <div className="container" ref={ref}>
                    <div className="row for_widget">
                        <div className="col-12">
                            <Sport.TopMatchesWidget lang={lang}/>
                           {/* <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
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
                            </div>*/}
                        </div>
                       {/* <div className="col-12 col-md-6">
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
                        </div>*/}
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                            <div className="section-heading">slots</div>
                            <Link to={`/${lang}/slots`}>View all</Link>
                        </div>
                        <div className="col-12 main-slots-area" data-count={Math.round(resize/300)}>
                            <Carousel
                                id={"font-slot"}
                                counter={Math.round(resize/300)}
                                data={mainPageSlotList}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                            <div className="section-heading">casino</div>
                            <Link to={`/${lang}/casino`}>View all</Link>
                        </div>
                        <div className="col-12 main-casino-area" data-count={Math.round(resize/300)}>
                            <Carousel
                                id={"font-games"}
                                counter={Math.round(resize/300)}
                                data={mainPageCasinoList}/>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default MainScreen
