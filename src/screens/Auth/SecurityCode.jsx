import React from 'react';
import { Link } from 'react-router-dom';

const SecurityCode = () => {
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center min-h-screen'>
                <div className='flex items-center flex-col mb-7 gap-2 w-[340px] md:w-[400px] px-1 text-sm'>
                    <h1 className='p-700 text-xl'>Security code to reset password</h1>
                    <p className='p-500 text-gray-500 text-center'>Insert the security code sent to your email in order to proceed with the password reset.</p>
                </div>
                <form className="w-[340px] md:w-[400px]">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 flex gap-4">
                            <input maxLength="1" className="text-3xl p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                            <input className="text-3xl p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                            <input className="text-3xl p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                            <input className="text-3xl p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                        </div>
                        <div className="w-full my-3 px-3">
                            <button className='bg-gray-700 hover:bg-gray-900 text-white p-700 w-full rounded py-3'>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                <div className='flex items-center -mt-5 flex-col gap-2 w-[340px] md:w-[400px] px-1'>
                    <Link to="/forgot-password" className='p-700'>Request a New Code</Link>
                </div>
                <div className='flex items-center flex-col mt-7 gap-2 w-[340px] md:w-[400px] px-1 text-sm'>
                    <p className='p-500 text-gray-500 text-center'>For further support, you may visit the Help Center or contact our customer service team.</p>
                    <h1 className='p-700 text-xl'>Nostra</h1>
                </div>
            </div>
        </>
    )
}

export default SecurityCode