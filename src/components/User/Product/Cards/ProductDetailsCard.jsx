import React from 'react'

const ProductDetailsCard = ({ product }) => {
    return (
        <>
            <div className='mt-5 p-5 border rounded'>
                <div className='flex flex-col md:flex-row gap-10'>
                    <div className='py-3 md:w-[40%]'>
                        {
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
                    {
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
                    {
                            product && product.instructions &&
                            (
                                <>
                                    <h1 className='p-700 '>Whats in the box</h1>
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