import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import useAuthContext from '../../../context/AuthContext';

const Wishlist = () => {
    const { setWishList, wishList } = useAuthContext();

    const removeWishList = (wish) => {
        let newWishlist = wishList.filter(item => item._id !== wish._id);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        setWishList(newWishlist)
    }
   
    return (
        <div className='p-1 md:px-2 md:py-2'>
            <h1 className='p-600 text-xl'>Wishlist</h1>
            <p className='p-400 text-gray-500 mt-1'>Here are your saved products.</p>

            <div className='flex flex-col gap-4 border mt-8 border-gray-300 rounded-md px-2 py-2 md:px-3 md:py-3'>
                {wishList && wishList.length > 0 ? (
                    <>
                        {wishList.map((item, index) => (
                            <div key={index} className='flex border-b  border-dashed py-4 flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                                <div className='flex md:flex-row gap-4'>
                                    <img className='w-20 md:w-32' src={item.images[0]} />
                                    <div className='flex flex-col gap-1'>
                                        <h1 className='p-500 text-sm'>{item.title}</h1>
                                        <p className='p-600'>{item.price.toLocaleString('en-NG', {
                                            style: 'currency',
                                            currency: 'NGN',
                                        })}</p>
                                        <div className='flex gap-2 items-center'>
                                            <p className='p-400 line-through'>-{item.discount.toLocaleString('en-NG', {
                                                style: 'currency',
                                                currency: 'NGN',
                                            })}</p>
                                            <p className='p-400 p-1 bg-red-500 text-white text-xs rounded'>-{Math.ceil(item.discountInPercentage)}%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between gap-1 '>
                                    <Link className='hover:text-white p-500 hover:bg-gray-900 border border-gray-900 px-4 py-2 rounded-md w-fit'>Add to Cart</Link>
                                    <button className='p-500 text-red-500' onClick={() => {
                                        removeWishList(item)
                                    }}><i className="ri-delete-bin-line"></i> Remove</button>
                                </div>
                            </div>
                        ))}



                    </>
                ) : (
                    <p className='p-500 text-red-600'>Wishlist is Empty</p>
                )}

            </div>
        </div>
    )
}

export default Wishlist