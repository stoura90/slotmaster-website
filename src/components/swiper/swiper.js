import React,{useEffect,useState} from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
//import { Swiper, SwiperSlide } from 'swiper/react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import {slotSardCover} from "../../assets/img/images";
import {play as PlayIcon, play as PlayBtn} from "../../assets/img/icons/icons";
import _ from 'lodash'
import PropTypes from 'prop-types'
import {Loader} from "../index";
import {useLoader} from "../../core/hooks/useLoader";
import {useSLot} from "../../core/hooks/useSLot";
import {useTranslation} from "../../core";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const  Carousel = ({data,counter,navigation}) =>{
    const [slotList,setSlotList]= useState([])
    const {loader}=useLoader()
    const {i18n}= useTranslation()
    const [count,setCount] = useState( Math.round(window.innerWidth / 300))
    const {play}= useSLot()
    useEffect(()=> {
        setSlotList(data)
    },[data])

    useEffect(()=> {
        setCount(counter)
    },[counter])

    return (
        <Swiper

            spaceBetween={12}
            //slidesPerView={count}
            navigation={navigation}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}

            breakpoints={{
                1200: {
                    slidesPerView: 6,
                },
                992: {
                    slidesPerView: 5,
                },
                768: {
                    slidesPerView: 4,
                },
                576: {
                    slidesPerView: 3,
                },
                400: {
                    slidesPerView: 3,
                },
                200: {
                    slidesPerView: 3,
                },
                160: {
                    slidesPerView: 1,
                }
            }}
        >
            {
                _.map(slotList, (v,index)=>{
                    return  (
                        <SwiperSlide key={index}>
                            <div className="main-card-list-item" key={index} >
                                {/*{loader===v.gameId && <Loader/>}*/}
                                <div className="sl-card" style={{backgroundImage:`url(${v.imageUrl})`}} >
                                    <div className="sl-card-hover"  onClick={()=>window.open(`/${i18n.language}/playSlot?id=${v.id}&gameId=${v.gameId}`)}>
                                        <div className="slot-card-cover "/>
                                        <img src={v.imageUrl} alt="" style={{visibility:"hidden"}} />
                                        <img src={PlayIcon} alt="" className="play-btn" />
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="name" dangerouslySetInnerHTML={{__html:decodeURI(decodeURI(v.name))}}/>
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
