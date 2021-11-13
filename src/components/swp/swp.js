import React, {useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import _ from 'lodash';


// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination, Mousewheel,Keyboard, Scrollbar, A11y, Virtual} from 'swiper';


// install Swiper modules
SwiperCore.use([Navigation,Pagination,Mousewheel,Keyboard]);



const Swp = (props) =>{

    const [data,setData]= useState(props.data)
    const [count,setCount] = useState(props.count || 5)
    const ref = useRef(null);
    useEffect(()=> {
        setCount(props.count)
    },[props.count])
    useEffect(()=> {
        if(ref){
            //console.log(document.querySelector(".swiper-wrapper").setAttribute("class","swiper-wrapper d-flex align-items-center"));
        }
    },[ref])

    return (
        <>
            <Swiper
                spaceBetween={50}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation
                loop={true}
                pagination={{ clickable: true }}
            >
                {
                    _.map(data, (v,index)=>{
                        return  (
                            <SwiperSlide key={index}>
                                <a href="#" target="_blank" style={{background: '#ccc' }}>
                                    <div className="sl_img" style={{background: `url(${v.icon})`}} />
                                    {/*<img src={v.icon} alt="Bitcoin" />*/}
                                </a>
                            </SwiperSlide>
                        )
                    })
                }


            </Swiper>
        </>
    )
}
export default Swp;
