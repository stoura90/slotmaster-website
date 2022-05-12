import './newSWP.scss';


// Import Swiper React components
//import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/autoplay/autoplay.scss';
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import 'swiper/modules/scrollbar/scrollbar.scss'; // Pagination module
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import _ from "lodash";
import {useState} from "react";


const NewSWP = (props) =>{
    const [data,setData]= useState(props.data)
    return (
        <Swiper
            spaceBetween={5}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
            autoplay
            pagination={{ clickable: true }}
            //scrollbar={{ draggable: true }}
            //Autoplay={1000}
            //loop={true}
            //pagination={{ clickable: true }}
        >

            {
                _.map(data, (v,index)=>{
                    return  (
                        <SwiperSlide key={index}>
                            <a href="#" target="_blank">
                                <div className="sl_img" style={{background: `url(${v.icon})`}} />
                                {/*<img src={v.icon} alt="Bitcoin" />*/}
                            </a>
                        </SwiperSlide>
                    )
                })
            }

            {/*<SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>*/}
        </Swiper>
    );
};

export default NewSWP;