import React from 'react'
import { products } from '../../../assets/data/data'
import ProductCard from '../Home/Cards/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
const RecentlyViewed = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='homepage-categories-container pb-16 w-full'>
        <div className='flex items-center justify-between'>
          <h1 className='homepage-categories-container-heading p-600 text-xl md:text-2xl'>Recently Viewed</h1>
        </div>
        <Swiper  loop={true} spaceBetween={10} breakpoints={{  320: {
                    slidesPerView: 1.2,
                    spaceBetween: 5, 
                },640: {
                    slidesPerView: 4,
                    spaceBetween: 5, 
                },1000: {
                    slidesPerView: 3.7,
                    spaceBetween: 5, 
                }, }} className='flex flex-wrap justify-start gap-1 md:gap-4 mt-7 w-full'>
          {products.map((product, index) => (
           <SwiperSlide className='w-full' key={index}>
              <div className='bg-gray-100 rounded-xl md:w-80 mb-4'>
                <img className='rounded' src={product.image} alt={`Trending Product Image`} />
                <div className='mt-2 flex flex-col gap-1 justify-between bg-white p-3'>
                    <div className='flex gap-1 items-center'>
                        <i className="ri-star-fill text-amber-500 text-sm"></i>
                        <p className='p-400 text-sm'>4.8</p>
                        <p className='text-sm'>(750)</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='p-400 text-sm text-gray-900'>{product.name}</p>
                        <div className='flex justify-between items-center'>
                            <p className='p-600 text-lg text-gray-800'>&#8358; 500 <sup className='text-xs p-400 text-gray-600'>&#8358;300</sup></p>
                            <button className='bg-[#6FCEAD] rounded-full px-2 py-1 md:px-3 md:py-2'><i className="ri-shopping-cart-2-line text-lg md:text-xl text-[#fff]"></i></button>
                        </div>
                    </div>
                </div>
            </div>
         </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default RecentlyViewed