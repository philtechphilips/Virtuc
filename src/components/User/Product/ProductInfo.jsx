import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Skeleton from 'react-loading-skeleton'
import useAuthContext from '../../../context/AuthContext'
import { useEffect } from 'react';

const ProductInfo = ({ product, loading }) => {
    const { setWishList, setCart } = useAuthContext();
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const isItemInWishlist = (recentlyViewed, itemId) => {
        return recentlyViewed.some((item) => item._id === itemId);
    }

    const isItemInCart = (cartItems, itemId) => {
        return cartItems.some((item) => item._id === itemId);
    }

    const addToWishlist = (item) => {
        const oldWishList = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!isItemInWishlist(oldWishList, item._id)) {
            // Item is not in wishlist, add it
            const updatedWishlist = [...oldWishList, item];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishList(updatedWishlist)
        }
    }

    const addToCart = (item) => {
        let cartDetails = { ...item, cartQuantity: quantity, selectedColor: color, selectedSize: size }
        console.log(cartDetails);
        const oldCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!isItemInCart(oldCart, item._id)) {
            // Item is not in cart, add it
            const updatedCart = [...oldCart, cartDetails];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart)
        }
    }
    return (
        <>
            <div className='flex flex-col md:flex-row w-full gap-10 mt-3'>
                <div className='hidden md:flex flex-col gap-4 w-24'>
                    {product && product.images &&
                        product.images.map((item, index) => (
                            <img src={item} className='w-full rounded-lg' alt='product image' key={index}></img>
                        ))
                    }
                </div>
                <div className='flex flex-col w-full md:w-96'>
                    {loading ? <Skeleton className='py-40 rounded-lg' /> : (
                        <Swiper loop={true} spaceBetween={10} navigation={true} modules={[Navigation]} grabCursor={true} className='w-full product-images-slider-thumbs'>
                            {product && product.images &&
                                product.images.map((item, index) => (
                                    <SwiperSlide key={index} className='w-full'>
                                        <img src={item} className='w-full rounded-lg' alt='product image'></img>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    )}

                </div>
                <form className='flex flex-col w-full md:w-1/2 mt-2'>
                    <div className='flex justify-between'>
                        {loading ? <Skeleton className='px-8 py-[1px]' /> : product
                            && product.categoryType
                            ? (
                                <p className='p-400'>{product.categoryType}</p>
                            ) :
                            " "}
                        <i className="text-[#F59E0B] text-2xl text-right ri-heart-add-line"></i>
                    </div>
                    {loading ? <Skeleton className='w-full py-[3px]' /> : product
                        && product.title
                        ? (
                            <h1 className='p-600 text-2xl'>{product.title}</h1>
                        ) :
                        " "}
                    <div className='flex gap-2 mt-3'>
                        <i className="text-[#F59E0B] text-lg ri-star-fill"></i>
                        <i className="text-[#F59E0B] text-lg ri-star-fill"></i>
                        <i className="text-[#F59E0B] text-lg ri-star-fill"></i>
                        <i className="text-[#F59E0B] text-lg ri-star-fill"></i>
                        <i className="text-[#F59E0B] text-lg ri-star-half-line"></i>
                    </div>
                    <div className='flex gap-2 items-end mt-2'>
                        {loading ? <Skeleton className='w-10 py-[2px]' /> : product
                            && product.price
                            ? (
                                <h1 className='p-700 text-2xl font-bold'>{product.price.toLocaleString('en-NG', {
                                    style: 'currency',
                                    currency: 'NGN',
                                })}</h1>
                            ) :
                            " "}
                        {loading ? <Skeleton className='w-10 py-[2px]' /> : product
                            && product.discount
                            ? (
                                <h1 className='p-400 text-sm line-through'>{product.discount.toLocaleString('en-NG', {
                                    style: 'currency',
                                    currency: 'NGN',
                                })}</h1>
                            ) :
                            " "}
                        {loading ? <Skeleton className='w-4 py-[2px]' /> : product
                            && product.discountInPercentage
                            ? (
                                <div className='bg-[#ffe1ad] w-fit px-2 py-1 mt-3 ml-2 text-sm p-600 rounded'>
                                    -{Math.ceil(product.discountInPercentage)}%
                                </div>
                            ) :
                            " "}

                    </div>

                    <div className='w-full border border-dashed mt-5 mb-5'></div>

                    <div className='flex gap-4 flex-col md:flex-row'>
                        <div className='w-full md:w-1/2'>
                            {loading ? <Skeleton className='py-4' /> : (
                                <>
                                    {product.sizes && product.sizes.length > 0 &&
                                        (
                                            <>
                                                <h1 className='p-500'>Avaliable Size</h1>
                                                <select
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                    className='w-full p-400 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm'>
                                                    <option defaultValue="" disabled>Select a size</option>
                                                    {product
                                                        && product.sizes && product.sizes.map((item, index) => (
                                                            <>
                                                                {item.quantity > 0 && (
                                                                    <option key={index}>{item.size}</option>
                                                                )}
                                                            </>

                                                        ))}
                                                </select>
                                            </>
                                        )

                                    }
                                </>
                            )}

                        </div>
                        <div className='w-full md:w-1/2'>
                            {loading ? <Skeleton className='py-4' /> : (
                                <>
                                    {product.colors && product.colors.length > 0 &&
                                        (
                                            <>
                                                <h1 className='p-500'>Avaliable Color</h1>
                                                <select
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}
                                                    className='w-full p-400 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm'
                                                >
                                                    <option value="" disabled>Select a color</option>
                                                    {product &&
                                                        product.colors &&
                                                        product.colors.map((item, index) => (
                                                            <option key={index} value={item.color} disabled={item.quantity === 0}>
                                                                {item.color}
                                                            </option>
                                                        ))}
                                                </select>

                                            </>
                                        )

                                    }
                                </>
                            )}
                        </div>
                    </div>

                    <div className='w-full border border-dashed mt-5 mb-5'></div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className="flex">
                            <button type='button'
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={handleDecrease}
                            >
                                -
                            </button>
                            <div className="bg-gray-100 text-gray-800 px-4 py-2">
                                {quantity}
                            </div>
                            <button type='button'
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                onClick={handleIncrease}
                            >
                                +
                            </button>
                        </div>
                        <button type='submit' onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }} className='bg-gray-900 hover:bg-transparent hover:text-gray-900 border border-gray-900 text-white p-500 px-4 py-2 rounded-md'>Add to cart</button>
                        <button type='button' onClick={() => { addToWishlist(product) }} className='bg-transparent hover:bg-gray-900 border border-gray-900 text-gray-900 hover:text-white p-500 px-4 py-2 rounded-md'>Add to Wishlist</button>
                    </div>
                </form>
            </div>


            
        </>
    )
}

export default ProductInfo