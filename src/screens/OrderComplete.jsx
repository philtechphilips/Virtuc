import React, { useEffect, useState } from 'react'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import Footer from '../components/User/Home/Footer'
import OrderReceipt from '../components/User/Order/OrderReceipt'
import apiService from '../api/apiRequests'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import useAuthContext from '../context/AuthContext'

const OrderComplete = () => {
  const [payment, setPayment] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [order, setOrder] = useState([]);
  const { txRef } = useParams();
  const { logout } = useAuthContext;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      setIsSubmitting(true)
      try {
        const fetchedPayment = await apiService.fetchPaymentByTxRef(user.token, txRef);
        const fetchedOrder = await apiService.fetchOrderByTxRef(user.token, txRef);
        setOrder(fetchedOrder.data.payload)
        setPayment(fetchedPayment.data.payload)
      } catch (e) {
        if (e.response.data.statusCode === 401) {
          toast.error("Session expired kindly login!");
          logout();
        }
        toast.error("Something went wrong!");
      }finally{
        setIsSubmitting(false);
      }

    }
    fetchData()
  }, [])
  return (
    <>
      <CTA />
      <NavBar />
      <OrderReceipt payment={payment} order={order} isSubmitting={isSubmitting} />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default OrderComplete