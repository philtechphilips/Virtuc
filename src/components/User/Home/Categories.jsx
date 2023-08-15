import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { categories } from '../../../assets/data/data';

const Categories = () => {
    return (
        <>
            <div className='homepage-categories-container relative'>
                <h1 className='homepage-categories-container-heading p-600 text-xl md:text-2xl'>Categories</h1>
                <Swiper  loop={true} spaceBetween={10} breakpoints={{  320: {
                    slidesPerView: 1.8,
                    spaceBetween: 5, 
                },640: {
                    slidesPerView: 4,
                    spaceBetween: 5, 
                },1000: {
                    slidesPerView: 8.5,
                    spaceBetween: 5, 
                }, }} className='mt-7'>
                    {
                        categories.map((categories, index) => (
                            <SwiperSlide className='flex flex-col items-center justify-center bg-blue-100 rounded w-[130px] gap-2 md:w-36 mb-4 px-3 py-5' key={index}>
                                <img className='rounded w-[70px] item-center' src={categories.image}></img>
                                <p className='p-400 text-sm'>{categories.category}</p>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </>
    )
}

export default Categories