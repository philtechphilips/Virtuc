import React, { useState, useEffect } from 'react'
import useAuthContext from '../../../context/AuthContext';
import apiService from '../../../api/apiRequests';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/bundle';
import Skeleton from 'react-loading-skeleton';



const TrendingProducts = () => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = (id) => {
        setIsHovered(id);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const { activeCategory, activeCategoryId } = useAuthContext();
    useEffect(() => {
        async function fetchproduct() {
            setIsLoading(true)
            const category = JSON.parse(localStorage.getItem("category"));
            try {
                const response = await apiService.fetchTrendingProducts(category.id);
                setProduct(response.data.payload);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchproduct();
    }, [activeCategory]);
    return (
        <>
            <div className='w-full py-20'>
                <div className='pl-5 md:pl-10'>
                    <div className='flex'>
                        <p className="p-600 text-2xl">Trending Products</p>
                    </div>
                </div>
             {isLoading ? (
                <div className='flex flex-wrap gap-3 md:px-10 px-5 mt-3'>
                    <div>
                        <Skeleton className='md:w-80 w-full px-40 py-40' />
                        <Skeleton className='md:w-80 w-full px-40 py-42 mt-1'/>
                    </div>
                    <div>
                        <Skeleton className='md:w-80 w-full px-40 py-40' />
                        <Skeleton className='md:w-80 w-full px-40 py-42 mt-1'/>
                    </div>
                    <div>
                        <Skeleton className='md:w-80 w-full px-40 py-40' />
                        <Skeleton className='md:w-80 w-full px-40 py-42 mt-1'/>
                    </div>
                    <div>
                        <Skeleton className='md:w-80 w-full px-40 py-40' />
                        <Skeleton className='md:w-80 w-full px-40 py-42 mt-1'/>
                    </div>
                </div>
             ) : (
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
                    {product.length > 0 && product.map((item, index) => (
                        <div key={index}>
                            {item && item.categoryId && item.categoryId.category === activeCategory && (
                                <SwiperSlide className='flex flex-col w-[300px] gap-10 md:w-[25%] mb-4 py-5'>
                                    <Link to={`/product-details/${item.slug}`} >
                                        <div className='w-full relative'>
                                            <img
                                                className='rounded w-full item-center'
                                                src={isHovered === item._id ? item.images[1] : item.images[0]}
                                                alt='Product'
                                                onMouseEnter={() => { handleMouseEnter(item._id) }}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                            

                                            <div className="bg-red-500 absolute top-2 left-2 rounded px-2 py-1 flex items-center justify-center">
                                                <p className='text-white p-600 text-xs'>-{Math.ceil(item.discountInPercentage)}%</p>
                                            </div>

                                        </div>
                                        <p className='p-600 '>Fashion</p>
                                        <p className='p-400 text-[15px] '>{item.title}</p>
                                        <div className='flex gap-1 '>
                                            <p className='p-400 text-[15px] line-through'>{item.discount.toLocaleString('en-NG', {
                                                style: 'currency',
                                                currency: 'NGN',
                                            })}</p>
                                            <p className='p-400 text-[15px]'>{item.price.toLocaleString('en-NG', {
                                                style: 'currency',
                                                currency: 'NGN',
                                            })}</p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )}
                        </div>
                    ))}
                </Swiper>
             )}
            </div>
        </>
    )
}

export default TrendingProducts