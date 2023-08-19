import React from 'react'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import Footer from '../components/User/Home/Footer'
import OrderReceipt from '../components/User/Order/OrderReceipt'

const OrderComplete = () => {
  return (
    <>
    <CTA />
    <NavBar />
    <OrderReceipt />
    <Footer />
    </>
  )
}

export default OrderComplete