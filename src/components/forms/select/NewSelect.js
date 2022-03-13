import {memo, useEffect, useMemo, useRef, useState} from "react";
import './select.scss';
import _ from "lodash";
import {useOutsideAlerter} from "../../../core/hooks/useOutSideClick";
import {useOutsideRef2} from "../../../core/hooks/useOutSideClickRef2";

const SelectBox = memo(({id,data,onSelect,value,placeholder,className})=>{
    const ref = useRef(null);
    const ref2 = useRef(null);
    useOutsideAlerter(ref);
    useOutsideRef2(ref2);
    const selected = useMemo(()=>{
        let find = data.find(v=>v.id===value)
        if(find) return find;
        return null
    },[value])

    const toggleSelect=()=>{
        ref.current.classList.toggle("close-select-box")
    }
    const toggleRef2=()=>{
        ref2.current.classList.toggle("active")
    }

    return (
        <div className={`newSelect-box`} ref={ref2} onClick={()=>{toggleRef2()}}>
        <div className={`input-select input-style ${className}`} onClick={()=>{toggleSelect()}}>
            <input type="text" name="select"  value={selected?.title||selected?.name} id={id}/>
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
        </div>
    )

});
export default SelectBox;
