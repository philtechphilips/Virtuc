import React, { useEffect, useState } from 'react'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import Footer from '../components/User/Home/Footer'
import OrderReceipt from '../components/User/Order/OrderReceipt'
import apiService from '../api/apiRequests'
import { useParams } from 'react-router-dom'

const OrderComplete = () => {
  const [payment, setPayment] = useState([]);
  const [order, setOrder] = useState([]);
  const { txRef } =  useParams();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
      const fetchData = async () => {
        try{
          const fetchedPayment = await apiService.fetchPaymentByTxRef(user.token, txRef);
          const fetchedOrder = await apiService.fetchOrderByTxRef(user.token, txRef); 
          setOrder(fetchedOrder.data.payload)
          setPayment(fetchedPayment.data.payload)
        }catch(e){

        }
        
      }
      fetchData()
  }, []) 
  return (
    <>
    <CTA />
    <NavBar />
    <OrderReceipt payment={payment} order={order} />
    <Footer />
    </>
  )
}

export default OrderComplete