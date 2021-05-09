import React,{useEffect,useState} from 'react'
import _ from 'lodash'
import {play} from "../../assets/img/icons/icons";
import {promo1} from "../../assets/img/images";

const PromoCard =(props)=> {
    const [data,setData]= useState(props.data)
    const [count,setCount] = useState(props.count || 5)
    useEffect(()=> {
        setCount(props.count)
    },[props.count])

    return (

            _.map(data, (v,index)=>{
                return  (
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                        <div className="promo-card">
                            <img
                                src={v.icon}
                                alt="Edge Out Eddie $2,500 Jackpot!"
                                className="promo-card-cover"
                            />
                            <div className="promo-card-body">
                                <div className="promo-card-title">
                                    Edge Out Eddie $2,500 Jackpot!
                                </div>
                                <p className="promo-card-paragraph">
                                    Beat Eddie's multiplier every single week on a specified
                                    game to share in a $2,500 prize pool!
                                </p>
                                <a href="#" className="btn-dy">read more</a>
                            </div>
                        </div>
                    </div>
                )
            })

    )
}
export default PromoCard;
