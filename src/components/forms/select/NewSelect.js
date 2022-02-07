import {memo, useEffect, useMemo, useRef, useState} from "react";
import './select.scss';
import _ from "lodash";

const SelectBox = memo(({data,onSelect,value,placeholder})=>{
    const ref = useRef(null);
    const selected = useMemo(()=>{
        let find = data.find(v=>v.id===value)
        if(find) return find;
        return null
    },[value])
    return (
        <div className="input-select input-style" onClick={()=>{
            if(ref.current.classList.contains("close-select-box")){
                ref.current.classList.remove("close-select-box");
            }else{
                ref.current.classList.add("close-select-box");
            }
        }}>
            <input type="text" name="select"  value={selected?.title}/>
            <label htmlFor={"select-box"}>{placeholder}</label>
            {
                <div className={"select-option-box close-select-box"} ref={ref}>
                    <ul>
                        {
                            _.map(data, (v,k)=> <li key={k} onClick={()=>{
                                onSelect(v);
                            }}>{v.title}</li>)
                        }
                    </ul>
                </div>
            }

        </div>
    )

});
export default SelectBox;
