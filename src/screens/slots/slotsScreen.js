import React, {useEffect, useMemo, useState} from 'react';
import {sl2, w2} from '../../assets/img/images';
import {filter} from '../../assets/img/icons/icons';
import {Footer, Header, NewSWP, ShowMore, SlotCard, Swp} from "../../components";
import "../../assets/styles/_select2.scss"
import "./slotsScreen.scss"
import {Actions, useTranslation} from "../../core";
import _ from "lodash"
import {CustomDropdown} from "../../components/dropdown/dropDown";
import {useCount} from "../../core/hooks/useCount";
import {
    icon61,
    icon70,
    icon71,
    icon55,
    icon57,
    icon72,
    icon73,
    icon74,
    icon59,
    icon60,
    icon80,
    icon76,
    icon47,
    icon79,
    icon58,
    icon65,
    icon49,
    icon86,
    icon77,
    icon56,
    icon63,
} from "../../assets/img/slot-nav/icon";
import image_1 from "../../assets/img/slide/image_1.png";
import slnav1 from "../../assets/img/slot-nav/caleta.png";

const slIcon = {
    '61':icon61,
    '70':icon70,
    '71':icon71,
    '55':icon55,
    '57':icon57,
    '72':icon72,
    '73':icon73,
    '74':icon74,
    '59':icon59,
    '60':icon60,
    '80':icon80,
    '76':icon76,
    '47':icon47,
    '79':icon79,
    '58':icon58,
    '65':icon65,
    '49':icon49,
    '86':icon86,
    '77':icon77,
    '56':icon56,
    '63':icon63,
}

const SlotsScreen = () =>{
    const {t} = useTranslation()
    const {count} = useCount()
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
    const [slMobNav,setSlMobNav] = useState(false)
    const [selectedProvider,setSelectedProvider]=useState({name:'All Providers'})
    useEffect(()=>{
        loadProvider();
        loadSlotList()
    },[])
    useEffect(()=>{
        if(selectedProvider.length>0 || selectedFilters.length>0){
            //setPage(_.size(filteredSlotList)/20 + 1)
            setPage(1)
        }else{
            setPage(1)
        }
    },[selectedProvider,selectedFilters,searchText])

    useEffect(()=>{

        setSelectedProvider(_.filter(providers,v=>v?.checked))

        console.log(providers)
    },[providers])

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
        return _.filter(filteredSlotList,(v,k)=>k<page*count());
    }


    let slides = <img  src={image_1} alt="1" />;
    return (
        <>
            <Header page={"slots"}/>

            <div className="container slider-container" style={{margin:'10px auto',borderRadius:'6px'}}>
                <NewSWP slide={slides} data={[
                    {id:1, icon:image_1 },
                    {id:2, icon:image_1 },
                    {id:3, icon:image_1 },
                    {id:4, icon:image_1 }
                ]} />
            </div>

            <div></div>

            <main className="main" style={{minHeight:'300px'}}>
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center slot-new-filter">
                            <button className={`${_.size(_.filter(providers,v=>v.checked))===0?'active':''}`} onClick={()=>{
                                setProviders([..._.map(providers,(v,k)=>{
                                    v.checked=false;
                                    return v;
                                })])
                            }}>All</button>
                            <button>Trending</button>
                            <button>Most Liked</button>
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
                        </div>
                        <div className={`col-12 d-flex align-items-center slot-nav ${slMobNav?'dropdown':''}`}>
                            <ul>
                                {
                                    //console.log(providers)
                                    _.map(providers,(p,index)=>{
                                        return  <li key={index} className={`${p.checked?'active':""}`} onClick={()=>{
                                            setProviders([..._.map(providers,(v,k)=>{
                                                v.checked=(k===index);
                                                return v;
                                            })])
                                        }}><img src={slIcon[p.id]}/> {p.name}</li>
                                    })
                                }
                            </ul>
                        </div>

                        <div className={`col-12 d-flex align-items-center slot-nav-mob ${slMobNav?'active':''} `}>
                            <button onClick={()=>{
                                setSlMobNav(!slMobNav)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>
                            </button>
                        </div>

                        {/*<div className={`col-12 d-flex align-items-center slot-nav-mob ${slMobNav?'active':'hide'} `}>
                            <ul>
                                {
                                    _.map(providers,(p,index)=>{
                                        return  <li key={index} className={`${p.checked?'active':""}`} onClick={()=>{
                                            setProviders([..._.map(providers,(v,k)=>{
                                                v.checked=(k===index);
                                                return v;
                                            })])
                                            //setSlMobNav(!slMobNav)
                                        }}><img src={slIcon[p.id]}/> {p.name}</li>
                                    })
                                }
                            </ul>
                            <button onClick={()=>{
                                setSlMobNav(!slMobNav)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>
                            </button>
                        </div>*/}
                    </div>
                    <div className="row">
                        {/*<div className="col-12 d-flex align-items-center main-filter slot">
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

                            <div className="select-label  d-lg-flex me-0  filter-label">
                                <CustomDropdown type={"filter"} label={t("Provider")} data={providers} onSelect={setSelectedProvider} open={providerFilter} setOpen={()=>{
                                    setFiltersFilter(false)
                                    setProviderFilter(!providerFilter)
                                }}/>
                            </div>
                        </div>*/}

                        {/*<div className={"custom-filter-mobile d-lg-none"}>
                            <CustomDropdown label={t("Provider")}  filters={filters} setFilters={setSelectedFilters} showFilter={true} data={providers} onSelect={setSelected} open={showMobileFilter} setOpen={()=>{
                                setShowMobileFilter(!showMobileFilter)
                            }} />
                        </div>*/}
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

                        <div className="col-12">
                            <ShowMore page={page} count={count()} length={filteredSlotList.length} setPage={setPage}/>
                        </div>

                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default SlotsScreen
