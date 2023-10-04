import React from 'react'
import 'swiper/css';
import categoryImage from '../../../assets/images/Mens-Standard-Fit-Short-Sleeve-V-Neck-T-Shirt01-1-600x764.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import apiService from '../../../api/apiRequests';
import useAuthContext from '../../../context/AuthContext';
import Skeleton from 'react-loading-skeleton';

const Featured = () => {
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { activeCategory, setActiveCategory } = useAuthContext();
    useEffect(() => {
        async function fetchFeaturedPoduct() {
            try {
                const response = await apiService.fetchFeaturedProducts();
                setFeaturedProduct(response.data.payload);
                // console.log(response.data.payload)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFeaturedPoduct();
    }, []);
    return (
        <>
            <div className='px-5 md:px-10 pt-20 md:pt-20 relative'>
                <div className='flex'>
                    <p className="p-600 text-2xl">Featured</p>
                </div>
                <div className='w-full flex flex-wrap items-start gap-x-3 md:gap-x-5'>
                    {isLoading
                        ?
                        (<div className='flex w-full md:w-[32%]   mb-4 py-2  md:py-5'>
                            <Skeleton className="rounded w-full item-center mb-1 py-96" />
                            <Skeleton className="rounded w-full item-center mb-1 py-96" />
                            <Skeleton className="rounded w-full item-center mb-1 py-96" />
                        </div>
                        )
                        :
                        (featuredProduct.map((item, index) => (
                            <>
                                {item && item.categoryId && item.categoryId.category === activeCategory && (
                                    <div className='flex flex-col w-full md:w-[32%]   mb-4 py-2  md:py-5' key={index}>
                                        <img className='rounded w-full item-center mb-1' src={item.imageUrl} alt={categoryImage} />
                                        <Link to='#' className='p-500 text-lg'>{item.buttonText}</Link>
                                    </div>
                                )}
                            </>
                        )))
                    }
                </div>
            </div>
        </>
    )
}

export default Featured