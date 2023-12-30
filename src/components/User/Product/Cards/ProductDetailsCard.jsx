import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ProductDetailsCard = ({ product, loading }) => {
    return (
        <>
            <div className='mt-5 p-5 border rounded'>
                <div className='flex flex-col md:flex-row gap-10'>
                    <div className='py-3 md:w-[40%]'>
                        {loading ?
                            (
                                <>
                                    <Skeleton className='py-2 px-10 w-10 mb-2' />
                                    <Skeleton className='py-2 w-full' />
                                </>
                            )
                            :
                            product && product.details &&
                            (
                                <>
                                    <h1 className='p-700 '>Details</h1>
                                    <p className='p-400 mt-2 text-sm'>{product.details}</p>
                                </>
                            )
                        }
                    </div>

                    <div className='py-3'>
                        {loading ?
                            (
                                <>
                                    <Skeleton className='py-2 px-10 w-10 mb-2' />
                                    <Skeleton className='py-2 w-full md:w-96 mb-1' />
                                    <Skeleton className='py-2 w-full md:w-96 mb-1' />
                                    <Skeleton className='py-2 w-full md:w-96 mb-1' />
                                </>
                            )
                            :
                            product && product.highlights &&
                            (
                                <>
                                    <h1 className='p-700 '>Highlights</h1>
                                    <ul className='px-5 list-disc mt-3'>
                                        {product.highlights.map((item, index) =>
                                            <li className='p-500 py-1' key={index}>{item}</li>
                                        )}
                                    </ul>
                                </>
                            )
                        }
                    </div>

                    <div className='py-3'>
                        {loading ?
                            (
                                <>
                                    <Skeleton className='py-2 px-10 w-10 mb-2' />
                                    <Skeleton className='py-2 w-full md:w-96 mb-1' />
                                    <Skeleton className='py-2 w-full md:w-96 mb-1' />
                                    <Skeleton className='py-2 w-full md:w-96 mb-1' />
                                </>
                            )
                            :
                            product && product.instructions &&
                            (
                                <>
                                    <h1 className='p-700 '>Additional Information</h1>
                                    <p className='p-400 mt-2'>{product.instructions}</p>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailsCard