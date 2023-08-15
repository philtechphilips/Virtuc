import React from 'react'

const ProductCard = ({ product }) => {
    return (
        <>
            <div className='bg-gray-100 rounded-xl  w-[49%] md:w-72 mb-4'>
                <img className='rounded' src={product.image} alt={`Trending Product Image`} />
                <div className='mt-2 flex flex-col gap-1 justify-between bg-white p-3'>
                    <div className='flex gap-1 items-center'>
                        <i className="ri-star-fill text-amber-500 text-sm"></i>
                        <p className='p-400 text-sm'>4.8</p>
                        <p className='text-sm'>(750)</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='p-400 text-sm text-gray-900'>{product.name}</p>
                        <div className='flex justify-between items-center'>
                            <p className='p-600 text-lg text-gray-800'>&#8358; 500 <sup className='text-xs p-400 text-gray-600'>&#8358;300</sup></p>
                            <button className='bg-[#6FCEAD] rounded-full px-2 py-1 md:px-3 md:py-2'><i className="ri-shopping-cart-2-line text-lg md:text-xl text-[#fff]"></i></button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductCard