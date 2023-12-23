import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center gap-4 bg-gray-100 px-10'>
      <h1 className='text-6xl font-bold'>404</h1>
      <p>Page Not Found!</p>
      <p className='text-center'>Seems the page you are looking for cannot be found <Link to="/" className='text-blue-500 font-bold'>Return Home</Link></p>
    </div>
  )
}

export default PageNotFound