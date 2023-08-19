import React from 'react'

const ProductRatings = () => {
    return (
        <>
            <div className='flex flex-col'>
                <h1 className='p-700'>Verified Ratings (800)</h1>
                <div className='flex gap-5 items-start'>
                    <div className='flex flex-col gap-3 bg-gray-100 w-48 items-center justify-center rounded-md p-3 mt-5'>
                        <h1 className='p-700 text-3xl text-[#f59e0b]'>3.9/5</h1>
                        <div className='flex gap-2'>
                            <i className="ri-star-fill text-[#f59e0b] text-lg"></i>
                            <i className="ri-star-fill text-[#f59e0b] text-lg"></i>
                            <i className="ri-star-fill text-[#f59e0b] text-lg"></i>
                            <i className="ri-star-half-fill text-[#f59e0b] text-lg"></i>
                            <i className="ri-star-line text-[#f59e0b] text-lg"></i>
                        </div>
                        <p className='p-500'>(800) Verified Ratings</p>
                    </div>

                    <div className='flex flex-col mt-5 gap-2'>
                        <div className='flex gap-2 items-center'>
                            <p className='p-500'>5</p>
                            <i className="ri-star-fill text-[#f59e0b] text-lg"></i>
                            <p className='p-500 text-gray-500'>(300)</p>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <p className='p-500'>4</p>
                            <i className="ri-star-fill text-[#f59e0b] text-lg"></i>
                            <p className='p-500 text-gray-500'>(200)</p>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <p className='p-500'>3</p>
                            <i className="ri-star-fill text-[#f59e0b] text-lg"></i>
                            <p className='p-500 text-gray-500'>(100)</p>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <p className='p-500'>2</p>
                            <i className="ri-star-fill text-[#f59e0b] text-lg"></i>
                            <p className='p-500 text-gray-500'>(150)</p>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <p className='p-500'>1</p>
                            <i className="ri-star-fill text-[#f59e0b] text-lg"></i>
                            <p className='p-500 text-gray-500'>(50)</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductRatings