import { useState } from 'react'
import ReactModal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify';
import apiService from '../../../api/apiRequests';


const OrderDetails = ({ order, isModalOpen, setIsViewOrderDetails }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newOrderStatus, setnewOrderStatus] = useState("");

    const closeModal = () => {
        setIsViewOrderDetails(false)
    }

    return (
        <div>
            <ReactModal isOpen={isModalOpen} className="z-40 mx-auto md:w-[500px] w-full relative bg-white border shadow-md mt-20 py-10 outline-none">
                <div className='px-10 flex flex-col gap-2'>
                    <h4 className='text-sm'>Order Id: {order && order.orderId}</h4>
                    <h4 className='text-sm'>Payment Reference: {order && order.paymentReference}</h4>
                    <h4 className='text-sm'>Customer Name: {order && order.userId.first_name + ' ' + order.userId.last_name}</h4>
                    <h4 className='text-sm'>Customer Email Address: {order && order.userId.email}</h4>
                    <h4 className='text-sm'>Customer Home Address: {order && order.userId.home_address}</h4>
                    <h4 className='text-sm'>City: {order && order.userId.city}</h4>
                    <h4 className='text-sm'>Region: {order && order.userId.region}</h4>
                    <h4 className='text-sm'>Customer&apos;s Phone: {order && order.userId.phone_number}</h4>
                    <h4 className='text-sm'>Product Name: {order && order.productId && order.productId.title}</h4>
                    <h4 className='text-sm'>Product Price: {order && order.productId && order.productId.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</h4>
                    <h4 className='text-sm'>Selected Price: {order && order.color}</h4>
                    <h4 className='text-sm'>Selected Color: {order && order.size}</h4>
                    <h4 className='text-sm'>Quantity: {order && order.quantity}</h4>
                </div>
                <i className="ri-close-line text-black absolute top-6 right-5 text-2xl cursor-pointer p-2 border rounded bg-slate-50" onClick={closeModal}></i>
            </ReactModal>
            <ToastContainer />
        </div>
    )
}

export default OrderDetails
