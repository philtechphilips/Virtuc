import React, { useEffect, useState } from 'react'
import apiService from '../../../api/apiRequests'
import useAuthContext from '../../../context/AuthContext';
import { usePaystackPayment } from 'react-paystack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const CheckoutContent = ({ cart, initialPrice, totalPrice, totalDiscount }) => {
  const [userdetails, setuserDetails] = useState();
  const [homeAddress, setHomeAddress] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [discountCode, setDiscountCode] = useState()
  const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);
  const { setDiscountCodePercentage, discountCodePercentage } = useAuthContext()

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiService.fetchAuthUser({ token });
        setuserDetails(response.data.payload)
        setHomeAddress(response.data.payload.home_address);
        setRegion(response.data.payload.region);
        setCity(response.data.payload.city)
      } catch (e) {
        console.log(e)
      }
    }
    fetchUserDetails(token)
  }, []);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: user.email,
    amount: totalPrice * 100,
    publicKey: 'pk_test_7c371d93d1d4c27411cad38812b18a3533b6ff63',
  };
  
  
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };
  
  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }
  
  

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button type='submit' className='bg-gray-900 p-600 p-3 w-full mt-3 rounded text-white disabled:bg-gray-200 disabled:text-gray-900 disabled:cursor-not-allowed' onClick={() => {
          initializePayment(onSuccess, onClose)
        }}>Continue to payment</button>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(totalPrice)

    // try {
    //   const response = await apiService.updateUserProfile({ token: user.token, home_address: homeAddress, city, region });
    //   console.log(response)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  const handleDiscountCode = async (code) => {
    if(discountCodePercentage) return toast.error("Discount Already Applied!")
    if(code === "") return toast.error("No discount code applied!")
    setIsSubmittingDiscount(true)
    try {
      const response = await apiService.fetchDiscountCode(code)
      setDiscountCodePercentage(response.data.payload.discountPercentage)
      toast.success("Discount Applied!")
    } catch (e) {
      toast.error("Error Applying Discount!")
    }finally{
      setIsSubmittingDiscount(false)
      setDiscountCode("")
    }
  }
  return (
    <div className='px-4 md:px-12 py-6'>
      <div className='flex gap-3'>
        <p className='p-500 text-gray-400'>Cart</p>
        <i class="ri-arrow-right-s-line text-gray-400 p-500"></i>
        <p className='p-500 text-gray-800'>Checkout</p>
        <i class="ri-arrow-right-s-line text-gray-400 p-500"></i>
        <p className='p-500 text-gray-400'>Payment</p>
      </div>

      <form onSubmit={handleSubmit} className='w-full flex flex-col md:flex-row items-start gap-5 mt-8'>
        <div className='flex flex-col gap-5 w-full md:w-2/3'>
          <div className='border-[1.5px] rounded-lg border-gray-300 py-5 px-3 md:p-5'>
            <p className='p-600'>Customer Address</p>
            <div className='flex flex-col mt-3'>
              <label for="name" className='p-600 text-gray-500 text-sm'>Full name*</label>
              <input type='text' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' disabled value={userdetails && userdetails.first_name + ' ' + userdetails.last_name}></input>
            </div>

            <div className='flex flex-col md:flex-row mt-3 gap-4'>
              <div className='flex flex-col w-full md:w-1/2'>
                <label for="name" className='p-600 text-gray-500 text-sm'>E-mail Address*</label>
                <input type='email' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' disabled value={userdetails && userdetails.email} placeholder='Enter Your E-mail Address'></input>
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <label for="name" className='p-600 text-gray-500 text-sm'>Phone Number*</label>
                <input type='phone' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' disabled value={userdetails && userdetails.phone_number} placeholder='Enter Your Phone Number'></input>
              </div>
            </div>

            <div className='flex flex-col mt-3'>
              <label for="name" className='p-600 text-gray-500 text-sm'>House Address*</label>
              <input className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' onChange={(e) => { setHomeAddress(e.target.value) }} disabled={userdetails && (userdetails.home_address === "" || userdetails.home_address === undefined) ? false : true} value={userdetails && homeAddress} placeholder='Enter Your House Address'></input>
            </div>

            <div className='flex flex-col md:flex-row mt-3 gap-4'>
              <div className='flex flex-col w-full md:w-1/2'>
                <label for="name" className='p-600 text-gray-500 text-sm'>City*</label>
                <input type='text' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' onChange={(e) => { setCity(e.target.value) }} disabled={userdetails && (userdetails.city === "" || userdetails.city === undefined) ? false : true} value={userdetails && city} placeholder='Enter Your City'></input>
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <label for="name" className='p-600 text-gray-500 text-sm'>State*</label>
                <input type='phone' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' onChange={(e) => { setRegion(e.target.value) }} disabled={userdetails && (userdetails.region === "" || userdetails.region === undefined) ? false : true} value={userdetails && region} placeholder='Enter Your Region'></input>
              </div>
            </div>

          </div>

          {/* <div className='border-[1.5px] rounded-lg border-gray-300 py-5 px-3 md:p-5'>
            <p className='p-600 text-lg'>Delivery Details</p>
            <div className='flex  justify-between mt-3'>
              <div className='flex'>
                <input type='radio' className='text-gray-900 border-2 border-gray-900 focus:border-[#0C513F] h-4 w-4' placeholder='Enter Your full name'></input>
                <div className='pl-2'>
                  <p className='p-600'>Door delivery</p>
                  <p className='p-500 text-gray-400'>1-3 business days</p>
                </div>
              </div>
              <div className='p-600'>
                &#x20A6;250
              </div>
            </div>
          </div> */}
        </div>

        <div className='w-full md:w-1/3 border rounded-lg border-gray-300 py-5 px-3 md:p-5'>
          <p className='p-600'>Your Order</p>
          {cart && cart.length > 0 && (
            <>
              {cart.map((item, index) => (
                <div className='flex justify-between pt-3 pb-3 border-b-2 border-dashed' key={index}>
                  <div className='flex items-start'>
                    <img src={item.images[0]} alt='product image' className='w-24 md:w-16 rounded-md'></img>
                    <div className='flex flex-col gap-1 md:gap-1 px-4'>
                      <h4 className='p-600 text-sm'>{item.title}</h4>
                      <p className='p-600 text-[15px] text-gray-500 text-sm'>Grey</p>
                      <p className='p-600 text-[15px] text-gray-600 text-sm'>{item.cartQuantity} piece</p>
                    </div>
                  </div>
                  <h5 className='p-600'>{(item.cartQuantity * item.price).toLocaleString('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  })}</h5>
                </div>
              ))}
            </>
          )}
          <p className='p-600 mt-4'>Discount Code</p>
          <div className='flex  gap-4 pt-3'>
            <input type='text' className='px-3 py-3 w-3/5 bg-gray-100 border border-gray-300 outline-none rounded mt-1' onChange={(e) => setDiscountCode(e.target.value)} value={discountCode} placeholder='Add discount code'></input>
            <button type='button' onClick={() => handleDiscountCode(discountCode)} disabled={isSubmittingDiscount} className='flex items-center gap-2 px-6 py-2 w-2/5 p-500 border rounded border-gray-200 disabled:cursor-not-allowed'>
            {isSubmittingDiscount ? (
                              <>
                                <svg
                                    aria-hidden='true'
                                    className='w-8 h-8 text-gray-600 animate-spin dark:text-white fill-blue-600'
                                    viewBox='0 0 100 101'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="white"
                                    />
                                </svg>
                                <p className='text-xs'>Applying</p>
                              </>
                            ) : (
                                'Apply'
                            )}
            </button>
          </div>
          <div className='w-full border border-dashed mt-5'></div>
          <div className='pt-2 flex items-center justify-between'>
            <h5 className='p-500 text-gray-400'>Subtotal</h5>
            <p className='text-sm text-gray-700 mt-1 p-600'>&#x20A6;{initialPrice}</p>
          </div>
          <div className='pt-2 flex items-center justify-between'>
            <h5 className='p-500 text-gray-400'>Discount</h5>
            <p className='text-sm text-gray-700 mt-1 p-600'>-&#x20A6;{totalDiscount}({Math.ceil((totalDiscount / initialPrice) * 100)}% OFF)</p>
          </div>
          {/* <div className='pt-2 flex items-center justify-between'>
            <h5 className='p-500 text-gray-400'>Shipment Cost</h5>
            <p className='text-sm text-gray-700 mt-1 p-600'>-&#x20A6;220.00</p>
          </div> */}
          <div className='w-full border border-dashed mt-5'></div>
          <div className='pt-2 flex items-center justify-between'>
            <h5 className='p-500 text-gray-800'>Grand Total</h5>
            <p className='text-lg text-gray-700 mt-1 p-700'>&#x20A6;{totalPrice}</p>
          </div>

          <PaystackHookExample />
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default CheckoutContent