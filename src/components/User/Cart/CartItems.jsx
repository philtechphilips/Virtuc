import React from 'react'
import { useState } from 'react';
import productOne from "../../../assets/images/1.jpg"

const CartItems = ({ cart, removeCartItem, removeCart, increaseQuantity, decreaseQuantity }) => {
    return (
        <div className='flex flex-col justify-between w-full md:w-3/5'>
            <div className='flex justify-between items-center w-full'>
                <h1 className='p-700 text-2xl md:text-3xl'>Cart</h1>
                {cart && cart.length > 0 && (
                    <button type='button' onClick={removeCart} className='flex gap-1 items-center'>
                        <i className="ri-delete-bin-line"></i>
                        <p className='p-500'>Remove</p>
                    </button>
                )}
            </div>
            <div className='flex flex-col border px-3 md:p-4 rounded-md mt-6'>
                {cart && cart.length > 0 ? (
                    <>
                        {cart.map((item, index) => (
                            <div key={index} className='flex flex-col border-b-2 border-dashed md:flex-row items-start justify-between mt-3 mb-3 pt-5 pb-5'>
                                <div className='flex flex-col'>
                                    <div className='flex gap-3 items-start'>
                                        <img src={item.images[0]} className='w-20 rounded-md'></img>
                                        <div className='flex flex-col gap-1 md:w-96'>
                                            <p className='p-600 text-sm'>{item.title}</p>

                                            <div className='flex gap-2'>
                                                {item.selectedSize != "" && (
                                                    <p className='p-500 text-gray-600 text-sm'>Size: {item.selectedSize}</p>
                                                )}
                                                {item.selectedColor != "" && (
                                                    <p className='p-500 text-gray-600 text-sm'>Size: {item.selectedColor}</p>
                                                )}
                                            </div>

                                            <button type='button' className='flex gap-1 items-center' onClick={() => removeCartItem(item)}>
                                                <i className="ri-delete-bin-line"></i>
                                                <p className='p-500'>Remove</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-start flex-col md:items-end gap-3'>
                                    <p className='p-700 text-lg'>{(item.cartQuantity * item.price).toLocaleString('en-NG', {
                                        style: 'currency',
                                        currency: 'NGN',
                                    })}</p>
                                    <div className='flex gap-2 items-center'>
                                        <p className='line-through p-500 text-gray-400 text-sm'>-{(item.cartQuantity * item.discount).toLocaleString('en-NG', {
                                            style: 'currency',
                                            currency: 'NGN',
                                        })}</p>
                                        <p className='bg-[#ffe1ad] w-fit px-2 py-1 text-xs p-600 rounded'>
                                            -{Math.ceil(item.cartQuantity * item.discountInPercentage)}%
                                        </p>

                                    </div>
                                    <div className="flex">
                                        <button
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-l"
                                            onClick={() => decreaseQuantity(item._id)}
                                        >
                                            -
                                        </button>
                                        <div className="bg-gray-100 text-gray-800 p-600 text-sm px-4 py-1">
                                            {item.cartQuantity}
                                        </div>
                                        <button
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-r"
                                            onClick={() => increaseQuantity(item._id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </>
                ) : (
                    <p className="p-500 text-red-600">Cart is empty</p>
                )}
            </div>
        </div>
    )
}

export default CartItems