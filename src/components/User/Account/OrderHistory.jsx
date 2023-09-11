import React from 'react'
import { Link } from 'react-router-dom'

const OrderHistory = () => {
    return (
        <div className='p-1 md:px-2 md:py-2'>
            <h1 className='p-600 text-xl'>Order History</h1>
            <p className='p-400 text-gray-500 mt-1'>Here you can manage your orders.</p>

           <div className='flex items-center justify-center w-full'>
           <form className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2 my-10">
                <i className="ri-search-line text-lg text-gray-400 mr-1 cursor-pointer"></i>
                <input
                    type="text"
                    placeholder="Search for Order ID or Product"
                    className="flex-1 bg-transparent border-none focus:outline-none p-400 w-[260px] md:w-[500px]"
                />
            </form>
           </div>

           <div className='flex flex-col gap-4 border border-gray-300 rounded-md px-2 py-2 md:px-3 md:py-3'>
                <div className='flex flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                    <div className='flex md:flex-row gap-4'>
                        <img className='w-20 h-20 md:w-32 md:h-32' src='https://res.cloudinary.com/dtwmo6wsb/image/upload/v1692721496/cld-sample-5.jpg'  />
                        <div className='flex flex-col gap-1'>
                            <h1 className='p-500 text-sm'>Mens Casual All-match Shoes Running Sneakers -black</h1>
                            <p className='p-400 text-gray-500 text-sm'>Order No: 1368165262</p>
                            <p className='p-400 text-gray-900 text-sm'>Color: Black</p>
                            <p className='p-400 text-gray-900 text-sm'>Size: 44</p>
                            <p className='p-400 text-white p-1 rounded text-xs bg-green-600 w-fit'>Delivered</p>
                        </div>
                    </div>
                    <div className='hidden md:flex flex-col gap-1 md:text-right'>
                        <p className='p-400 text-gray-900 text-sm'>Delivery Date: 03-04-2022</p>
                        <p className='p-500'>&#8358; 5,000</p>
                        <Link className='p-500'>See Details</Link>
                    </div>
                </div>

                <div className='w-full border border-dashed mt-2 mb-2'></div>

                <div className='flex flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                    <div className='flex md:flex-row gap-4'>
                        <img className='w-20 h-20 md:w-32 md:h-32' src='https://res.cloudinary.com/dtwmo6wsb/image/upload/v1692721496/cld-sample-5.jpg'  />
                        <div className='flex flex-col gap-1'>
                            <h1 className='p-500 text-sm'>Mens Casual All-match Shoes Running Sneakers -black</h1>
                            <p className='p-400 text-gray-500 text-sm'>Order No: 1368165262</p>
                            <p className='p-400 text-gray-900 text-sm'>Color: Black</p>
                            <p className='p-400 text-gray-900 text-sm'>Size: 44</p>
                            <p className='p-400 text-white p-1 rounded text-xs bg-green-600 w-fit'>Delivered</p>
                        </div>
                    </div>
                    <div className='hidden md:flex flex-col gap-1 md:text-right'>
                        <p className='p-400 text-gray-900 text-sm'>Delivery Date: 03-04-2022</p>
                        <p className='p-500'>&#8358; 5,000</p>
                        <Link className='p-500'>See Details</Link>
                    </div>
                </div>

                <div className='w-full border border-dashed mt-2 mb-2'></div>
                
                <div className='flex flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                    <div className='flex md:flex-row gap-4'>
                        <img className='w-20 h-20 md:w-32 md:h-32' src='https://res.cloudinary.com/dtwmo6wsb/image/upload/v1692721496/cld-sample-5.jpg'  />
                        <div className='flex flex-col gap-1'>
                            <h1 className='p-500 text-sm'>Mens Casual All-match Shoes Running Sneakers -black</h1>
                            <p className='p-400 text-gray-500 text-sm'>Order No: 1368165262</p>
                            <p className='p-400 text-gray-900 text-sm'>Color: Black</p>
                            <p className='p-400 text-gray-900 text-sm'>Size: 44</p>
                            <p className='p-400 text-white p-1 rounded text-xs bg-green-600 w-fit'>Delivered</p>
                        </div>
                    </div>
                    <div className='hidden md:flex flex-col gap-1 md:text-right'>
                        <p className='p-400 text-gray-900 text-sm'>Delivery Date: 03-04-2022</p>
                        <p className='p-500'>&#8358; 5,000</p>
                        <Link className='p-500'>See Details</Link>
                    </div>
                </div>

                <div className='w-full border border-dashed mt-2 mb-2'></div>
           </div>
        </div>
    )
}

export default OrderHistory