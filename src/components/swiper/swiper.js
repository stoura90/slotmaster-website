import React,{useEffect,useState} from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import {slotSardCover} from "../../assets/img/images";
import {play} from "../../assets/img/icons/icons";
import _ from 'lodash'
import PropTypes from 'prop-types'
import {Loader} from "../index";
import {useLoader} from "../../core/hooks/useLoader";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const  Carousel = (props) =>{
    const [data,setData]= useState(props.data)
    const {loader}=useLoader()
    const [count,setCount] = useState(props.count || 5)
    useEffect(()=> {
       setCount(props.count)
    },[props.count])



    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={count}
            navigation
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {
                _.map(data, (v,index)=>{
                    return  (
                        <SwiperSlide key={index}>
                            <div className="slot-card">
                                {loader===v.id && <Loader/>}
                                <span  className="slot-card-hover">
                                    <div className="slot-card-cover" style={{backgroundImage:`url(${v.icon})`}}/>
                                    <img src={v.icon} alt="" style={{visibility:"hidden"}} />
                                    <img src={play} alt="" className="play-btn" onClick={()=> props.onClick(v,"")}/>
                                </span>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}
Carousel.propTypes={
    id:PropTypes.string
}
Carousel.defaultProps={
    id:'demo'
}


export default Carousel;