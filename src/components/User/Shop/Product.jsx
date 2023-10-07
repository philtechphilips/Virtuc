import React, { useState } from 'react'
import product from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer01-600x764.jpg";
import productHover from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer02-600x764.jpg";
import useAuthContext from '../../../context/AuthContext';
import apiService from '../../../api/apiRequests';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Products = () => {
    const { categoryType } = useParams();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (id) => {
        setIsHovered(id);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { activeCategory, setActiveCategory } = useAuthContext();

    useEffect(() => {
        async function fetchproduct(categoryType) {
            const category = JSON.parse(localStorage.getItem("category"));
            try {
                const response = await apiService.fetchShopProducts(category.id, categoryType);
                console.log(response.data.payload)
                setProduct(response.data.payload);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchproduct(categoryType);
    }, [categoryType]);
    return (
        <>
            <div className='px-5 md:px-10 mt-4'>
                <div className='flex gap-3 mb-5'>
                    <a href='' className='p-400'>Shop</a>
                    <i className="ri-arrow-right-s-line"></i>
                    <a href='' className='p-400'>Men</a>
                </div>
            </div>
            <div className='px-5 md:px-10 flex gap-1 justify-between'>
                <div className='flex flex-col gap-2'>
                    <p className='p-400 text-sm'>Refine</p>
                    <select placeholder='Select' className='w-40 md:w-48 p-400 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm'>
                        <option defaultValue="" selected disabled>All</option>
                        <option>All</option>
                        <option>All</option>
                        <option>All</option>
                        <option>All</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='p-400 text-sm'>Sort by</p>
                    <select placeholder='Select' className='w-40 md:w-48 p-400 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm'>
                        <option defaultValue="" selected disabled>All</option>
                        <option>All</option>
                        <option>All</option>
                        <option>All</option>
                        <option>All</option>
                    </select>
                </div>
            </div>
            <div className='w-full px-5 md:px-10 flex flex-wrap items-start gap-x-3 md:gap-x-5 py-5'>
                {product && product.length > 0 && product.map((item, index) => (
                    <Link to={`/product-details/${item.slug}`} className='flex flex-col w-[48%] md:w-[300px] gap-1  mb-4 py-2 md:py-5' key={index}>
                        <div className=' relative'>
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
                        <p className='p-600 '>{item.categoryType}</p>
                        <p className='p-400 text-[15px] '>{item.title}</p>
                        <div className='flex gap-1 '>
                            <p className='p-400 text-[15px]'>{item.price.toLocaleString('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                            })}</p>
                            <p className='p-400 text-[15px] line-through'>{item.discount.toLocaleString('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                            })}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}


export default Products