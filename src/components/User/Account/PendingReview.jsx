import React from 'react'
import { Link } from 'react-router-dom'

const PendingReview = () => {
    return (
        <div className='p-1 md:px-2 md:py-2'>
            <h1 className='p-600 text-xl'>Pending Review (3)</h1>
            <p className='p-400 text-gray-500 mt-1'>Review Delivered Products.</p>

            <div className='flex flex-col gap-4 border mt-8 border-gray-300 rounded-md px-2 py-2 md:px-3 md:py-3'>
                <div className='flex flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                    <div className='flex md:flex-row gap-4'>
                        <img className='w-20 h-20 md:w-32 md:h-32' src='https://res.cloudinary.com/dtwmo6wsb/image/upload/v1692721496/cld-sample-5.jpg' />
                        <div className='flex flex-col gap-1'>
                            <h1 className='p-500'>Mens Casual All-match Shoes Running Sneakers -black</h1>
                            <p className='p-500 text-gray-900 text-sm'>Order nº: 1359429262</p>
                            <p className='p-400 text-gray-900 text-sm'>Size: 44</p>
                            <p className='p-400 text-gray-900 text-sm'>Color: White</p>
                            <p className='p-600 text-green-600 text-sm'>Delivered on 03-04-23</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between gap-1 '>
                        <Link className='p-600 text-yellow-600'>Rate Product</Link>
                    </div>
                </div>

                <div className='w-full border border-dashed mt-2 mb-2'></div>
            </div>
        </div>
    )
}

export default PendingReview