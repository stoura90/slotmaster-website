import React,{useEffect,useState} from 'react'
import _ from 'lodash'
import {play as PlayIcon} from "../../assets/img/icons/icons";
import {Actions} from "../../core";
import {useSLot} from "../../core/hooks/useSLot";
import {useLoader} from "../../core/hooks/useLoader";
import {Loader} from "../index";

const SlotCard =(props)=> {
    const {loader}=useLoader()
    const {play}= useSLot()


    return (

            _.map(props.data, (v,index)=>{
                return  (
                    <div className="col-4 col-lg-3" key={index}>

                        <div className="slot-card">
                            {loader===v.id && <Loader/>}
                            <span className="slot-card-hover">
                                <div className="slot-card-cover" style={{backgroundImage:`url(${v.icon})`}}/>
                                <img src={v.icon} alt="" style={{visibility:"hidden"}} />
                                <img src={PlayIcon} alt="" className="play-btn" onClick={()=>play(v)}/>
                            </span>
                        </div>
                    </div>
                )
            })

    )
}
export default SlotCard;
