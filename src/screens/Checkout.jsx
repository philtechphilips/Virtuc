import React from 'react'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import Footer from '../components/User/Home/Footer'
import CheckoutContent from '../components/Checkout/CheckoutContent'

const Checkout = () => {
    return (
        <>
            <CTA />
            <NavBar />
            <CheckoutContent />
            <Footer />
        </>
    )
}

export default Checkout