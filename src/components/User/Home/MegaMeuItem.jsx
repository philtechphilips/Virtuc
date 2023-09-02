import React, { useEffect, useState } from 'react'
import apiService from '../../../api/apiRequests';

const MegaMeuItem = ({ category }) => {
    const [megaMenu, setMegaMenu] = useState([])
    useEffect(() => {
        async function fetchMegamenu() {
            try {
                const response = await apiService.megaMenu();
                setMegaMenu(response.data.payload)
            } catch (error) {
                console.error(error);
            }
        }
        fetchMegamenu()
    }, []);
    console.log(megaMenu)
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
                {megaMenu.map((item, index) => (
                    <>
                        {item.categoryId.category === category && (
                            <>
                                {item.categoryId.categoryTypes.map((catType, index) => (
                                    <div className='flex flex-col gap-1' key={index}>
                                        <div key={index}>
                                            <h1 className='p-700'>{catType.type}</h1>
                                            {catType.type === item.categoryType && (
                                                <>
                                                    {item.subCategories.map((subCategory, index) => (
                                                        <ul className='flex flex-col gap-2 mt-1' key={index}>
                                                            <li className='p-400'>
                                                                {subCategory.subCategory}
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                ))
                }

            </div>
        </>
    )
}

export default MegaMeuItem