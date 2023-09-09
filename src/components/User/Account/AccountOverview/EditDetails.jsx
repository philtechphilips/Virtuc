import React from 'react'

const EditDetails = ({open, onClose}) => {
    if(!open) return null
    return (
        <>
        <div className='fixed top-20 right-[5%] md:right-[25%] w-[340px] md:w-[600px] h-[550px] md:h-[500px] bg-white z-[1000] overflow-auto px-5 py-5'>
            <h1 className='p-700 text-xl'>EDIT YOUR DETAILS</h1>
            <form className='w-full flex flex-col gap-4 py-5'>
                <div className='w-full flex flex-col gap-2'>
                    <label className='p-500'>First name</label>
                    <input type='text' className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' placeholder='Enter your name' />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label className='p-500'>Last name</label>
                    <input type='text' className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' placeholder='Enter your name' />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label className='p-500'>Phone</label>
                    <input type='phone' className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' placeholder='Enter your Phone' />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label className='p-500'>D.O.B</label>
                    <input type='date' className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' placeholder='Enter your Date of Birth' />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label className='p-500'>GENDER</label>
                    <div className='flex gap-4'>
                        <div className='flex items-center gap-2'>
                            <input type='radio' name='gender' className='text-black checked:before:bg-black focus:ring-black w-5 h-5' />
                            <p className='p-400'>Male</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='radio' name='gender' className='text-black checked:before:bg-black focus:ring-black w-5 h-5' />
                            <p className='p-400'>Feale</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='radio' name='gender' className='text-black checked:before:bg-black focus:ring-black w-5 h-5' />
                            <p className='p-400'>Others</p>
                        </div>
                    </div>
                </div>

                <button className='p-600 flex justify-between border border-gray-900 py-3 uppercase px-4 w-full text-gray-950 text-[15px] hover:bg-gray-900 hover:text-white'>
                    <p className='p-600 text-[15px] uppercase '>UPDATE DETAILS</p>
                    <i className="ri-arrow-right-line"></i>
                </button>
            </form>
            
           
        </div>
         <button type='button' onClick={onClose} className='fixed top-16 right-[1%] md:right-[24%] h-12 w-12 bg-white flex items-center justify-center border border-black z-[10000]'>
         <i class="ri-close-line text-3xl"></i>
     </button> 
     </>
    ) 
}

export default EditDetails