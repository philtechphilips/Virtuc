import React from 'react'

const ProductDetailsCard = () => {
    return (
        <>
            <div className='mt-5 p-5 border rounded'>
                <div className='flex flex-col md:flex-row gap-10'>
                    <div className='py-3'>
                        <h1 className='p-700 '>Highlights</h1>
                        <ul className='px-5 list-disc mt-3'>
                            <li className='p-500 py-1'>Type: Men's fashion 2 sets</li>
                            <li className='p-500 py-1'>Clothing material: Polyester</li>
                            <li className='p-500 py-1'>Color: White</li>
                            <li className='p-500 py-1'>Features: breathable and comfortable</li>
                            <li className='p-500 py-1'>T-shirt</li>
                            <li className='p-500 py-1'>Shorts</li>
                            <li className='p-500 py-1'>Short sleeve</li>
                        </ul>
                    </div>

                    <div className='py-3'>
                        <h1 className='p-700 '>Specifications</h1>
                        <ul className='px-5 list-disc mt-3'>
                            <li className='p-500 py-1'>SKU: FA203MW19DAFSNAFAMZ</li>
                            <li className='p-500 py-1'>Product Line: Yoo To-COD</li>
                            <li className='p-500 py-1'>Model: White</li>
                            <li className='p-500 py-1'>Production Country: China</li>
                            <li className='p-500 py-1'>Weight(kg): 0.3</li>
                            <li className='p-500 py-1'>Color: White</li>
                            <li className='p-500 py-1'>Main Material: Polyester</li>
                        </ul>
                    </div>

                    <div className='py-3'>
                        <h1 className='p-700 '>Whats in the box</h1>
                        <ul className='px-5 list-disc mt-3'>
                            <li className='p-500 py-1'>a short sleeve and a pair of shorts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailsCard