import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import apiService from '../../../api/apiRequests';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import useAuthContext from '../../../context/AuthContext';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useAuthContext;

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true)
           try{
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await apiService.fetchOrder(user.token);
            setOrders(response.data.payload);
            console.log(response.data.payload);
           }catch(e){
            if (e.response.data.statusCode === 401) {
                await toast.error("Session expired kindly login!");
                logout();
            }
            toast.error("Something went wrong!");
           }finally{
            setIsLoading(false)
           }
        }
        fetchOrders()
    }, [])
    return (
        <div className='p-1 md:px-2 md:py-2'>
            <h1 className='p-600 text-xl'>Order History</h1>
            <p className='p-400 text-gray-500 mt-1 mb-10'>Here you can manage your orders.</p>

            <div className='flex flex-col gap-4 border border-gray-300 rounded-md px-2 py-2 md:px-3 md:py-3'>
                {isLoading ? (
                    <>
                    <Skeleton className='h-10' />
                    <Skeleton className='h-10'  />
                    <Skeleton className='h-10'  />
                    </>
                ): (
                    <>
                    {orders && orders.length > 0 ? (
                        orders.map((item, index) => (
                         <div key={index} className='flex flex-col md:flex-row pb-5 border-dashed border-b-2 item-center justify-between border-gray-300 rounded-md'>
                         <div className='flex md:flex-row gap-4'>
                             <img className='w-20 md:w-28' src={item.productId.images[0]} />
                             <div className='flex flex-col gap-1'>
                                 <h1 className='p-500 text-sm'>{item.productId.title}</h1>
                                 <p className='p-400 text-gray-500 text-sm'>Order No: {item.orderId}</p>
                                 {item.color && (
                                     <p className='p-400 text-gray-900 text-sm'>Color: {item.color}</p>
                                 )}
                                  {item.color && (
                                     <p className='p-400 text-gray-900 text-sm'>Size: {item.size}</p>
                                 )}
                                 <p className='p-400 text-white p-1 rounded text-xs bg-green-600 w-fit'>{item.orderStatus}</p>
                             </div>
                         </div>
                     </div>
                        ))
                     ) : (
                         <p className='text-sm text-red-600 font-bold'>No Order Placed Yet</p>
                     )}
                     </>
                )}
                

            </div>
        </div>
    )
}

export default OrderHistory