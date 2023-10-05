import React from 'react'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import RecentlyViewed from '../components/User/Shop/RecentlyViewed'
import Footer from '../components/User/Home/Footer'
import Products from '../components/User/Shop/Product'

const Shop = () => {
    return (
        <>
            <CTA />
            <NavBar />
            <Products />
            <RecentlyViewed />
            <Footer />
        </>
    )
}

export default Shop