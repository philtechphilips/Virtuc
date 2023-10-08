import React, { useEffect, useState } from 'react'
import useAuthContext from '../../../context/AuthContext';
import CheckoutComponent from './CheckoutComponent';
import CartItems from './CartItems';

const CartPage = () => {
    const { setCart, cart } = useAuthContext();
    const [quantity, setQuantity] = useState();

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
  
        initialPrice = itemTotalPrice + itemTotalDiscount;
        newTotalPrice += itemTotalPrice;
        newTotalDiscount += itemTotalDiscount;
      });
      console.log(newTotalPrice, newTotalDiscount)
  
      setInitialPrice(initialPrice)
      setTotalPrice(newTotalPrice);
      setTotalDiscount(newTotalDiscount);
    };
  

    const removeCartItem = (cartItem) => {
        let newCartItems = cart.filter(item => item._id !== cartItem._id);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        setCart(newCartItems)
    }

    const removeCart = () => {
        localStorage.removeItem("cart")
        setCart([])
    }


    return (
        <>
            <div className='flex flex-col md:flex-row gap-10 items-start p-5 md:p-10'>
                
                <CartItems cart={cart} removeCartItem={removeCartItem} removeCart={removeCart} />
                {cart && cart.length > 0 && (
                    <CheckoutComponent initialPrice={initialPrice} totalPrice={totalPrice} totalDiscount={totalDiscount} />
                )}
            </div>
        </>
    )
}

export default CartPage