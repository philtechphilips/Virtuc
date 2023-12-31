import React from 'react'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import Banner from '../components/User/Home/Banner'
import CustomerExperience from '../components/User/Home/CustomerExperience'
import '../styles/user/home.css'
import TrendingProducts from '../components/User/Home/TrendingProducts'
import AllProducts from '../components/User/Home/AllProducts'
import Footer from '../components/User/Home/Footer'
import Newsletter from '../components/User/Home/Newsletter'
import RecentlyViewed from '../components/User/Shop/RecentlyViewed'
import Featured from '../components/User/Home/FeaturedProducts'

const Home = () => {
    return (
        <div className=''>
            <CTA />
            <NavBar />
            <Banner />
            <CustomerExperience />
            <Featured />
            <TrendingProducts />
            <AllProducts />
            <RecentlyViewed />
            {/* <Newsletter /> */}
            <Footer />
        </div>
    )
}

export default Home