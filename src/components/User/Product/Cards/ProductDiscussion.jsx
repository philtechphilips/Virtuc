import React from 'react'

const ProductDiscussion = () => {
    return (
        <>
            <h1 className='p-700 text-lg mt-3 mb-6'>Discussion</h1>
            <div className='flex items-center gap-3'>
                <h2 className='p-500 text-gray-500'>Sort by</h2>
                <select className='outline-none border border-gray-400 px-3 py-2 p-600 rounded-md'>
                    <option className=''>Newest</option>
                </select>
            </div>
            <div className='border rounded mt-5 p-4'>
                <div className='flex flex-col md:flex-row justify-between mt-5'>
                    <div className='flex gap-4'>
                        <img src="https://cms.forbesafrica.com/wp-content/uploads/2023/04/22-scaled.jpg" className='w-16 rounded-full h-16 p-1 border' alt="" />
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-5'>
                                <p className='p-700'>Karthryn Murphy</p>
                            </div>
                            <p className='p-500 text-gray-700'>The fit is perfect, and the quality is top notch.</p>
                            <div className='flex gap-5 items-center'>
                                <div className='flex gap-1 items-center'>
                                    <i className="ri-heart-line text-lg"></i>
                                    <p>Like</p>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <p>7</p>
                                    <p>Like(s)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex p-500 justify-right text-gray-600'>
                        <p className='ml-20 mt-3'>1 week(s) ago</p>
                    </div>
                </div>
                <div className='w-full border border-dashed mt-5'></div>

                <div className='flex flex-col md:flex-row justify-between mt-5'>
                    <div className='flex gap-4'>
                        <img src="https://cms.forbesafrica.com/wp-content/uploads/2023/04/22-scaled.jpg" className='w-16 rounded-full h-16 p-1 border' alt="" />
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-5'>
                                <p className='p-700'>Karthryn Murphy</p>
                            </div>
                            <p className='p-500 text-gray-700'>The fit is perfect, and the quality is top notch.</p>
                            <div className='flex gap-5 items-center'>
                                <div className='flex gap-1 items-center'>
                                    <i className="ri-heart-line text-lg"></i>
                                    <p>Like</p>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <p>7</p>
                                    <p>Like(s)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex p-500 justify-right text-gray-600'>
                        <p className='ml-20 mt-3'>1 week(s) ago</p>
                    </div>
                </div>
                <div className='w-full border border-dashed mt-5'></div>
            </div>
        </>
    )
}

export default ProductDiscussion