import {memo, useEffect, useMemo, useRef, useState} from "react";
import './select.scss';
import _ from "lodash";
import {useOutsideAlerter} from "../../../core/hooks/useOutSideClick";
import {useOutsideRef2} from "../../../core/hooks/useOutSideClickRef2";

const SelectBox = memo(({id,data,onSelect,value,placeholder,className})=>{
    const ref = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const [text,setText] = useState("")
    useOutsideAlerter(ref);
    useOutsideRef2(ref2);
    const selected = useMemo(()=>{
        let find;
        if(className === "prefix"){
            find = data.find(v=>v.title===value)
        }else{
            find = data.find(v=>v.id===value)
        }
        if(find) return find;
        return null
    },[value,data])

    const toggleSelect=()=>{
        ref.current.classList.toggle("close-select-box")
    }
    const toggleRef2=()=>{
        ref3.current.focus()
        ref2.current.classList.toggle("active")
    }

    const filterData = useMemo(()=>{
        if(text){
            return _.filter(data,v=>v?.title.toLowerCase().indexOf(text.toLowerCase())>-1)
        }
        return data;
    },[data,text])

    return (
        <div className={`newSelect-box`} ref={ref2} onClick={()=>{toggleRef2()}}>
        <div className={`input-select input-style ${className}`}  onClick={()=>{toggleSelect()}} >
            <input type="text" name="select" className={"select-box"}  value={selected?.title||selected?.name} id={id} />
            <label htmlFor={id}>{placeholder}</label>
            {
                <div className={"select-option-box close-select-box"} ref={ref}>
                    <input type="text"  ref={ref3} className={"select-box-search"} style={{background:'#151b29'}} value={text}  onChange={e=>setText(e.target.value)} />
                    <ul>
                        {
                            _.map(filterData, (v,k)=> <li key={k} onClick={()=>{
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
