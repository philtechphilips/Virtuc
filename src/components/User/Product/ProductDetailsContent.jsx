import React, { useState } from 'react'
import RelatedProducts from './RelatedProducts'
import DiscussionForm from './DiscussionForm'
import ProductInfo from './ProductInfo'
import ProductDetails from './ProductDetails'

const ProductDetailsContent = () => {
    return (
        <div className='px-4 md:px-12 py-6'>
            <div className='flex gap-3'>
                <p className='p-500 text-gray-400'>Shop</p>
                <i className="ri-arrow-right-s-line text-gray-400 p-500"></i>
                <p className='p-500 text-gray-400'>Electronics</p>
                <i className="ri-arrow-right-s-line text-gray-400 p-500"></i>
                <p className='p-500 text-gray-800'>Phone</p>
            </div>
            <ProductInfo />
            <ProductDetails />
            <DiscussionForm />
            <RelatedProducts />
        </div>
    )
}

export default ProductDetailsContent