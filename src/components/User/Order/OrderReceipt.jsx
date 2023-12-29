import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const OrderReceipt = ({ payment, order, isSubmitting }) => {
    console.log(order)
    const date = new Date();
    return (
        <div className='flex py-5 px-4 items-center justify-center'>
            <div className='border-[2px] border-gray-100 px-5 py-10 w-[300] md:w-[600px]'>
                <div className='text-center'>
                    <i className="ri-check-line font-bold text-2xl text-green-600 border-[3px] border-green-600 rounded-full p-2 w-16 h-16"></i>
                </div>
                <h1 className='p-600 text-center text-lg pt-3 pb-1'>Thanks for your order!</h1>
                <p className='p-400 text-sm text-gray-500 text-center'>The order confirmation has been sent to your mail.</p>
                <div className='w-full border border-dashed mt-5'></div>
                <div className='pt-2'>
                    <h5 className='p-600'>Transaction Date</h5>
                    {isSubmitting ? (
                        <>
                        <Skeleton className='w-48 py-1'></Skeleton>
                        </>
                    ) : (
                        <>
                         {payment && payment.length > 0 && (
                        <p className='text-sm text-gray-400 mt-1'>{new Date(payment[0].paidDate).toDateString()}</p>
                    )}
                        </>
                    )}
                </div>

                <div className='w-full border border-dashed mt-5'></div>
                <div className='pt-2'>
                    <h5 className='p-600'>Delivery Method</h5>
                    <p className='text-sm text-gray-400 mt-1'>Pick-up Station</p>
                </div>
                <div className='w-full border border-dashed mt-5'></div>
                <div className='pt-2'>
                    <h5 className='p-600'>Your Order</h5>
                    {isSubmitting ? (
                        <>
                        <Skeleton className='w-full py-1 mb-[3px]'></Skeleton>
                        <Skeleton className='w-full py-1 mb-[3px]'></Skeleton>
                        <Skeleton className='w-full py-1 mb-[3px]'></Skeleton>
                        <Skeleton className='w-full py-1 mb-[3px]'></Skeleton>
                        </>
                    ) : (
                        <>
                    {order && order.length >> 0 && (
                      order.map((item, index) => (
                        <div className='flex justify-between pt-3' key={index}>
                        <div className='flex items-start'>
                            <img src={item.productId.images[0]} alt='product images' className='w-24 md:w-32 rounded-md'></img>
                            <div className='flex flex-col gap-1 md:gap-3 px-4'>
                                <h4 className='p-600 text-sm md:text-lg'>{item.productId.title}</h4>
                                <p className='p-600 text-[15px] text-gray-500'>{item.selectedColor}</p>
                                <p className='p-600 text-[15px] text-gray-600'>{item.cartQuantity} piece</p>
                            </div>
                        </div>
                        <h5 className='p-700 md:text-lg'>&#x20A6;{item.productId.price}</h5>
                    </div>
                      ))
                    )}
                    </>
                    )}
                </div>
                <div className='w-full border border-dashed mt-5'></div>
                {/* <div className='pt-2 flex items-center justify-between'>
                    <h5 className='p-600 text-gray-400'>Applied discount</h5>
                    <p className='text-sm text-gray-900 mt-1 px-4 py-2 bg-gray-200 rounded p-600'>20% OFF</p>
                </div>
                <div className='pt-2 flex items-center justify-between'>
                    <h5 className='p-600 text-gray-400'>Discount</h5>
                    <p className='text-sm text-gray-700 mt-1 p-600'>-&#x20A6;500.00(20% OFF)</p>
                </div>
                <div className='pt-2 flex items-center justify-between'>
                    <h5 className='p-600 text-gray-400'>Shipment Cost</h5>
                    <p className='text-sm text-gray-700 mt-1 p-600'>-&#x20A6;220.00</p>
                </div> */}
                {/* <div className='w-full border border-dashed mt-5'></div> */}
                <div className='pt-2 flex items-center justify-between'>
                    <h5 className='p-600 text-gray-800'>Amount Paid</h5>
                    {payment && payment.length > 0 && (
                        <p className='p-700'>&#x20A6;{payment[0].amount}</p>
                    )}
                </div>
                <Link to='/'>
                    <button className='w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded p-600 mt-4'>Continue Shopping</button>
                </Link>
                <Link to='/orders'>
                    <button className='w-full bg-white hover:bg-gray-100 text-gray-800 border-[2px] border-gray-800 py-3 rounded-lg p-600 mt-4'>Track Order</button>
                </Link>
            </div>
        </div>
    )
}

export default OrderReceipt