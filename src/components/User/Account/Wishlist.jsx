import React from 'react'
import { Link } from 'react-router-dom'

const Wishlist = () => {
  return (
    <div className='p-1 md:px-2 md:py-2'>
            <h1 className='p-600 text-xl'>Wishlist</h1>
            <p className='p-400 text-gray-500 mt-1'>Here are your saved products.</p>

           <div className='flex flex-col gap-4 border mt-8 border-gray-300 rounded-md px-2 py-2 md:px-3 md:py-3'>
                <div className='flex flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                    <div className='flex md:flex-row gap-4'>
                        <img className='w-20 h-20 md:w-32 md:h-32' src='https://res.cloudinary.com/dtwmo6wsb/image/upload/v1692721496/cld-sample-5.jpg'  />
                        <div className='flex flex-col gap-1'>
                            <h1 className='p-500 text-sm'>Mens Casual All-match Shoes Running Sneakers -black</h1>
                            <p className='p-400 text-gray-900 text-sm'>Color: Black</p>
                            <p className='p-400 text-gray-900 text-sm'>Size: 44</p>
                            <p className='p-600'>&#8358; 5,000</p>
                            <div className='flex gap-2 items-center'>
                            <p className='p-400 line-through'>&#8358; 3,000</p>
                            <p className='p-400 p-1 bg-red-500 text-white text-xs rounded'>-20%</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between gap-1 '>
                        <Link className='hover:text-white p-500 hover:bg-gray-900 border border-gray-900 px-4 py-2 rounded-md w-fit'>Buy Now</Link>
                        <Link className='p-500 text-red-500'><i className="ri-delete-bin-line"></i> Remove</Link>
                    </div>
                </div>

                <div className='w-full border border-dashed mt-2 mb-2'></div>
           </div>
        </div>
  )
}

export default Wishlist