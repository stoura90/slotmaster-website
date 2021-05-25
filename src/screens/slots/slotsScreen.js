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
import {Carousel, Footer, FooterCarousel, Header, HeaderCarousel, SlotCard, Swp} from "../../components";
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

        </>
    )
}

export default SlotsScreen