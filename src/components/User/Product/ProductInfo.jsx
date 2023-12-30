import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Skeleton from 'react-loading-skeleton'
import useAuthContext from '../../../context/AuthContext'
import { useEffect } from 'react';
import apiService from '../../../api/apiRequests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ProductInfo = ({ product, loading }) => {
    const { setWishList, setCart, cart } = useAuthContext();
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

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
            const updatedWishlist = [...oldWishList, item];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishList(updatedWishlist)
        }
    }

    const addToCart = async (item) => {
        if (isItemInCart(cart, item._id)) return toast.error("Product already added to cart!")
        if (user) {
            setIsAddingToCart(true)
            try {
                if (color && size != "") {
                    const createdCart = await apiService.createCart(user.token, item._id, quantity, color, size);
                    const fetchedCart = await apiService.fetchCart(user.token);
                    const transformedCart = fetchedCart.data.payload.map(item => ({
                        ...item.productId,
                        cartQuantity: item.cartQuantity,
                        selectedColor: item.color,
                        selectedSize: item.sizes
                    }));

                    setCart(transformedCart);
                } else if (size !== "") {
                    const createdCart = await apiService.createCart(user.token, item._id, quantity, size);
                    const fetchedCart = await apiService.fetchCart(user.token);
                    const transformedCart = fetchedCart.data.payload.map(item => ({
                        ...item.productId,
                        cartQuantity: item.cartQuantity,
                        selectedColor: item.color,
                        selectedSize: item.sizes
                    }));

                    setCart(transformedCart);
                } else if (color !== "") {
                    const createdCart = await apiService.createCart(user.token, item._id, quantity, color);
                    const fetchedCart = await apiService.fetchCart(user.token);
                    const transformedCart = fetchedCart.data.payload.map(item => ({
                        ...item.productId,
                        cartQuantity: item.cartQuantity,
                        selectedColor: item.color,
                        selectedSize: item.sizes
                    }));

                    setCart(transformedCart);
                }
                const createdCart = await apiService.createCart(user.token, item._id, quantity);
                const fetchedCart = await apiService.fetchCart(user.token);
                const transformedCart = fetchedCart.data.payload.map(item => ({
                    ...item.productId,
                    cartQuantity: item.cartQuantity,
                    selectedColor: item.color,
                    selectedSize: item.sizes
                }));

                setCart(transformedCart);
            } catch (e) {
                console.log(e)
            } finally {
                setIsAddingToCart(false)
            }
        } else {
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
                        }} className='bg-gray-900 hover:bg-transparent hover:text-gray-900 border border-gray-900 text-white p-500 px-4 py-2 rounded-md disabled:cursor-not-allowed' disabled={isAddingToCart}>
                            {isAddingToCart ? (
                                <>
                                    <svg
                                        aria-hidden='true'
                                        className='w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600'
                                        viewBox='0 0 100 101'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="white"
                                        />
                                    </svg>
                                </>
                            ) : (
                                'Add to cart'
                            )}</button>
                        <button type='button' onClick={() => { addToWishlist(product) }} className='bg-transparent hover:bg-gray-900 border border-gray-900 text-gray-900 hover:text-white p-500 px-4 py-2 rounded-md'>Add to Wishlist</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default ProductInfo