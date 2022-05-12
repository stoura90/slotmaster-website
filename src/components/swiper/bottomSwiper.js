import React,{useEffect,useState} from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
//import { Swiper, SwiperSlide } from 'swiper/react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import {slotSardCover} from "../../assets/img/images";
import {play} from "../../assets/img/icons/icons";
import _ from 'lodash'
import {Link} from "react-router-dom";
import {i18n} from "../../core";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const  FooterCarousel = (props) =>{
    const lang = i18n.language
    const [data,setData]= useState(props.data)
    const [count,setCount] = useState(props.count || 5)
    useEffect(()=> {
        setCount(props.count)
    },[props.count])

    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={count}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {
                _.map(data, (v,index)=>{
                    return  (
                        <SwiperSlide key={index}>
                            <Link to={`/${lang}/${v.page}?id=${v.id}`}>
                                <img src={v.icon} alt="Bitcoin" />
                            </Link>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default FooterCarousel;
