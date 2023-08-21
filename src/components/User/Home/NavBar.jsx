import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [isAcountOpen, setIsAccountOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const showNavbar = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className={`h-8  bg-white flex justify-between items-center px-5 md:px-10 py-8  mb-5 z-[1000] ${isFixed ? 'fixed w-full top-0' : 'fixed top-8 w-full'}`}>
                <div className='md:hidden' onClick={showNavbar}>
                    <i className="text-2xl ri-menu-2-line"></i>
                </div>

                <Link to="/" className='logo text-xl md:text-2xl text-gray-800'>VirtuC</Link>

                <ul className="hidden md:flex justify-between gap-10 items-center">
                    <li className="p-500  text-gray-950 relative">
                        <Link className='pb-5 border-b-[3px] border-gray-950' to="/#">Categories</Link>
                        <ul className='absolute top-[45px] w-12 h-12 border bg-white shadow-sm z-[1000000]'>

                        </ul>
                    </li>
                    <li className="p-500  text-gray-700"><Link to="/shop">Shop</Link></li>
                    <li className="p-500  text-gray-700"><Link to="/#">Most Wanted</Link></li>
                    <li className="p-500  text-gray-700"><Link to="/#">New Arrival</Link></li>
                </ul>

                <div className="hidden md:flex items-center gap-10">
                    <form className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
                        <i className="ri-search-line text-lg text-gray-400 mr-1 cursor-pointer"></i>
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 bg-transparent border-none focus:outline-none p-400 w-60"
                        />
                    </form>

                    <div className="flex items-center gap-4 cursor-pointer">
                        <div className='relative'>
                            <i className="ri-shopping-cart-2-line text-2xl"></i>
                            <div className='absolute top-1 -right-1 flex h-2 w-2'>
                                <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </div>
                        </div>
                        <div className='flex w-full items-center gap-2 z-1000 bg-slate-200 rounded px-4 relative' onClick={() => setIsAccountOpen(!isAcountOpen)}>
                            <i className="ri-user-3-line text-xl"></i>
                            <div className='flex items-center'>
                                <p className='p-600'>Account</p>
                                <i className="ri-arrow-drop-down-line text-3xl"></i>
                            </div>

                            <div className={` absolute ${isAcountOpen ? 'flex flex-col' : 'hidden'} gap-4 px-3 py-5 rounded w-48 -mt-3 h-fit z-[1000000] -left-5 bg-white top-[60px]`} style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)" }}>
                                <div className='bg-gray-300 w-full rounded px-4 py-2 flex items-center justify-center shadow-sm shadow-zinc-400'>
                                    <Link className='p-600'>Sign In</Link>
                                </div>
                                <div className='border-b border-b-gray-300'></div>
                                <div className='flex flex-col'>
                                    <Link className='flex gap-3 items-center hover:bg-gray-100 p-2'>
                                        <i className="text-lg p-500 ri-user-line"></i>
                                        <p className='p-500 text-sm'>My Account</p>
                                    </Link>

                                    <Link className='flex gap-3 items-center hover:bg-gray-100 p-2'>
                                        <i className="text-lg ri-luggage-cart-line"></i>
                                        <p className='p-500 text-sm'>Orders</p>
                                    </Link>

                                    <Link className='flex gap-3 items-center hover:bg-gray-100 p-2'>
                                        <i className="text-lg ri-heart-line"></i>
                                        <p className='p-500 text-sm'>Saved Items</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:hidden">
                    <div className='relative'>
                        <i className="ri-shopping-cart-2-line text-2xl"></i>
                        <div className='absolute top-1 -right-1 flex h-2 w-2'>
                            <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </div>
                    </div>
                    <i className="ri-user-3-line text-2xl"></i>
                </div>
            </div>


            <div className={`md:hidden fixed top-0 left-0 w-[90%] min-h-full overflow-y-auto bg-white z-[10000] shadow ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-[-100vh]'}`}>
                <div className='flex gap-4 items-center p-5'>
                    <i className="ri-close-line text-3xl p-600" onClick={showNavbar}></i>
                    <h1 className='logo text-2xl'>Virtuc</h1>
                </div>
                <div className='w-full border border-dashed'></div>
                <div className='flex gap-4 flex-col p-5'>
                    <Link className='p-500 flex items-center justify-between'>
                        <p>My VirtuC Account</p>
                    </Link>
                    <Link className='p-500 flex items-center gap-3'>
                        <i className="ri-luggage-cart-line text-xl"></i>
                        <p>Orders</p>
                    </Link>

                    <Link className='p-500 flex items-center gap-3'>
                        <i className="ri-heart-line text-xl"></i>
                        <p>Saved Items</p>
                    </Link>

                    <Link className='p-500 flex items-center gap-3'>
                        <i className="ri-message-3-line text-xl"></i>
                        <p>Pending Review</p>
                    </Link>
                    <div className='w-full border border-dashed'></div>
                    <Link className='p-500 flex items-center justify-between'>
                        <p>Categories</p>
                    </Link>
                    <Link className='p-500 flex items-center gap-3'>
                        <i className="ri-smartphone-line text-xl"></i>
                        <p>Phones</p>
                    </Link>
                    <Link className='p-500 flex items-center gap-3'>
                        <i className="ri-home-line text-xl"></i>
                        <p> Home Appliances</p>
                    </Link>
                    <div className='w-full border border-dashed'></div>
                    <Link to="/auth/login" className='p-700 flex items-center justify-center py-3 rounded-lg gap-3 bg-gray-900 text-center text-white'>
                        Sign In
                    </Link>
                    <Link to="/auth/create-account" className='p-700 flex items-center justify-center py-3 rounded-lg gap-3 border-2 border-gray-900 text-center text-gray-900'>
                        Register
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NavBar