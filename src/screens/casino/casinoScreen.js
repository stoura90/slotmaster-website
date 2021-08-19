import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    kings,
    narcos,
    pirate,
    sl2,
    slotSardCover,
    tonys,
} from '../../assets/img/images';
import { Footer, Header, SlotCard, Swp} from "../../components";
import {CustomDropdown} from "../../components/dropdown/dropDown";


const CasinoScreen = () =>{
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
                        <div className="col-12 d-flex align-items-center flex-row main-filter">

                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder="Search"
                                />
                                <span className="btn-search"></span>
                            </div>
                            <CustomDropdown style={{height:"174px"}}label={"Categories"} data={[
                                { id:1, name:"Live Blackjacks",checked:false},
                                { id:2, name:"Live Roulette",checked:false},
                                { id:3, name:"Live Baccarat",checked:false}
                            ]}/>
                            <div style={{marginLeft:'10px'}}>

                            </div>
                            <CustomDropdown label={"Provider"} data={[
                                { id:1, name:"Evolution Gaming",checked:false},
                                { id:2, name:"Pragmatic Play LC",checked:false},
                                { id:3, name:"Pragmatic Play LC",checked:false},
                                { id:4, name:"Evoplay Entertai...",checked:false},
                                { id:5, name:"BetGames TV",checked:false},
                                { id:6, name:"Authentic",checked:false},
                                { id:7, name:"Playtech",checked:false},
                            ]}/>
                            <div
                                className="filter-button d-lg-none"
                                data-bs-toggle="modal"
                                data-bs-target="#FilterModal"
                            >
                                <img src="img/icons/filter.svg" alt="Filter"/>
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

export default CasinoScreen
