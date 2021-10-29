import React, {useEffect, useState} from 'react';
import { sl2} from '../../assets/img/images';
import {Footer, Header, ShowMore, SlotCard, Swp} from "../../components";
import "../../assets/styles/_select2.scss"
import {Actions} from "../../core";
import _ from "lodash"
import {useParams} from "react-router-dom";

const CasinoScreen = () =>{
    const [show,setShow]=useState(20);
    const [page,setPage]=useState(1)
    const [providers,setProviders]=useState([])
    const [filters,setFilters]=useState([])
    const [list,setList]=useState([])
    const [selectedProvider,setSelectedProvider]=useState(null)
    useEffect(()=>{
        loadProvider();

    },[])
    useEffect(()=>{
        if(selectedProvider){
            loadSlots(selectedProvider.id)
        }
    },[selectedProvider])
    const homeClick = () => {
        setSelectedProvider(null);
        loadProvider();
    }
    const loadProvider = () => {
        Actions.Slot.list({webPageId:2}).then(response=> {
            console.log("slot response ", response)

            if(response.status){
                setSelectedProvider(response.data.data.providers[0]);
            }
            setProviders(response.status?response.data.data.providers:[]);
            setFilters(response.status?response.data.data.filterGroups:[]);
        }).catch(reason => console.log(reason))
    }
    const loadSlots = (id) => {
        Actions.Slot.listByProvider(id,"2").then(response=>setList(response.status?response.data.data:[]))
    }
    const getFilteredSlots = (id) => {
        setSelectedProvider({...selectedProvider,name: null});
        setPage(1)
        Actions.Slot.listByFilter(id,"2").then(response=>setList(response.status?response.data.data:[]))
    }

    const getSlotList=()=> {
        return _.filter(list,(v,k)=>k<=page*20);
    }

    return (
        <>
            <Header page={"casino"}/>

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
                        {/*<div className="col-12 d-flex align-items-center main-filter slot">
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
                        </div>*/}
                        <div className="col-12 section-head">
                            <div className="sl_nav">
                                <div className="sl_item sl_home" onClick={()=> homeClick()}/>
                                {
                                    _.map(providers,provider=><div className="sl_item" key={provider.id} onClick={()=>{
                                        setSelectedProvider(provider);
                                        setPage(1)
                                    }}>{provider.name}</div>)
                                }
                            </div>
                            <div className="sl_filter">
                                <ul>
                                    {
                                        _.map(filters,filter => <li key={filter.id} onClick={()=>getFilteredSlots(filter.id)}>{filter.name}  <i>{filter?.options?.itemsCount}</i></li>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 d-flex align-items-center section-head">

                        </div>
                        {
                            selectedProvider?.name &&
                            <div className="col-12 d-flex align-items-center section-head">
                                <a href="#">
                                    <div className="section-heading">{selectedProvider?.name}</div>
                                </a>
                            </div>
                        }
                        <div className="col-12">
                            <div className="row casino-list">
                                <SlotCard  data={getSlotList()} />
                            </div>
                        </div>
                        {
                            <div className="col-12">
                                <ShowMore page={page} count={20} length={list.length} setPage={setPage}/>
                            </div>
                        }
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default CasinoScreen
