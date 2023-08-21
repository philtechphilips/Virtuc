import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/bundle';
import { bannerSlides } from '../../../assets/data/data';

const Banner = () => {
    return (
        <>
            <Swiper autoplay={{ delay: 7000, pauseOnMouseEnter: true }}
                loop={true} spaceBetween={10} modules={[Navigation, Autoplay]} grabCursor={true} navigation={true} className='mt-16'>
                {
                    bannerSlides.map((banner, index) => (
                        <SwiperSlide style={{ backgroundImage: `url(${banner.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className='flex flex-col items-center justify-center bg-blue-100 rounded w-[130px] gap-2 md:w-36 mb-4 px-3 py-5 h-60 md:h-[500px]' key={index}></SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
};

export default Banner;
