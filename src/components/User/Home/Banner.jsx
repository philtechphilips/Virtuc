import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/bundle';
import bannerImage from "../../../assets/images/feet-1840619_1280.jpg";
import {bannerSlides} from "../../../assets/data/data"

const Banner = () => {
    const backgroundImageUrl = 'url("../../../assets/images/time-3091031_1280.jpg")';
    return (
        <div className='px-5 md:px-10'>
            <div className="mt-20 py-5 md:py-20 h-56 md:h-[400px] flex w-full relative" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
                <div className='px-5 md:px-10 flex flex-col justify-end gap-1 md:gap-2 w-[450px] z-[10000]'>
                    <h1 className='p-700 text-gray-100 text-2xl'>Men's Sneakers</h1>
                    <p className='p-400 text-gray-100 text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid quasi magni ex.</p>
                    <Link className='p-400 text-gray-100 text-sm px-4 py-2 mt-2 border border-gray-100 w-fit rounded-sm hover:px-[17px]'>30 products</Link>
                </div>
                <div style={{ content: '', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}></div>
            </div>
        </div>
    );
};

export default Banner;
