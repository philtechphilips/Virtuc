import React from 'react'
import 'swiper/css';
import categoryImage from '../../../assets/images/Mens-Standard-Fit-Short-Sleeve-V-Neck-T-Shirt01-1-600x764.jpg'
import categoryImageOne from "../../../assets/images/outdoor-fw23-ccm-freehiker2low-global-launch-glpm-teaser-carousel_tcm221-1059146.avif";
import categoryImageTwo from '../../../assets/images/originals-fw23-stansmith-tcc_tcm221-1055503.jpg'
import categoryThree from '../../../assets/images/groceries_300x240v2.png'
import arrowIcon from '../../../assets/images/icons8-arrow-100.png'
import { useState } from 'react';

const Categories = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <>
            <div className='px-5 md:px-10 pt-20 md:pt-20 relative'>
                <div className='flex'>
                    <p className="p-600 text-2xl">Top Categories</p>
                </div>
                <div className='w-full flex flex-wrap items-start gap-x-3 md:gap-x-5'>
                    <div className='flex flex-col w-[48%] md:w-[300px] gap-1  mb-4 py-2 md:py-5'>
                        <div className=' relative' onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                            <img className='rounded w-full item-center' src={categoryImage} alt={categoryImage}
                            />
                            <div className='flex gap-1 items-center bg-white px-3 py-1 absolute left-4 bottom-4'>
                                <img src={arrowIcon} className='w-6'></img>
                                <p className='p-600 font-extrabold'>Mens Shirt</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col w-[48%] md:w-[300px] mt-10 md:mt-20 gap-1  mb-4 py-2 md:py-5'>
                        <div className=' relative'>
                            <img className='rounded w-full item-center' src={categoryImageOne} alt={categoryImage}
                            />
                        </div>
                    </div>


                    <div className='flex flex-col w-[48%] md:w-[300px] -mt-16 md:mt-0 gap-1  mb-4 py-2 md:py-5'>
                        <div className=' relative'>
                            <img className='rounded w-full item-center' src={categoryImageTwo} alt={categoryImage}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col w-[48%] md:w-[300px] gap-1 mt-0 md:mt-20 md:h-96  mb-4 py-2 md:py-5'>
                        <div className=' relative'>
                            <img className='rounded w-full item-center h-[250px] md:h-[400px]' src={categoryThree} alt={categoryImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories