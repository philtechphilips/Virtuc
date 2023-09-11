import React from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
    return (
        <div className='p-1 md:px-2 md:py-2'>
            <h1 className='p-600 text-xl'>Notifications</h1>
            <p className='p-400 text-gray-500 mt-1'>Here you can view notifications.</p>

            <div className='flex flex-col gap-4 border border-gray-300 rounded-md px-2 py-2 md:px-5 md:py-5 mt-6'>
                <div className='flex flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                    <div className='flex flex-col gap-1'>
                        <p className='p-400 text-gray-500 text-sm mb-2'>Date: 22-09-2023</p>
                        <p className='p-500 text-gray-500 mb-2'>Delivered!</p>
                        <h1 className='p-500 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi distinctio, aliquid maiores vero nobis eos nam quia odio soluta voluptates impedit sequi, voluptatibus adipisci iure eligendi natus! Ut, adipisci ducimus.</h1>
                    </div>
                </div>

                <div className='w-full border border-dashed mt-2 mb-2'></div>

                <div className='flex flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                    <div className='flex flex-col gap-1'>
                        <p className='p-400 text-gray-500 text-sm mb-2'>Date: 22-09-2023</p>
                        <p className='p-500 text-gray-500 mb-2'>Delivered!</p>
                        <h1 className='p-500 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi distinctio, aliquid maiores vero nobis eos nam quia odio soluta voluptates impedit sequi, voluptatibus adipisci iure eligendi natus! Ut, adipisci ducimus.</h1>
                    </div>
                </div>

                <div className='w-full border border-dashed mt-2 mb-2'></div>
            </div>
        </div>
    )
}

export default Notification