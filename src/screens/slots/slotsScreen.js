import React, {useEffect, useMemo, useState} from 'react';
import {sl2, w2} from '../../assets/img/images';
import {filter} from '../../assets/img/icons/icons';
import {Footer, Header, ShowMore, SlotCard, Swp} from "../../components";
import "../../assets/styles/_select2.scss"
import {Actions} from "../../core";
import _ from "lodash"
import {CustomDropdown} from "../../components/dropdown/dropDown";

const SlotsScreen = () =>{
    const [page,setPage]=useState(1)
    const [selected,setSelected] = useState([])
    const [providers,setProviders]=useState([])
    const [filters,setFilters]=useState([])
    const [searchText, setSearchText] = useState("")
    const [list,setList]=useState([])
    const [showMobileFilter,setShowMobileFilter] = useState(false)
    const [selectedProvider,setSelectedProvider]=useState({name:'All Providers'})
    useEffect(()=>{
        loadProvider();
        loadSlotList()
    },[])
    useEffect(()=>{
        if(selected.length>0){
            setPage(_.size(filteredSlotList)/20 + 1)
        }else{
            setPage(1)
        }
    },[selected,searchText])

    const filteredSlotList = useMemo(()=>{

        if(searchText.trim().length>0){
            return _.filter(list,v=>v.name.toLowerCase().indexOf(searchText.toLowerCase())>-1)
        }
        if(_.size(selected)>0){
            return _.filter(list, slot=>{
                return  _.intersection([slot.slotProviderId], _.map(selected,v=>v.id)).length>0
            })
        }

        return list;
    },[list,selected,searchText])


    const homeClick = () => {
        setSelectedProvider({name:'All Providers'});
        loadProvider();
    }
    const loadProvider = () => {
        Actions.Slot.list({webPageId:1}).then(response=> {
            //if(response.status){
            //    setSelectedProvider(response.data.data.providers[0]);
            //}
            setProviders(response.status?response.data.data.providers:[]);
            setFilters(response.status?response.data.data.filterGroups:[]);
        }).catch(reason => console.log(reason))
    }

    const loadSlotList =()=>{
        Actions.Slot.listByPage(1).then((response)=>{
            setList(response.status?response.data.data:[])
        })
    }
    // const loadSlots = (id) => {
    //     Actions.Slot.listByProvider(id,"1").then(response=>setList(response.status?response.data.data:[]))
    // }
    const getFilteredSlots = (id) => {
        setSelectedProvider({...selectedProvider,name: null});
        setPage(1)
        Actions.Slot.listByFilter(id,"1").then(response=>setList(response.status?response.data.data:[]))
    }

    const getSlotList=()=> {
        return _.filter(filteredSlotList,(v,k)=>k<page*20);
    }

    return (
        <>
            <Header page={"slots"}/>

            <div className="slider">
                <Swp count={3}  data={[
                    {id:2, icon:w2 },
                    {id:2, icon:sl2 },
                    {id:3, icon:sl2 },
                    {id:4, icon:sl2 },
                    {id:5, icon:sl2 },
                    {id:6, icon:sl2 },
                    {id:7, icon:sl2 }
                ]}/>
            </div>

            <main className="main">
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center main-filter slot">
                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder="Search"
                                    value={searchText}
                                    onChange={e=>setSearchText(e.target.value)}
                                />
                                <span className="btn-search"></span>
                            </div>
                            <div className="select-label d-none d-lg-flex me-0">
                                <CustomDropdown label={"Provider"} data={providers} onSelect={setSelected} isOpen={false}/>
                            </div>
                            <div className="filter-button d-lg-none" data-bs-toggle="modal"
                                 data-bs-target="#FilterModal" onClick={()=>setShowMobileFilter(!showMobileFilter)} >
                                <img src={filter} alt="Filter"/>
                            </div>
                        </div>

                        <div className={"custom-filter-mobile d-lg-none"}>
                            <CustomDropdown label={"Provider"} ope data={providers} onSelect={setSelected} isOpen={showMobileFilter} />
                        </div>
                        {/*<div className="col-12 section-head">
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
                        </div>*/}
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
                                <ShowMore page={page} count={20} length={filteredSlotList.length} setPage={setPage}/>
                            </div>
                        }
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default SlotsScreen
