import React from 'react'
import CartPage from '../components/User/Cart/CartPage'
import NavBar from '../components/User/Home/NavBar'
import CTA from '../components/User/Home/CTA'
import Footer from '../components/User/Home/Footer'

const Cart = () => {
    return (
        <>
            <CTA />
            <NavBar />
            <CartPage />
            <Footer />
        </>
    )
}

export default Cart