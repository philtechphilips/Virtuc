import React, { useEffect, useState } from 'react'
import useAuthContext from '../../../context/AuthContext';
import CheckoutComponent from './CheckoutComponent';
import CartItems from './CartItems';
import apiService from '../../../api/apiRequests';

const CartPage = () => {
    const { setCart, cart, discountCodePercentage } = useAuthContext();

    const [initialPrice, setInitialPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(discountCodePercentage)
    useEffect(() => {
        calculateTotals();
        increaseQuantity();
        decreaseQuantity();
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
        if(discountCodePercentage){
            const discountCodeTotalPrice = (discountCodePercentage/100) * newTotalPrice;
            newTotalPrice -= discountCodeTotalPrice;
            const discountCodeTotalDiscount = (discountCodePercentage/100) * newTotalPrice;
            newTotalDiscount += discountCodeTotalPrice;
         }
        setInitialPrice(initialPrice)
        setTotalPrice(newTotalPrice);
        setTotalDiscount(newTotalDiscount);
    };


    const removeCartItem = async (cartItem) => {
        if (user) {
            try {
                const deleteCart = await apiService.deleteCart(user.token, cartItem._id);
                const fetchedCart = await apiService.fetchCart(user.token);
                const transformedCart = fetchedCart.data.payload.map(item => ({
                    ...item.productId,
                    cartQuantity: item.cartQuantity,
                    selectedColor: item.color,
                    selectedSize: item.sizes
                }));

                setCart(transformedCart);
            } catch (e) {
                console.log(e)
            }
            setCart(newCartItems)
            return true;
        }
        let newCartItems = cart.filter(item => item._id !== cartItem._id);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        setCart(newCartItems)
    }

    const removeCart = async () => {
        if (user) {
            try {
                const deleteCart = await apiService.deleteUserCart(user.token);
                const fetchedCart = await apiService.fetchCart(user.token);
                const transformedCart = fetchedCart.data.payload.map(item => ({
                    ...item.productId,
                    cartQuantity: item.cartQuantity,
                    selectedColor: item.color,
                    selectedSize: item.sizes
                }));

                setCart(transformedCart);
            } catch (e) {
                console.log(e)
            }
            setCart(newCartItems)
            return true;
        }
        localStorage.removeItem("cart")
        setCart([])
    }

    const increaseQuantity = async (itemId) => {
        if (user) {
            try {
                let newCartItems = cart.filter(item => item._id === itemId);
                let cartQuantity = newCartItems[0].cartQuantity += 1;
                const updateCart = await apiService.updateCart(user.token, itemId, cartQuantity);
                const fetchedCart = await apiService.fetchCart(user.token);
                const transformedCart = fetchedCart.data.payload.map(item => ({
                    ...item.productId,
                    cartQuantity: item.cartQuantity,
                    selectedColor: item.color,
                    selectedSize: item.sizes
                }));

                setCart(transformedCart);
                console.log(updateCart)
            } catch (e) {
                console.log(e)
            }
            return true
        }
        const updatedCart = [...cart]; // Create a new copy of the cart array
        const itemIndex = updatedCart.findIndex((item) => item._id === itemId);
        if (itemIndex !== -1) {
            updatedCart[itemIndex].cartQuantity += 1;
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    }

    const decreaseQuantity = async (itemId) => {
        let cartQuantity;
        if (user) {
            try {
                let newCartItems = cart.filter(item => item._id === itemId);
                if (newCartItems[0].cartQuantity && newCartItems[0].cartQuantity > 1) {
                    cartQuantity = newCartItems[0].cartQuantity -= 1;
                }
                const updateCart = await apiService.updateCart(user.token, itemId, cartQuantity);
                const fetchedCart = await apiService.fetchCart(user.token);
                const transformedCart = fetchedCart.data.payload.map(item => ({
                    ...item.productId,
                    cartQuantity: item.cartQuantity,
                    selectedColor: item.color,
                    selectedSize: item.sizes
                }));

                setCart(transformedCart);
                console.log(updateCart)
            } catch (e) {
                console.log(e)
            }
            return true
        }
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((item) => item._id === itemId);
        if (itemIndex !== -1 && updatedCart[itemIndex].cartQuantity > 1) {
            updatedCart[itemIndex].cartQuantity -= 1;
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    }

    return (
        <>
            <div className='flex flex-col md:flex-row gap-10 items-start p-5 md:p-10'>

                <CartItems cart={cart} removeCartItem={removeCartItem} removeCart={removeCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
                {cart && cart.length > 0 && (
                    <CheckoutComponent initialPrice={initialPrice} totalPrice={totalPrice} totalDiscount={totalDiscount} />
                )}
            </div>
        </>
    )
}

export default CartPage