import React, { useState } from 'react'
import productOne from "../../../assets/images/1.jpg"
import productTwo from "../../../assets/images/2.jpg"
import productThree from "../../../assets/images/4.jpg"
import productFour from "../../../assets/images/5.jpg"
import productFive from "../../../assets/images/6.jpg"
import productSix from "../../../assets/images/7.jpg"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductInfo = () => {
    const [quantity, setQuantity] = useState(1);

    const [isChecked, setIsChecked] = useState(false);

    const onChange = () => {
        console.log("Changed");
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const productImages = [
        {
            image: productOne
        },
        {
            image: productTwo
        },
        {
            image: productThree
        },
        {
            image: productFour
        },
        {
            image: productFive
        },
        {
            image: productSix
        },
    ]

    return (
        <>
            <div className='flex flex-col md:flex-row w-full gap-10 mt-3'>
                <div className='flex flex-col w-full md:w-1/2'>
                    <Swiper loop={true} spaceBetween={10} navigation={true} modules={[Navigation]} grabCursor={true} className='w-full product-images-slider-thumbs'>
                        {
                            productImages.map((item, index) => (
                                <SwiperSlide key={index} className='w-full'>
                                    <img src={item.image} className='w-full rounded-lg' alt='product image'></img>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className='flex flex-col w-full md:w-1/2 mt-2'>
                    <div className='flex justify-between'>
                        <p className='p-400'>Clothings</p>
                        <i className="text-[#F59E0B] text-2xl text-right ri-heart-add-line"></i>
                    </div>
                    <h1 className='p-600 text-2xl'>2 In 1 Men's Short Sleeve Shirt & Short Set - White</h1>
                    <div className='flex gap-2 mt-3'>
                        <i className="text-[#F59E0B] text-lg ri-star-fill"></i>
                        <i className="text-[#F59E0B] text-lg ri-star-fill"></i>
                        <i className="text-[#F59E0B] text-lg ri-star-fill"></i>
                        <i className="text-[#F59E0B] text-lg ri-star-fill"></i>
                        <i className="text-[#F59E0B] text-lg ri-star-half-line"></i>
                    </div>
                    <div className='flex gap-2 items-end mt-2'>
                        <h1 className='p-700 text-2xl font-bold'>&#8358;3,000</h1>
                        <h1 className='p-400 text-sm line-through'>-&#8358;500</h1>
                        <div className='bg-[#ffe1ad] w-fit px-2 py-1 mt-3 ml-2 text-sm p-600 rounded'>
                            -44%
                        </div>
                    </div>

                    <div className='w-full border border-dashed mt-5 mb-5'></div>

                    <div className='flex gap-4 flex-col md:flex-row'>
                        <div className='w-full md:w-1/2'>
                            <h1 className='p-500'>Avaliable Sizes</h1>
                            <select className='w-full p-400 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm'>
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                                <option>Extra Large</option>
                            </select>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <h1 className='p-500'>Avaliable Color</h1>
                            <select className='w-full p-400 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm'>
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                                <option>Extra Large</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full border border-dashed mt-5 mb-5'></div>

                    <div className='flex gap-4'>
                        <div className="flex">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={handleDecrease}
                            >
                                -
                            </button>
                            <div className="bg-gray-100 text-gray-800 px-4 py-2">
                                {quantity}
                            </div>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                onClick={handleIncrease}
                            >
                                +
                            </button>
                        </div>
                        <button className='bg-gray-900 text-white p-600 px-4 py-2 rounded-md'>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo