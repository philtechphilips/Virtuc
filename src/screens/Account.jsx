import React from 'react'
import UserAccount from '../components/User/Account/UserAccount'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import Footer from '../components/User/Home/Footer'

const Account = () => {
    return (
        <>
            <CTA />
            <NavBar />
            <UserAccount />
            <Footer />
        </>
    )
}

export default Account