import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EditDetails from './AccountOverview/EditDetails'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../../context/AuthContext';

const AccountOverView = ({ userProfile, isLoading }) => {
    const [isEditAccount, setIsEditAccount] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className='border mt-10 px-5 py-5 rounded-md'>
                <div className='flex flex-col gap-2 mb-10'>
                    <h1 className='p-700 text-gray-900 text-xl'> Account Overview</h1>
                    <p className='p-400'>Feel free to edit any of your details below so your account is up to date.</p>
                </div>

                <div className='flex flex-col gap-2 mb-5'>
                    <h1 className='p-700 text-gray-900 text-xl'>Details</h1>
                    <p className='p-400 uppercase text-[15px]'>{isLoading ? <Skeleton className='w-64 md:w-80' /> : `${userProfile?.first_name} ${userProfile?.last_name}`}</p>
                    <p className='p-400 uppercase text-[15px]'>{isLoading ? <Skeleton className='w-64 md:w-80' /> : `${userProfile?.email || ''}`}</p>
                    <p className='p-400 uppercase text-[15px]'>{isLoading ? <Skeleton className='w-64 md:w-80' /> : `${userProfile?.gender || ''}`}</p>
                    <p className='p-400 uppercase text-[15px]'>{isLoading ? <Skeleton className='w-64 md:w-80' /> : `${userProfile?.dob || ''}`}</p>
                    <p className='p-400 uppercase text-[15px]'>{isLoading ? <Skeleton className='w-64 md:w-80' /> : `${userProfile?.phone_number || ''}`}</p>
                    <Link onClick={() => setIsEditAccount(true)} className='p-600 uppercase underline text-gray-950 text-[15px] hover:bg-gray-900 hover:text-white w-fit'>EDIT</Link>
                </div>

                <div className='flex flex-col gap-2 mb-5'>
                    <h1 className='p-700 text-gray-900 text-xl'>Address</h1>
                    <p className='p-400 uppercase text-[15px]'>{isLoading ? <Skeleton className='w-64 md:w-80' /> : `${userProfile?.home_address || ''}`}</p>
                </div>

                <div className='flex flex-col gap-2 mb-5'>
                    <h1 className='p-700 text-gray-900 text-xl'>Logout</h1>
                    <p className='p-400 text-[15px]'>This will log you out. To log in again, you'll have to enter your credentials.</p>
                    <button type='button' onClick={() => navigate("/logout")} className='p-600 flex justify-between border border-gray-900 py-2 uppercase px-4 w-48 text-gray-950 text-[15px] hover:bg-gray-900 hover:text-white'>
                        <p className='p-600 text-[15px] uppercase '>LOG ME OUT</p>
                        <i className="ri-arrow-right-line"></i>
                    </button>
                </div>
                {isEditAccount && (<div className='absolute bg-gray-900 bg-opacity-70 top-0 left-0 z-[1000] w-full h-[1520px]'></div>)}
                <EditDetails isLoading={isLoading} user={userProfile} onClose={() => setIsEditAccount(false)} open={isEditAccount} />

            </div>
        </>
    )
}

export default AccountOverView