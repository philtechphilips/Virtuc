import React from 'react'

const CheckoutContent = () => {
  return (
    <div className='px-4 md:px-12 py-6'>
      <div className='flex gap-3'>
        <p className='p-500 text-gray-400'>Cart</p>
        <i class="ri-arrow-right-s-line text-gray-400 p-500"></i>
        <p className='p-500 text-gray-800'>Checkout</p>
        <i class="ri-arrow-right-s-line text-gray-400 p-500"></i>
        <p className='p-500 text-gray-400'>Payment</p>
      </div>

      <form className='w-full flex flex-col md:flex-row items-start gap-5 mt-8'>
        <div className='flex flex-col gap-5 w-full md:w-2/3'>
          <div className='border-[1.5px] rounded-lg border-gray-300 py-5 px-3 md:p-5'>
            <p className='p-600'>Customer Address</p>
            <div className='flex flex-col mt-3'>
              <label for="name" className='p-600 text-gray-500 text-sm'>Full name*</label>
              <input type='text' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' placeholder='Enter Your full name'></input>
            </div>

            <div className='flex flex-col md:flex-row mt-3 gap-4'>
              <div className='flex flex-col w-full md:w-1/2'>
                <label for="name" className='p-600 text-gray-500 text-sm'>E-mail Address*</label>
                <input type='email' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' placeholder='Enter Your E-mail Address'></input>
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <label for="name" className='p-600 text-gray-500 text-sm'>Phone Number*</label>
                <input type='phone' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' placeholder='Enter Your Phone Number'></input>
              </div>
            </div>

            <div className='flex flex-col mt-3'>
              <label for="name" className='p-600 text-gray-500 text-sm'>House Address*</label>
              <input className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' placeholder='Enter Your House Address'></input>
            </div>

            <div className='flex flex-col md:flex-row mt-3 gap-4'>
              <div className='flex flex-col w-full md:w-1/2'>
                <label for="name" className='p-600 text-gray-500 text-sm'>City*</label>
                <input type='email' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' placeholder='Enter Your City'></input>
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <label for="name" className='p-600 text-gray-500 text-sm'>Region*</label>
                <input type='phone' className='px-3 py-3 bg-gray-100 border border-gray-300 outline-none rounded mt-1' placeholder='Enter Your Region'></input>
              </div>
            </div>

          </div>

          <div className='border-[1.5px] rounded-lg border-gray-300 py-5 px-3 md:p-5'>
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
          </div>
        </div>

        <div className='w-full md:w-1/3 border rounded-lg border-gray-300 py-5 px-3 md:p-5'>
          <p className='p-600'>Your Order</p>
          <div className='flex justify-between pt-3'>
            <div className='flex items-start'>
              <img src="https://ng.jumia.is/cms/0-1-homepage/0-0-freelinks-gray/300x240/phones-tablets_300x240.png" alt='' className='w-24 md:w-24 rounded-md'></img>
              <div className='flex flex-col gap-1 md:gap-1 px-4'>
                <h4 className='p-600 text-sm'>Apple IPhone 14 Pro Max 6.7</h4>
                <p className='p-600 text-[15px] text-gray-500 text-sm'>Grey</p>
                <p className='p-600 text-[15px] text-gray-600 text-sm'>1 piece</p>
              </div>
            </div>
            <h5 className='p-600'>&#x20A6;2,000</h5>
          </div>
          <div className='w-full border border-dashed mt-5'></div>

          <p className='p-600 mt-4'>Discount Code</p>
          <div className='flex  gap-4 pt-3'>
            <input type='text' className='px-3 py-3 w-3/5 bg-gray-100 border border-gray-300 outline-none rounded mt-1' placeholder='Add discount code'></input>
            <button className='px-6 py-2 w-2/5 p-500 border rounded border-gray-200'>Apply</button>
          </div>
          <div className='w-full border border-dashed mt-5'></div>
          <div className='pt-2 flex items-center justify-between'>
            <h5 className='p-500 text-gray-400'>Subtotal</h5>
            <p className='text-sm text-gray-700 mt-1 p-600'>&#x20A6;2,500</p>
          </div>
          <div className='pt-2 flex items-center justify-between'>
            <h5 className='p-500 text-gray-400'>Discount</h5>
            <p className='text-sm text-gray-700 mt-1 p-600'>-&#x20A6;500.00(20% OFF)</p>
          </div>
          <div className='pt-2 flex items-center justify-between'>
            <h5 className='p-500 text-gray-400'>Shipment Cost</h5>
            <p className='text-sm text-gray-700 mt-1 p-600'>-&#x20A6;220.00</p>
          </div>
          <div className='w-full border border-dashed mt-5'></div>
          <div className='pt-2 flex items-center justify-between'>
            <h5 className='p-500 text-gray-800'>Grand Total</h5>
            <p className='text-lg text-gray-700 mt-1 p-700'>&#x20A6;1,500.00</p>
          </div>
          <button className='bg-gray-900 p-600 p-3 w-full mt-3 rounded text-white disabled:bg-gray-200 disabled:text-gray-900 disabled:cursor-not-allowed' disabled>Continue to payment</button>
        </div>
        
      </form>

    </div>
  )
}

export default CheckoutContent