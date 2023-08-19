import React from 'react'
import NavBar from '../components/User/Home/NavBar'
import CTA from '../components/User/Home/CTA'
import Footer from '../components/User/Home/Footer'
import PaymentContent from '../components/User/Checkout/PaymentContent'

const Payment = () => {
  return (
    <>
    <CTA />
    <NavBar />
    <PaymentContent />
    <Footer />
    </>
  )
}

export default Payment