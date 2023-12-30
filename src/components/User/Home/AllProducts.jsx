import React, { useState, useEffect } from 'react'
import useAuthContext from '../../../context/AuthContext';
import apiService from '../../../api/apiRequests';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';


const AllProducts = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (id) => {
        setIsHovered(id);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const { activeCategory, setActiveCategory } = useAuthContext();
    useEffect(() => {
        async function fetchproduct() {
            setIsLoading(true)
            try {
                const response = await apiService.fetchProducts();
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
            <div className='w-full px-5 md:px-10 flex flex-wrap items-start gap-4'>
                {product.map((item, index) => (
                    <>
                        {item && item.categoryId && item.categoryId[0].category === activeCategory && (
                            <Link to={`/product-details/${item.slug}`} className='flex flex-col w-full md:w-[280px] gap-1  mb-4 py-2 ' key={index}>
                                <div className=' relative'>
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
                                <p className='p-600 '>{item.categoryType}</p>
                                <p className='p-400 text-[15px] '>{item.title}</p>
                                <div className='flex gap-1 '>
                                  
                                    <p className='p-400 text-[15px]'>{item.price.toLocaleString('en-NG', {
                                        style: 'currency',
                                        currency: 'NGN',
                                    })}</p>
                                      <p className='p-400 text-[15px] line-through'> - {item.discount.toLocaleString('en-NG', {
                                        style: 'currency',
                                        currency: 'NGN',
                                    })}</p>
                                </div>
                            </Link>
                        )}
                    </>
                ))}

            </div>
             )}
        </>
    )
}

export default AllProducts