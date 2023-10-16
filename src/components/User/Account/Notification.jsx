import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import apiService from '../../../api/apiRequests';
import Skeleton from 'react-loading-skeleton';

const Notification = () => {
    const [Notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true)
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await apiService.fetchNotifications(user.token)
                setNotifications(response.data.payload);
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchNotifications()
    }, [])
    return (
        <div className='p-1 md:px-2 md:py-2'>
            <h1 className='p-600 text-xl'>Notifications</h1>
            <p className='p-400 text-gray-500 mt-1'>Here you can view Notifications.</p>

            <div className='flex flex-col gap-4 border border-gray-300 rounded-md px-2 py-2 md:px-5 md:py-5 mt-6'>
                {isLoading ? (
                    <>
                        <Skeleton className='h-5' />
                        <Skeleton className='h-5' />
                        <Skeleton className='h-5' />
                    </>
                ) : (
                    <>
                        {
                            Notifications && Notifications.length > 0 ? (
                                <>
                                    {
                                        Notifications.map((item, index) => (
                                            <div key={index} className='border-b border-dashed pb-5 flex flex-col md:flex-row item-center justify-between border-gray-300 rounded-md'>
                                                <div className='flex flex-col gap-1'>
                                                    <p className='p-400 text-gray-500 text-sm mb-2'>{new Date(item.createdAt).toLocaleDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString()}</p>
                                                    <p className='p-500 text-gray-500 mb-2'>{item.title}</p>
                                                    <h1 className='p-500 text-sm'>{item.notification}</h1>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            ) : (
                                <p className='text-sm font-bold text-red-600'>No Notification Yet!</p>
                            )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Notification