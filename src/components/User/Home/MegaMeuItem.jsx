import React from 'react'

const MegaMeuItem = () => {
    return (
        <>
                <div className='px-20 py-10 w-2/6 border-r'>
                    <h1 className='p-700'>NEW & TRENDING</h1>
                    <ul className='flex flex-col gap-1 mt-3'>
                        <li className='p-400'>New Arrivals</li>
                        <li className='p-400'>Trending</li>
                        <li className='p-400'>Best Selling</li>
                    </ul>
                </div>
                <div className='px-20 py-10 w-4/6 flex gap-20'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='p-700'>SHOES</h1>
                        <ul className='flex flex-col gap-2 mt-1'>
                            <li className='p-400'>Loafers</li>
                            <li className='p-400'>Boot</li>
                            <li className='p-400'>Sandals</li>
                            <li className='p-400'>Oxford Shoe</li>
                            <li className='p-400'>Slide</li>
                            <li className='p-400'>Slip On</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='p-700'>CLOTHING</h1>
                        <ul className='flex flex-col gap-2 mt-1'>
                            <li className='p-400'>Trousers</li>
                            <li className='p-400'>Jeans</li>
                            <li className='p-400'>Polo Shirt</li>
                            <li className='p-400'>T-Shirt</li>
                            <li className='p-400'>Suit</li>
                            <li className='p-400'>Shorts</li>
                            <li className='p-400'>Shirt</li>
                            <li className='p-400'>Casual Wear</li>
                            <li className='p-400'>Blazers</li>
                            <li className='p-400'>Cardigan</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='p-700'>ACCESSORIES</h1>
                        <ul className='flex flex-col gap-2 mt-1'>
                            <li className='p-400'>Wallet</li>
                            <li className='p-400'>Wrist Watches</li>
                            <li className='p-400'>Neck Tie</li>
                            <li className='p-400'>Bow Tie</li>
                            <li className='p-400'>Pocket Square</li>
                            <li className='p-400'>Glasses</li>
                            <li className='p-400'>Perfumes</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='p-700'>JEWELRY</h1>
                        <ul className='flex flex-col gap-2 mt-1'>
                            <li className='p-400'>Bracelet</li>
                            <li className='p-400'>Cufflink</li>
                            <li className='p-400'>Watches</li>
                            <li className='p-400'>Ring</li>
                            <li className='p-400'>Pendant</li>
                            <li className='p-400'>Tie Clip</li>
                        </ul>
                    </div>
                </div>
        </>
    )
}

export default MegaMeuItem