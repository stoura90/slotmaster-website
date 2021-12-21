import React, {useEffect, useMemo, useState} from 'react';
import {sl2, w2} from '../../assets/img/images';
import {filter} from '../../assets/img/icons/icons';
import {Footer, Header, ShowMore, SlotCard, Swp} from "../../components";
import "../../assets/styles/_select2.scss"
import {Actions, useTranslation} from "../../core";
import _ from "lodash"
import {CustomDropdown} from "../../components/dropdown/dropDown";

const SlotsScreen = () =>{
    const {t} = useTranslation()
    const [page,setPage]=useState(1)
    const [selected,setSelected] = useState([])
    const [providers,setProviders]=useState([])
    const [filters,setFilters]=useState([])
    const [searchText, setSearchText] = useState("")
    const [list,setList]=useState([])
    const [providerFilter,setProviderFilter]=useState(false);
    const [filtersFilter,setFiltersFilter]=useState(false);
    const [selectedFilters,setSelectedFilters] = useState([])

    const [showMobileFilter,setShowMobileFilter] = useState(false)
    const [selectedProvider,setSelectedProvider]=useState({name:'All Providers'})
    useEffect(()=>{
        loadProvider();
        loadSlotList()
    },[])
    useEffect(()=>{
        if(selectedProvider.length>0 || selectedFilters.length>0){

            setPage(_.size(filteredSlotList)/20 + 1)
        }else{
            setPage(1)
        }
    },[selectedProvider,selectedFilters,searchText])

    const filteredSlotList = useMemo(()=>{
        let filtered =list;
        if(searchText.trim().length>0){
            filtered =  _.filter(filtered,v=>v.name.toLowerCase().indexOf(searchText.toLowerCase())>-1)
        }
        if(_.size(selectedProvider)>0){

            filtered = _.filter(filtered, slot=>{
                return  _.intersection([slot.slotProviderId], _.map(selectedProvider,v=>v.id)).length>0
            })
        }
        if(_.size(selectedFilters)>0){
            filtered = _.filter(filtered, slot=>{
                return  _.intersection(_.map(slot.filterGroups,v=>v.id), _.map(selectedFilters,v=>v.id)).length>0
            })
        }

        return filtered;
    },[list,selectedProvider,selectedFilters,searchText])



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

            <main className="main" style={{minHeight:'300px'}}>
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center main-filter slot">
                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder={t("Search")}
                                    value={searchText}
                                    onChange={e=>setSearchText(e.target.value)}
                                />
                                <span className="btn-search"></span>
                            </div>
                            <div className="select-label d-none d-lg-flex me-0" style={{paddingRight:'10px'}}>
                                <CustomDropdown label={t("Filters")} data={filters} onSelect={setSelectedFilters} open={filtersFilter}  setOpen={()=>{
                                    setFiltersFilter(!filtersFilter)
                                    setProviderFilter(false)
                                }}/>
                            </div>

                            <div className="select-label d-none d-lg-flex me-0">
                                <CustomDropdown label={t("Provider")} data={providers} onSelect={setSelectedProvider} open={providerFilter} setOpen={()=>{
                                    setFiltersFilter(false)
                                    setProviderFilter(!providerFilter)
                                }}/>
                            </div>
                            <div className="filter-button d-lg-none" data-bs-toggle="modal"
                                 data-bs-target="#FilterModal" onClick={()=>setShowMobileFilter(!showMobileFilter)} >
                                <img src={filter} alt="Filter"/>
                            </div>
                        </div>

                        <div className={"custom-filter-mobile d-lg-none"}>
                            <CustomDropdown label={t("Provider")}  filters={filters} setFilters={setSelectedFilters} showFilter={true} data={providers} onSelect={setSelected} open={showMobileFilter} setOpen={()=>{
                                setShowMobileFilter(!showMobileFilter)
                            }} />
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
