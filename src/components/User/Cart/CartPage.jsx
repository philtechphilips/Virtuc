import React, { useState } from 'react'
import productOne from "../../../assets/images/1.jpg"

const CartPage = () => {

    const [quantity, setQuantity] = useState(1);

    const onChange = () => {
        console.log("Changed");
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    return (
        <>
            <div className='flex flex-col md:flex-row gap-10 items-start p-5 md:p-10'>
                <div className='flex flex-col justify-between w-full md:w-3/5'>
                    <div className='flex justify-between items-center w-full'>
                        <h1 className='p-700 text-2xl md:text-3xl'>Cart</h1>
                        <div className='flex gap-1 items-center'>
                            <i className="ri-delete-bin-line"></i>
                            <p className='p-500'>Remove</p>
                        </div>
                    </div>
                    <div className='flex flex-col border px-3 md:p-4 rounded-md mt-6'>

                        <div className='flex flex-col md:flex-row items-start justify-between mt-3 mb-3 pt-3'>
                            <div className='flex flex-col'>
                                <div className='flex gap-3 items-start'>
                                    <img src={productOne} className='w-20 rounded-md'></img>
                                    <div className='flex flex-col gap-1 md:w-96'>
                                        <p className='p-500 text-blue-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, impedit!</p>
                                        <div className='flex gap-2'>
                                            <p className='p-500 text-gray-600 text-sm'>Size: L</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <i className="ri-delete-bin-line"></i>
                                            <p className='p-500'>Remove</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-start flex-col md:items-end gap-3'>
                                <p className='p-700 text-lg'>&#8358; 4,500</p>
                                <div className='flex gap-2 items-center'>
                                    <p className='line-through p-500 text-gray-400 text-sm'>&#8358; 1,500</p>
                                    <p className='bg-[#ffe1ad] w-fit px-2 py-1 text-xs p-600 rounded'>
                                        -44%
                                    </p>

                                </div>
                                <div className="flex">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-l"
                                        onClick={handleDecrease}
                                    >
                                        -
                                    </button>
                                    <div className="bg-gray-100 text-gray-800 p-600 text-sm px-4 py-1">
                                        {quantity}
                                    </div>
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-r"
                                        onClick={handleIncrease}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full border border-dashed mt-5'></div>

                        <div className='flex flex-col md:flex-row items-start justify-between mt-3 mb-3 pt-3'>
                            <div className='flex flex-col'>
                                <div className='flex gap-3 items-start'>
                                    <img src={productOne} className='w-20 rounded-md'></img>
                                    <div className='flex flex-col gap-1 md:w-96'>
                                        <p className='p-500 text-blue-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, impedit!</p>
                                        <div className='flex gap-2'>
                                            <p className='p-500 text-gray-600 text-sm'>Size: L</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <i className="ri-delete-bin-line"></i>
                                            <p className='p-500'>Remove</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-start flex-col md:items-end gap-3'>
                                <p className='p-700 text-lg'>&#8358; 4,500</p>
                                <div className='flex gap-2 items-center'>
                                    <p className='line-through p-500 text-gray-400 text-sm'>&#8358; 1,500</p>
                                    <p className='bg-[#ffe1ad] w-fit px-2 py-1 text-xs p-600 rounded'>
                                        -44%
                                    </p>

                                </div>
                                <div className="flex">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-l"
                                        onClick={handleDecrease}
                                    >
                                        -
                                    </button>
                                    <div className="bg-gray-100 text-gray-800 p-600 text-sm px-4 py-1">
                                        {quantity}
                                    </div>
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-r"
                                        onClick={handleIncrease}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full border border-dashed mt-5'></div>

                    </div>
                </div>
                <div className='flex flex-col gap-5 w-full md:w-2/5 border rounded-lg p-4'>
                    <div className='flex justify-between'>
                        <p className='p-700 text-gray-400'>Subtotal</p>
                        <p className='p-700 text-gray-950'>&#8358;4,500</p>
                    </div>

                    <div className='flex justify-between'>
                        <p className='p-700 text-gray-400'>Discount</p>
                        <p className='p-700 text-gray-400'>&#8358;0</p>
                    </div>

                    <div className='w-full border border-dashed mt-4 mb-2'></div>

                    <div className='flex justify-between'>
                        <p className='p-600 text-gray-950'>Grand total</p>
                        <p className='p-700 text-gray-950 text-xl'>&#8358;4,500</p>
                    </div>

                    <button className='p-3 bg-gray-900 hover:bg-gray-950 text-white p-600 rounded-lg'>Checkout now</button>
                </div>
            </div>
        </>
    )
}

export default CartPage