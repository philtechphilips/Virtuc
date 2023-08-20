import React from 'react'

const DiscussionForm = () => {
    return (
        <>
            <form className='mt-24 flex flex-col p-4 border rounded-lg border-gray-200'>
                <textarea placeholder='Question/Topic' rows="5" className='p-4 outline-none border border-gray-200 rounded-lg'></textarea>
                <button className='w-fit bg-gray-700 hover:bg-gray-900 text-white px-5 py-2 mt-3 rounded-md p-500'>Start discussion</button>
            </form>
        </>
    )
}

export default DiscussionForm