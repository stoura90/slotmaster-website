import React,{useEffect,useState,useRef} from 'react'
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, Virtual} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import _ from 'lodash'
SwiperCore.use([Navigation,Virtual, Pagination, Scrollbar, A11y]);

const  HeaderCarousel = (props) =>{
    const [data,setData]= useState(props.data)
    const [count,setCount] = useState(props.count || 5)
    const ref = useRef(null);
    useEffect(()=> {
        setCount(props.count)
    },[props.count])
    useEffect(()=> {
        if(ref){
            console.log(document.querySelector(".swiper-wrapper").setAttribute("class","swiper-wrapper d-flex align-items-center"));
        }
    },[ref])

    return (
        <Swiper
            ref={ref}
            spaceBetween={10}
            slidesPerView={count}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            loop={true}
            wrapperClass={"test"}

        >
            {
                _.map(data, (v,index)=>{
                    return  (
                        <SwiperSlide key={index}>
                            <a href="#" target="_blank">
                                <img src={v.icon} alt="Bitcoin" />
                            </a>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default HeaderCarousel;