import React from 'react'
import mastercard from '../../../assets/images/master-card.png'
import visa from '../../../assets/images/visa.png'
import verve from '../../../assets/images/verve.png'

const Footer = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return (
        <div className='homepage-categories-container bg-gray-200 py-16'>
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-8 md:gap-36">
                <div className='flex flex-wrap md:flex-nowrap flex-col gap-4 w-full md:w-1/3 pr-0 md:pr-24'>
                    <h1 className='logo text-3xl'>NOSTRA</h1>
                    <p className='p-400 text-gray-600 text-sm'>Specializes in providing high-quality, stylish products for your wardrobe</p>
                </div>

                <div className='flex flex-wrap gap-7 md:gap-0 md:flex-nowrap justify-between w-2/3'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='p-600 text-gray-600'>SHOP</h1>

                        <ul className='flex  flex-col gap-2'>
                            <li className='p-400 text-gray-500 text-sm'>Categories</li>
                            <li className='p-400 text-gray-500 text-sm'>Brands</li>
                            <li className='p-400 text-gray-500 text-sm'>Products</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <h1 className='p-600 text-gray-600'>COMPANY</h1>

                        <ul className='flex flex-col gap-2'>
                            <li className='p-400 text-gray-500 text-sm'>Categories</li>
                            <li className='p-400 text-gray-500 text-sm'>Brands</li>
                            <li className='p-400 text-gray-500 text-sm'>Products</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <h1 className='p-600 text-gray-600'>SUPPORT</h1>
                        <ul className='flex flex-col gap-2'>
                            <li className='p-400 text-gray-500 text-sm'>FAQs</li>
                            <li className='p-400 text-gray-500 text-sm'>Cookie Policy</li>
                            <li className='p-400 text-gray-500 text-sm'>Term of use</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <h1 className='p-600 text-gray-600'>PAYMENT METHODS</h1>
                        <div className='flex items-center justify-between'>
                            <img src={mastercard} className='w-12'></img>
                            <img src={visa} className='w-12'></img>
                            <img src={verve} className='w-12'></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full h-[1px] bg-gray-300 mt-12'></div>
            <div className='mt-3'>
                <p className='text-center text-gray-400 text-sm'>&copy; Copyright {year} Nostra. All right reserved</p>
            </div>
        </div>
    )
}

export default Footer