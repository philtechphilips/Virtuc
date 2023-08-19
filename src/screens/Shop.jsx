import React from 'react'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import Newsletter from '../components/User/Home/Newsletter'
import Footer from '../components/User/Home/Footer'
import Products from '../components/User/Shop/Product'

const Shop = () => {
    return (
        <>
            <CTA />
            <NavBar />
            <Products />
            <Newsletter />
            <Footer />
        </>
    )
}

export default Shop