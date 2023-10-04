import React, { useEffect, useState } from 'react'
import RelatedProducts from './RelatedProducts'
import DiscussionForm from './DiscussionForm'
import ProductInfo from './ProductInfo'
import ProductDetails from './ProductDetails'
import useAuthContext from '../../../context/AuthContext'
import apiService from '../../../api/apiRequests'

const ProductDetailsContent = () => {
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
        <div className='px-4 md:px-12 py-2 mt-20'>
            <div className='flex gap-3'>
                <p className='p-400 text-sm text-gray-400'>Shop</p>
                <i className="ri-arrow-right-s-line text-gray-400 p-500"></i>
                <p className='p-400 text-sm text-gray-400'>Electronics</p>
                <i className="ri-arrow-right-s-line text-gray-400 p-500"></i>
                <p className='p-400 text-sm text-gray-800'>Phone</p>
            </div>
            <ProductInfo />
            <ProductDetails />
            <DiscussionForm />
            <RelatedProducts />
        </div>
    )
}

export default ProductDetailsContent