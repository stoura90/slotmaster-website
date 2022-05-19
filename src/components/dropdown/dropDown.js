import React, {useEffect, useRef, useState} from "react";
import "./dropdown.scss"
import {close, multiArrow} from "../../assets/img/icons/icons"
import _ from 'lodash'
import PropTypes from "prop-types";
import {useTranslation} from "../../core";
import {useNav} from "../../core/hooks/useNav";
import {value} from "lodash/seq";

import {useOutsideRefSLF} from "../../core/hooks/useOutSideClickSlotFilterRef";


export const CustomDropdown=({data,label,style ,onSelect,open,setOpen,onClick,showFilter,filters,setFilters,type="custom"})=>{

    const nav = useNav();
    const [providers,setProviders]=useState([])
    const [filter,setFilter]=useState([])
    const {t} = useTranslation()
    const ref5 = useRef(null);
    //const ref2 = useRef(null);
    //const ref3 = useRef(null);
    useEffect(()=>{
        if(setFilter && open){
            document.body.style.overflowY="hidden"
        }else{
            document.body.style.overflowY="auto"
        }
    },[showFilter,setOpen])
    useEffect(()=>{

        if(type==='filter' && nav.get("id")){
            data = _.map(data, v=>{
                console.log(v.id.toString(),nav.get("id"),v.id.toString() ===nav.get("id"))
                if(v.id.toString() ===nav.get("id")){
                    v.checked=true;
                }
                return v;
            })
            console.log(data)
        }

        setProviders(data)
    },[data])
    useEffect(()=>{
        setFilter([...filters])
    },[filters])
    useEffect(()=>{

        onSelect(_.filter(providers,v=>v?.checked))
    },[providers])
    useEffect(()=>{
        setFilters(_.filter(filter,v=>v?.checked))
    },[filter])

    useOutsideRefSLF(ref5)

    const renderSelected=()=> {
        const count = _.chain(providers).filter(p=>p.checked).value().length
        return count>0?count:"All";
    }
    const renderView = ()=>{
        if(showFilter){
            return <div    className={`search-input-content `}  style={{...style,height:'100%',top:0,position:"fixed"}}>
                <div className={"header-search-container"}>
                    <h3>Filter</h3>
                    <div className={"close-icon"} onClick={()=>setOpen(false)}>
                        <img src={close} alt=""/>
                    </div>
                </div>
                <div style={{paddingLeft:"20px",color:"white",marginTop:"50px"}}><h5>{t("Categories")}</h5></div>
                <div className="prov_list">
                    <ul>

                        {


                            _.map(filter,(p,index)=>{
                                return  <li key={index} onClick={()=>{
                                    setFilter({
                                        ...filter,[index]:{...p,checked:!p.checked}
                                    })
                                }}>
                                    <div className={`checkbox${p.checked?' checked':""}`}>{p.name}</div>
                                </li>
                            })
                        }

                    </ul>
                </div>
                <div style={{paddingLeft:"20px",color:"white"}}><h5>{t("Providers")}</h5></div>

                <div className="prov_list">
                    <ul>
                        {

                            _.map(providers,(p,index)=>{
                                return  <li key={index} onClick={()=>{
                                    setProviders({
                                        ...providers,[index]:{...p,checked:!p.checked}
                                    })
                                }}>
                                    <div className={`checkbox${p.checked?' checked':""}`}>{p.name}</div>
                                </li>
                            })
                        }

                    </ul>
                </div>

                <div className={"clear-button"} style={{backgroundColor:'#ffbc00',color:"#192034"}} onClick={()=>{

                    setOpen(false)
                }}>
                    Save
                </div>

                <div className={"clear-button"} style={{marginTop:"10px"}} onClick={()=>{
                    setProviders({..._.map(providers,p=>{
                            return{...p,checked:false}
                        })})
                    if(showFilter){
                        setFilter({..._.map(filter,p=>{
                            return{...p,checked:false}
                        })})
                    }
                    setOpen(false)
                }}>
                    Clear
                </div>
            </div>
        }else{
            return <div    className={`search-input-content `} style={{...style}}>

                <div className="prov_list">
                    <ul>
                        {

                            _.map(providers,(p,index)=>{
                                return  <li key={index} onClick={()=>{
                                    setProviders({
                                        ...providers,[index]:{...p,checked:!p.checked}
                                    })

                                }}>
                                    <div className={`checkbox${p.checked?' checked':""}`}>{p.name}</div>
                                </li>
                            })
                        }

                    </ul>
                </div>

                <div className={"clear-button"} onClick={()=>{
                    setProviders({..._.map(providers,p=>{
                            return{...p,checked:false}
                        })})
                    toggle()
                }}>
                    Clear
                </div>
            </div>
        }

    }
    const toggle = () =>{
        if(ref5.current.classList.contains("active")){
            ref5.current.classList.remove("active")
        }else{
            ref5.current.classList.add("active")
        }
    }

    return <div className={"slot-custom-search"}  ref={ref5} >
        <div className={"slot-search-input"} onClick={toggle}>
            <div className={"search-input"}>
                <span className={"provider"}>{label}: </span>
                <span className={"selected"}>{
                    renderSelected()
                }</span>
            </div>
            <div   className={"search-arrow-icon"} >
                <div className={"icon"} style={{backgroundImage:`url(${multiArrow})`}}/>
            </div>
        </div>
        {
            renderView()
        }
    </div>
}
CustomDropdown.propTypes={
    setFilters:PropTypes.func
}
CustomDropdown.defaultProps={
    showFilter:false,
    filters:[],
    setFilters:e=>console.log(e),
    onClick:e=>console.log(e)
}
