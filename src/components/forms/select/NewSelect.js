import {memo, useEffect, useMemo, useRef, useState} from "react";
import './select.scss';
import _ from "lodash";
import {useOutsideAlerter} from "../../../core/hooks/useOutSideClick";

const SelectBox = memo(({id,data,onSelect,value,placeholder,className})=>{
    const ref = useRef(null);
    useOutsideAlerter(ref)
    const selected = useMemo(()=>{
        let find = data.find(v=>v.id===value)
        if(find) return find;
        return null
    },[value])
    return (
        <div className={`input-select input-style ${className}`} onClick={()=>{
            if(ref.current.classList.contains("close-select-box")){
                ref.current.classList.remove("close-select-box");
            }else{
                ref.current.classList.add("close-select-box");
            }
        }}>
            <input type="text" name="select"  value={selected?.title} id={id}/>
            <label htmlFor={id}>{placeholder}</label>
            {
                <div className={"select-option-box close-select-box"} ref={ref}>
                    <ul>
                        {
                            _.map(data, (v,k)=> <li key={k} onClick={()=>{
                                onSelect(v);
                            }}>
                                {v.title}
                                {
                                    v.name?<span>{v.name}</span>:''
                                }
                            </li>)
                        }
                    </ul>
                </div>
            }

        </div>
    )

});
export default SelectBox;
