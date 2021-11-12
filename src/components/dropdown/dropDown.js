import React, {useEffect, useState} from "react";
import "./dropdown.scss"
import {checked, multiArrow} from "../../assets/img/icons/icons"
import _ from 'lodash'
export const CustomDropdown=({data,label,style ,onSelect,})=>{
    const [open,setOpen]=useState(false)
    const [providers,setProviders]=useState([])
    useEffect(()=>{
        setProviders(data)
    },[data])
    useEffect(()=>{
        onSelect(_.filter(providers,v=>v?.checked))
    },[providers])
    const renderSelected=()=> {
        const count = _.chain(providers).filter(p=>p.checked).value().length
        return count>0?count:"All";
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
            open && <div className={"search-input-content"} style={{...style}}>
                <div>
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


    </div>
}
