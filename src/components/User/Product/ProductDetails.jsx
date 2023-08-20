import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductDetailsCard from './Cards/ProductDetailsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductDiscussion from './Cards/ProductDiscussion';
import ProductRatings from './Cards/ProductRatings';

const ProductDetails = () => {
    const [section, setSection] = useState("details");

    const handleSectionChange = (newSection) => {
        setSection(newSection);
    };
    return (
        <>
            <div className='mt-16'>
                <Swiper  loop={true} spaceBetween={10} breakpoints={{  320: {
                    slidesPerView: 1.5,
                    spaceBetween: 0, 
                },640: {
                    slidesPerView: 2,
                    spaceBetween: 5, 
                },1000: {
                    slidesPerView: 3,
                    spaceBetween: 0, 
                }, }}  className='flex items-center'>
                    <SwiperSlide
                        className={`cursor-pointer flex w-1/3 justify-center pb-5 border-b-[3px] transition duration-950 ease-out ${section === 'details' ? 'border-gray-800' : ''}`}
                        onClick={() => handleSectionChange('details')}
                    >
                        <h1 className={`p-500 text-gray-600 md:text-lg text-center transition duration-950 ease-out ${section === 'details' ? 'text-gray-800 p-700' : ''}`}>The Details</h1>
                    </SwiperSlide>

                    <SwiperSlide
                        className={`cursor-pointer flex gap-2 justify-center pb-5 w-1/3 border-b-[3px] ${section === 'ratings' ? 'border-gray-800' : ''}`}
                        onClick={() => handleSectionChange('ratings')}
                    >
                        <h1 className={`p-500 text-gray-600 md:text-lg text-center ${section === 'ratings' ? 'text-gray-800 p-700' : ''}`}>Ratings & Review</h1>
                        <div className='bg-gray-200 w-6 h-6 p-2 rounded-full flex items-center justify-center'>
                            <p className='p-700 text-gray-800 text-xs'>32</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide
                        className={`cursor-pointer flex w-1/3 justify-center pb-5 gap-2 border-b-[3px] ${section === 'discussion' ? 'border-gray-800' : ''}`}
                        onClick={() => handleSectionChange('discussion')}
                    >
                        <h1 className={`p-500 text-gray-600 md:text-lg text-center ${section === 'discussion' ? 'text-gray-800 p-700' : ''}`}>Discussion</h1>
                        <div className='bg-gray-200 w-6 h-6 p-2 rounded-full flex items-center justify-center'>
                            <p className='p-700 text-gray-800 text-xs'>5</p>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Conditionally render section content based on the URL */}
                {section === 'details' && (
                    <ProductDetailsCard />
                )}
                {section === 'ratings' && (
                    <div className='mt-5 p-4 border rounded'>
                        <ProductRatings />
                    </div>
                )}
                {section === 'discussion' && (
                    <div className='mt-5 p-4'>
                        <ProductDiscussion />
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductDetails