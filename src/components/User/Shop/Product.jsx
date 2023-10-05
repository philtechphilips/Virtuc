import React, { useState } from 'react'
import product from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer01-600x764.jpg";
import productHover from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer02-600x764.jpg";

const Products = () => {
  const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

  return (
    <>
    <div className='px-5 md:px-10 mt-40'>
        <p className="p-600 text-2xl">Best choice for you</p>
    </div>
    <div className='w-full px-5 md:px-10 flex flex-wrap items-start gap-x-3 md:gap-x-5 py-5'>
        <div className='flex flex-col w-[48%] md:w-[300px] gap-1  mb-4 py-2 md:py-5'>
            <div className=' relative'>
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
            <p className='p-600 '>Fashion</p>
            <p className='p-400 text-[15px] '>Mens Standard Fit Sweater Fleece Jacket</p>
            <div className='flex gap-1 '>
                <p className='p-400 text-[15px] line-through'>&#8358;3,000</p>
                <p className='p-400 text-[15px]'>&#8358;3,000</p>
            </div>
        </div>
        <div className='flex flex-col w-[48%] md:w-[300px] gap-1  mb-4 py-2 md:py-5'>
            <div className=' relative'>
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
            <p className='p-600 '>Fashion</p>
            <p className='p-400 text-[15px] '>Mens Standard Fit Sweater Fleece Jacket</p>
            <div className='flex gap-1 '>
                <p className='p-400 text-[15px] line-through'>&#8358;3,000</p>
                <p className='p-400 text-[15px]'>&#8358;3,000</p>
            </div>
        </div>

    </div>
    </>
  )
}


export default Products