import React from 'react'

const CheckoutComponent = ({ initialPrice, totalPrice, totalDiscount }) => {
    return (
        <div className='flex flex-col gap-5 w-full md:w-2/5 border rounded-lg p-4'>
            <div className='flex justify-between'>
                <p className='p-700 text-gray-400'>Subtotal</p>
                <p className='p-700 text-gray-950'>{initialPrice.toLocaleString('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                })}</p>
            </div>

            <div className='flex justify-between'>
                <p className='p-700 text-gray-400'>Discount</p>
                <p className='p-700 text-red-400 line-through'>-{totalDiscount.toLocaleString('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                })}</p>
            </div>

            <div className='w-full border border-dashed mt-4 mb-2'></div>

            <div className='flex justify-between'>
                <p className='p-600 text-gray-950'>Grand total</p>
                <p className='p-700 text-gray-950 text-xl'>{totalPrice.toLocaleString('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                })}</p>
            </div>

            <a href='/checkout' className='p-3 bg-gray-900 hover:bg-gray-950 text-white p-600 rounded-lg text-center'>Checkout now</a>
        </div>
    )
}

export default CheckoutComponent