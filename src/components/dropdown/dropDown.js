import React, {useEffect, useState} from "react";
import "./dropdown.scss"
import {close, multiArrow} from "../../assets/img/icons/icons"
import _ from 'lodash'
import PropTypes from "prop-types";
export const CustomDropdown=({data,label,style ,onSelect,open,setOpen,onClick,showFilter,filters,setFilters})=>{
    const [providers,setProviders]=useState([])
    const [filter,setFilter]=useState([])

    useEffect(()=>{
        if(setFilter && open){
            document.body.style.overflowY="hidden"
        }else{
            document.body.style.overflowY="auto"
        }
    },[showFilter,setOpen])
    useEffect(()=>{
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


    const renderSelected=()=> {
        const count = _.chain(providers).filter(p=>p.checked).value().length
        return count>0?count:"All";
    }

    const renderView = ()=>{

        if(showFilter){
            return open && <div className={"search-input-content"} style={{...style,height:'100%',top:0,position:"fixed"}}>
                <div className={"header-search-container"}>
                    <h3>Filter</h3>
                    <div className={"close-icon"} onClick={()=>setOpen(false)}>
                        <img src={close} alt=""/>
                    </div>
                </div>
                <div style={{paddingLeft:"20px",color:"white",marginTop:"50px"}}><h5>Categories</h5></div>
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
                <div style={{paddingLeft:"20px",color:"white"}}><h5>Providers</h5></div>

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
                    setOpen(false)
                }}>
                    Clear
                </div>
            </div>
        }else{
            return open && <div className={"search-input-content"} style={{...style}}>

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
                    setOpen(false)
                }}>
                    Clear
                </div>
            </div>
        }

    }

    return <div className={"slot-custom-search"} >
        <div className={"slot-search-input"} onClick={()=>setOpen(!open)}>
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
