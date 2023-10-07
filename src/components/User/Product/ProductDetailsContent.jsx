import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecentlyViewed from "../Shop/RecentlyViewed"
import ProductInfo from './ProductInfo';
import ProductDetails from './ProductDetails';
import useAuthContext from '../../../context/AuthContext';
import apiService from '../../../api/apiRequests';
import Skeleton from 'react-loading-skeleton';

const ProductDetailsContent = () => {
    const [product, setProduct] = useState({});
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { activeCategory, setActiveCategory } = useAuthContext();
    const { slug } = useParams();

    function isItemInRecentlyViewed(recentlyViewed, itemId) {
        return recentlyViewed.some((item) => item._id === itemId);
    }

    useEffect(() => {
        // Load recently viewed items from local storage
        const oldViewedProduct = JSON.parse(localStorage.getItem('recentItems')) || [];

        async function fetchProduct() {
            try {
                const response = await apiService.fetchProductDetails(slug);
                const newProduct = response.data.payload;

                if (!isItemInRecentlyViewed(oldViewedProduct, newProduct._id)) {
                    // Item is not in recently viewed, add it
                    const updatedRecentlyViewed = [...oldViewedProduct, newProduct];
                    localStorage.setItem('recentItems', JSON.stringify(updatedRecentlyViewed));
                    setRecentlyViewed(updatedRecentlyViewed);
                }

                setProduct(newProduct);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduct();
    }, []);

    return (
        <div className='px-4 md:px-12 py-2'>
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
            <RecentlyViewed />
        </div>
    )
}

export default ProductDetailsContent