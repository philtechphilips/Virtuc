import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={`h-8  bg-white flex justify-between items-center px-5 md:px-10 py-8 drop-shadow-sm mb-5 ${isFixed ? 'fixed w-full top-0 z-[1000]' : ''}`}>
            <Link to="/" className='logo text-2xl md:text-4xl text-gray-900'>NOSTRA</Link>

            <ul className="hidden md:flex justify-between gap-10 items-center">
                <li className="p-600 text-gray-800"><Link to="/shop">Shop</Link></li>
                <li className="p-600 text-gray-800"><Link to="/#">Most Wanted</Link></li>
                <li className="p-600 text-gray-800"><Link to="/#">New Arrival</Link></li>
                <li className="p-600 text-gray-800"><Link to="/#">Brands</Link></li>
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

                <div className="flex items-center gap-4">
                    <i className="ri-shopping-cart-2-line text-2xl"></i>
                    <i className="ri-user-3-line text-2xl"></i>
                </div>
            </div>
            <div className="flex items-center gap-4 md:hidden">
                <i className="ri-shopping-cart-2-line text-2xl"></i>
                <i className="ri-user-3-line text-2xl"></i>
            </div>
        </div>
    )
}

export default NavBar