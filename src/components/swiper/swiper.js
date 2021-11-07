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


const  Carousel = ({data,counter,onClick}) =>{
    const [slotList,setSlotList]= useState([])
    const {loader}=useLoader()
    const [count,setCount] = useState( Math.round(window.innerWidth / 300))
    useEffect(()=> {
        setSlotList(data)
    },[data])

    useEffect(()=> {
        setCount(counter)
    },[counter])

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
                _.map(slotList, (v,index)=>{
                    return  (
                        <SwiperSlide key={index}>
                            <div className="slot-card">
                                {loader===v.id && <Loader/>}
                                <span  className="slot-card-hover animated-background">
                                    <div className="slot-card-cover" style={{backgroundImage:`url(${v.imageUrl})`}}/>
                                    <img src={v.icon} alt="" style={{visibility:"hidden"}} />
                                    <img src={play} alt="" className="play-btn" onClick={()=> onClick(v,"")}/>
                                </span>
                                <div className="info">
                                    <div className="name">{v.name}</div>
                                    <div className="like"><i/><span>{v?.options?.likes}</span></div>
                                </div>
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