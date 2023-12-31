import React from 'react'
import ProductDiscussion from '../Product/Cards/ProductDiscussion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import AccountOverView from './AccountOverView'
import apiService from '../../../api/apiRequests'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import OrderHistory from './OrderHistory'
import Wishlist from './Wishlist'
import PendingReview from './PendingReview'
import Notification from './Notification'
import { ToastContainer, toast } from 'react-toastify'
import useAuthContext from '../../../context/AuthContext'

const UserAccount = () => {
    const [section, setSection] = useState("overview");

    const [user, setUser] = useState(null);
    const savedUser = JSON.parse(localStorage.getItem('user'))
    const [isLoading, setIsLoading] = useState(true)
    const { logout } = useAuthContext;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await apiService.fetchAuthUser(savedUser);
                setUser(response.data.payload)
            } catch (error) {
                if (error.response.data.statusCode === 401) {
                    await toast.error("Session expired kindly login!");
                    logout();
                }
                toast.error("Something went wrong!");
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserProfile()
    }, []);

    const handleSectionChange = (newSection) => {
        setSection(newSection);
    };
    return (
        <div className='px-5 md:px-10'>
            <div className='py-20'>
                <div className='flex flex-col-reverse pl-5 py-10 border' >
                    <div className='flex flex-col px-3'>
                        <h1 className='p-700 text-2xl uppercase w-40'><span>{isLoading ? <Skeleton /> : `HI ${user.first_name}`}</span></h1>
                        <p className='p-500 text-sm w-40'>
                            {isLoading ? (
                                <Skeleton />
                            ) : (
                                `${user?.phone_number || ''}`
                            )}
                        </p>

                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <Swiper loop={true} spaceBetween={10} breakpoints={{
                    320: {
                        slidesPerView: 1.5,
                        spaceBetween: 0,
                    }, 640: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                    }, 1000: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                }} className='flex items-center'>
                    <SwiperSlide
                        className={`cursor-pointer flex w-1/3 justify-center pb-5 border-b-[3px] transition duration-950 ease-out ${section === 'overview' ? 'border-gray-800' : ''}`}
                        onClick={() => handleSectionChange('overview')}
                    >
                        <h1 className={`p-500 text-gray-600 md:text-lg text-center transition duration-950 ease-out ${section === 'overview' ? 'text-gray-800 p-700' : ''}`}>Account</h1>
                    </SwiperSlide>

                    <SwiperSlide
                        className={`cursor-pointer flex gap-2 justify-center pb-5 w-1/3 border-b-[3px] ${section === 'orderHistory' ? 'border-gray-800' : ''}`}
                        onClick={() => handleSectionChange('orderHistory')}
                    >
                        <h1 className={`p-500 text-gray-600 md:text-lg text-center ${section === 'orderHistory' ? 'text-gray-800 p-700' : ''}`}>Order History</h1>
                    </SwiperSlide>

                    <SwiperSlide
                        className={`cursor-pointer flex w-1/3 justify-center pb-5 gap-2 border-b-[3px] ${section === 'wishlist' ? 'border-gray-800' : ''}`}
                        onClick={() => handleSectionChange('wishlist')}
                    >
                        <h1 className={`p-500 text-gray-600 md:text-lg text-center ${section === 'wishlist' ? 'text-gray-800 p-700' : ''}`}>Saved Items</h1>
                    </SwiperSlide>

                    <SwiperSlide
                        className={`cursor-pointer flex w-1/3 justify-center pb-5 gap-2 border-b-[3px] ${section === 'review' ? 'border-gray-800' : ''}`}
                        onClick={() => handleSectionChange('review')}
                    >
                        <h1 className={`p-500 text-gray-600 md:text-lg text-center ${section === 'review' ? 'text-gray-800 p-700' : ''}`}>Pending Reviews</h1>
                    </SwiperSlide>

                    <SwiperSlide
                        className={`cursor-pointer flex w-1/3 justify-center pb-5 gap-2 border-b-[3px] ${section === 'notification' ? 'border-gray-800' : ''}`}
                        onClick={() => handleSectionChange('notification')}
                    >
                        <h1 className={`p-500 text-gray-600 md:text-lg text-center ${section === 'notification' ? 'text-gray-800 p-700' : ''}`}>Notifications</h1>
                    </SwiperSlide>

                </Swiper>

                {/* Conditionally render section content based on the URL */}
                {section === 'overview' && (
                    <AccountOverView isLoading={isLoading} userProfile={user} />
                )}
                {section === 'orderHistory' && (
                    <div className='mt-5 p-2 md:p-4 border rounded'>
                        <OrderHistory />
                    </div>
                )}
                {section === 'wishlist' && (
                    <div className='mt-5 p-4'>
                        <Wishlist />
                    </div>
                )}
                {section === 'review' && (
                    <div className='mt-5 p-4'>
                        <PendingReview />
                    </div>
                )}
                {section === 'notification' && (
                    <div className='mt-5 p-4'>
                        <Notification />
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserAccount