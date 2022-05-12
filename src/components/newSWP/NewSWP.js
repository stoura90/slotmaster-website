import './newSWP.scss';


// Import Swiper React components
//import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/autoplay/autoplay.scss';
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";


const NewSWP = ({slide}) =>{
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            Autoplay={1000}
        >
            <SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>
        </Swiper>
    );
};

export default NewSWP;