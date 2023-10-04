import React, { useState, useEffect } from 'react'
import product from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer01-600x764.jpg";
import productHover from "../../../assets/images/Mens-Standard-Fit-Deconstructed-Knit-Blazer02-600x764.jpg";
import useAuthContext from '../../../context/AuthContext';
import apiService from '../../../api/apiRequests';
import { Link } from 'react-router-dom';


const AllProducts = () => {
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
        async function fetchproduct() {
            try {
                const response = await apiService.fetchProducts();
                console.log(response.data.payload)
                setProduct(response.data.payload);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchproduct();
    }, []);
    return (
        <>
            <div className='px-5 md:px-10 mb-4'>
                <p className="p-600 text-2xl">Handpicked for you</p>
            </div>
            <div className='w-full px-5 md:px-10 flex flex-wrap items-start gap-x-3 md:gap-x-5'>
                {product.map((item, index) => (
                    <div key={index}>
                        {item && item.categoryId && item.categoryId.category === activeCategory && (
                            <Link to="" className='flex flex-col w-[48%] md:w-[300px] gap-1  mb-4 py-2 md:py-5'>
                                <div className=' relative'>
                                    <img
                                        className='rounded w-full item-center'
                                        src={isHovered === item._id ? item.images[1] : item.images[0]}
                                        alt='Product'
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
                        )}
                    </div>
                ))}

            </div>
        </>
    )
}

export default AllProducts