import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RelatedProducts from './RelatedProducts';
import DiscussionForm from './DiscussionForm';
import ProductInfo from './ProductInfo';
import ProductDetails from './ProductDetails';
import useAuthContext from '../../../context/AuthContext';
import apiService from '../../../api/apiRequests';
import Skeleton from 'react-loading-skeleton';

const ProductDetailsContent = () => {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const { activeCategory, setActiveCategory } = useAuthContext();
    const { slug } = useParams();
    useEffect(() => {
        async function fetchproduct() {
            try {
                const response = await apiService.fetchProductDetails(slug);
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
        <div className='px-4 md:px-12 py-2 mt-20'>
            <div className='flex gap-3'>
                <p className='p-400 text-sm text-gray-400'>Shop</p>
                <i className="ri-arrow-right-s-line text-gray-400 p-500"></i>
                {isLoading ? (
                    <Skeleton className='px-5 py-[2px]'></Skeleton>
                ) : (
                    product && product.categoryId && product.categoryId.category ? (
                        <p className='p-400 text-sm text-gray-400'>{product.categoryId.category}</p>
                    ) : ""
                )}


                <i className="ri-arrow-right-s-line text-gray-400 p-500"></i>
                {isLoading ? (
                    <Skeleton className='px-5 py-[2px]'></Skeleton>
                ) : (
                    product && product.categoryType ? (
                        <p className='p-400 text-sm text-gray-400'>{product.categoryType}</p>
                    ) : ""
                )}
            </div>
            <ProductInfo product={product} loading={isLoading} />
            <ProductDetails product={product} loading={isLoading} />
            <RelatedProducts />
        </div>
    )
}

export default ProductDetailsContent