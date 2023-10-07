import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/bundle';
import product from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer01-600x764.jpg";
import productHover from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer02-600x764.jpg";


const RecentlyViewed = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (id) => {
        setIsHovered(id);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const recentlyViewed = JSON.parse(localStorage.getItem('recentItems')) || [];

    return (
        <>
            <div className='w-full py-20'>
                {recentlyViewed && recentlyViewed.length > 0 && (
                    <>
                        <div className='pl-5 md:pl-10'>
                            <div className='flex'>
                                <p className="p-600 text-2xl">Recently Viewed</p>
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
                            {recentlyViewed.map((item, index) => (
                                <SwiperSlide className='flex flex-col w-[300px] gap-1 md:w-36 mb-4 py-5' key={index}>
                                    <div className='w-full relative'>
                                        <img
                                            className='rounded w-full item-center'
                                            src={isHovered === item._id ? item.images[1] : item.images[0]}
                                            alt='Product image'
                                            onMouseEnter={() => { handleMouseEnter(item._id) }}
                                            onMouseLeave={handleMouseLeave}
                                        />
                                        <div className="h-8 w-8 bg-white absolute bottom-2 right-2 rounded-full flex items-center justify-center">
                                            <i className="ri-heart-3-line font-bold text-xl"></i>
                                        </div>

                                        <div className="bg-red-500 absolute top-2 left-2 rounded px-2 py-1 flex items-center justify-center">
                                            <p className='text-white p-600 text-xs'>-{Math.ceil(item.discountInPercentage)}%</p>
                                        </div>

                                    </div>
                                    <p className='p-600 text-sm'>{item.categoryType}</p>
                                    <p className='p-400 text-[15px]'>{item.title}</p>
                                    <div className='flex gap-1'>
                                        <p className='p-400 text-[15px] line-through'>{item.price
                                            .toLocaleString('en-NG', {
                                                style: 'currency',
                                                currency: 'NGN',
                                            })}
                                        </p>
                                        <p className='p-400 text-[15px]'>{item.discount
                                            .toLocaleString('en-NG', {
                                                style: 'currency',
                                                currency: 'NGN',
                                            })}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </>
                )}

            </div>
        </>
    )
}

export default RecentlyViewed