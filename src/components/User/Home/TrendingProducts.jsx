import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/bundle';
import product from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer01-600x764.jpg";
import productHover from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer02-600x764.jpg";


const TrendingProducts = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <>
            <div className='w-full py-20'>
                <div className='pl-5 md:pl-10'>
                    <div className='flex'>
                        <p className="p-600 text-2xl">Trending Products</p>
                    </div>
                </div>
                <Swiper loop={true} modules={[Scrollbar]} scrollbar={{ draggable: true, dragSize: 60 }} spaceBetween={10} breakpoints={{
                    320: {
                        slidesPerView: 1.5,
                        spaceBetween: 10,
                    }, 640: {
                        slidesPerView: 4,
                        spaceBetween: 5,
                    }, 1000: {
                        slidesPerView: 4.5,
                        spaceBetween: 15,
                    },
                }} className='mt-3 pl-4 md:pl-10 pr-1'>

                    <SwiperSlide className='flex flex-col w-[300px] gap-1 md:w-36 mb-4 py-5'>
                        <div className='w-full relative'>
                            <img
                                className='rounded w-full item-center'
                                src={isHovered ? productHover : product}
                                alt='Product'
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                            <div className="h-8 w-8 bg-white absolute bottom-2 right-2 rounded-full flex items-center justify-center">
                                <i className="ri-heart-3-line font-bold text-xl"></i>
                            </div>

                            <div className="bg-red-500 absolute top-2 left-2 rounded px-2 py-1 flex items-center justify-center">
                                <p className='text-white p-600 text-xs'>-30%</p>
                            </div>

                        </div>
                        <p className='p-600'>Fashion</p>
                        <p className='p-400 text-[15px]'>Mens Standard Fit Sweater Fleece Jacket</p>
                        <div className='flex gap-1'>
                            <p className='p-400 text-[15px] line-through'>&#8358;3,000</p>
                            <p className='p-400 text-[15px]'>&#8358;3,000</p>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </>
    )
}

export default TrendingProducts