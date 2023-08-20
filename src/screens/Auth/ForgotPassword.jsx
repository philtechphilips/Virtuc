import React from 'react'

const ForgotPassword = () => {
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center min-h-screen'>
                <div className='flex items-center flex-col mb-7 gap-2 w-[340px] md:w-[400px] px-1 text-sm'>
                    <h1 className='p-700 text-xl'>Recover your password</h1>
                    <p className='p-500 text-gray-500 text-center'>You can request a password reset below. We will send a security code to the email address, please make sure it is correct.</p>
                </div>
                <form className="w-[340px] md:w-[400px]">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 relative">
                            <label className="p-700 block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="grid-password">
                                E-mail Address
                            </label>
                            <input className="p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" disabled value="pelumiisola87@gmail.com" />
                            <span
                                className="absolute top-9 right-5 p-600 px-2 text-sm py-1 text-red-500 cursor-pointer"
                                onClick={() => { }}>
                                Edit
                            </span>
                        </div>
                        <div className="w-full my-3 px-3">
                            <button className='bg-gray-700 hover:bg-gray-900 text-white p-700 w-full rounded py-3'>
                                Request Password Reset
                            </button>
                        </div>
                    </div>
                </form>
               
                <div className='flex items-center flex-col mt-7 gap-2 w-[340px] md:w-[400px] px-1 text-sm'>
                    <p className='p-500 text-gray-500 text-center'>For further support, you may visit the Help Center or contact our customer service team.</p>
                    <h1 className='p-700 text-xl'>Nostra</h1>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword