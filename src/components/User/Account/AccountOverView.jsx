import React from 'react'
import { Link } from 'react-router-dom'

const AccountOverView = () => {
    return (
        <>
            <div className='border mt-10 px-5 py-5 rounded-md'>
                <div className='flex flex-col gap-2 mb-10'>
                    <h1 className='p-700 text-gray-900 text-xl'> Account Overview</h1>
                    <p className='p-400'>Feel free to edit any of your details below so your account is up to date.</p>
                </div>

                <div className='flex flex-col gap-2 mb-5'>
                    <h1 className='p-700 text-gray-900 text-xl'>Details</h1>
                    <p className='p-400 uppercase text-[15px]'>Isola Pelumi Philip</p>
                    <p className='p-400 uppercase text-[15px]'>pelumiisola87@gmail.com</p>
                    <p className='p-400 uppercase text-[15px]'>Male</p>
                    <p className='p-400 uppercase text-[15px]'>1993-09-03</p>
                    <p className='p-400 uppercase text-[15px]'>pelumiisola87@gmail.com</p>
                    <Link className='p-600 uppercase underline text-gray-950 text-[15px] hover:bg-gray-900 hover:text-white w-fit'>EDIT</Link>
                </div>

                <div className='flex flex-col gap-2 mb-5'>
                    <h1 className='p-700 text-gray-900 text-xl'>Address</h1>
                    <p className='p-400 uppercase text-[15px]'>1, Olayiwola Olajide Street, Abaranje Road, Ikotun Lagos.</p>
                </div>

                <div className='flex flex-col gap-2 mb-5'>
                    <h1 className='p-700 text-gray-900 text-xl'>Logout</h1>
                    <p className='p-400 text-[15px]'>This will log you out from all web browsers you have used to access the adidas website. To log in again, you'll have to enter your credentials.</p>
                    <Link className='p-600 flex justify-between border border-gray-900 py-2 uppercase px-4 w-48 text-gray-950 text-[15px] hover:bg-gray-900 hover:text-white'>
                        <p className='p-600 text-[15px] uppercase '>LOG ME OUT</p>
                        <i className="ri-arrow-right-line"></i>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AccountOverView