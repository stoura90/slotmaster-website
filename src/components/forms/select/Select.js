import {useEffect, useState} from "react";
import './select.scss';
import _ from "lodash";

export const Select = ({data,value,label,id,onSelect,plData,plName})=>{
    const [openList,setOpenList]=useState(false)

    return (
        <div className="input-select input-style" onClick={()=>setOpenList(!openList)}>
            <input type="text" name="select" id={id} value={typeof value === 'object'?value.value:value}/>
            <label htmlFor={id}>{label}</label>
            {
                openList && (
                    <div className="select-option-box">
                        <ul>
                            {
                                plName && <li onClick={()=>onSelect(plData)}>{plName}</li>
                            }
                            {
                                _.map(data, (v,k)=> <li key={k} onClick={()=>onSelect(typeof data==='object'?k:v)}>{typeof v==='object'?v.value:v}</li>)
                            }
                        </ul>
                    </div>
                )
            }

        </div>
    )


}

export default Select;

/*Select.propTypes = {
    email:PropTypes.string,
    err:PropTypes.string,
    onSubmit:PropTypes.func,
    onClose:PropTypes.func,
    send:PropTypes.string,
    save:PropTypes.func,
    additionalParams:PropTypes.object
}
Select.defaultValues = {
    email:'',
    err:'',
    onSubmit:(code)=>console.log(code),
    onClose:(_)=>console.log(_),
    save:(_)=>console.log(_),
    send:"",
    additionalParams:{}
}*/
