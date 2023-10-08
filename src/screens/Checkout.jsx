import React, { useEffect, useState } from 'react'
import CTA from '../components/User/Home/CTA'
import NavBar from '../components/User/Home/NavBar'
import Footer from '../components/User/Home/Footer'
import CheckoutContent from '../components/User/Checkout/CheckoutContent'
import useAuthContext from '../context/AuthContext'

const Checkout = () => {
    const { setCart, cart } = useAuthContext();

    const [initialPrice, setInitialPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(() => {
        calculateTotals();
    }, [cart]);

    
    const calculateTotals = () => {
        let newTotalPrice = 0;
        let newTotalDiscount = 0;
        let initialPrice = 0;

        cart.forEach(item => {
            const itemTotalPrice = item.price * item.cartQuantity;
            const itemTotalDiscount = item.discount * item.cartQuantity;

            
            newTotalPrice += itemTotalPrice;
            newTotalDiscount += itemTotalDiscount;
            initialPrice = newTotalPrice + newTotalDiscount;
        });
        console.log(newTotalPrice, newTotalDiscount)

        setInitialPrice(initialPrice)
        setTotalPrice(newTotalPrice);
        setTotalDiscount(newTotalDiscount);
    };
    return (
        <>
            <CTA />
            <NavBar />
            <CheckoutContent cart={cart} initialPrice={initialPrice} totalPrice={totalPrice} totalDiscount={totalDiscount} />
            <Footer />
        </>
    )
}

export default Checkout