import React,{useEffect,useState} from 'react'
import _ from 'lodash'
import {play} from "../../assets/img/icons/icons";

const SlotCard =(props)=> {
    const [data,setData]= useState(props.data)
    const [count,setCount] = useState(props.count || 5)
    useEffect(()=> {
        setCount(props.count)
    },[props.count])

    return (

            _.map(data, (v,index)=>{
                return  (
                    <div className="col-4 col-lg-3 col-xl-2" key={index}>
                        <div className="slot-card">
                            <a href="#" className="slot-card-hover">
                                <img src={v.icon} alt="" className="slot-card-cover"/>
                                <img src={play} alt="" className="play-btn"/>
                            </a>
                        </div>
                    </div>
                )
            })

    )
}
export default SlotCard;
