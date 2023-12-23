import React from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import apiService from '../../../../api/apiRequests';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuthContext from '../../../../context/AuthContext';

const EditDetails = ({ open, onClose }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUserUpdated, setIsUserUpdated] = useState("");
    const { logout } = useAuthContext;


    const savedUser = JSON.parse(localStorage.getItem('user'))
    const token = savedUser.token;
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await apiService.fetchAuthUser(savedUser);
                setUser(response.data.payload)
                setFirstName(response.data.payload.first_name)
                setLastName(response.data.payload.last_name)
                setPhoneNumber(response.data.payload.phone_number)
                setDOB(response.data.payload.dob)
                setGender(response.data.payload.gender)
            } catch (error) {
                if (error.response.data.statusCode === 401) {
                    await toast.error("Session expired kindly login!");
                    logout();
                }
                toast.error("Something went wrong!");
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserProfile()
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (firstName.trim() === '') {
            validationErrors.firstName = 'First name is required';
        }

        if (lastName.trim() === '') {
            validationErrors.lastName = 'Last name is required';
        }

        if (phoneNumber.trim() === '') {
            validationErrors.phoneNumber = 'Phone number is required';
        }

        if (dob.trim() === '') {
            validationErrors.dob = 'Date of Birth is required';
        }

        if (gender === '') {
            validationErrors.gender = 'Gender is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({})
            setIsSubmitting(true)
            try {
                const response = await apiService.updateUserProfile({ token, firstName, lastName, phoneNumber, dob, gender });
                setIsUserUpdated("Profile updated sucessfully!")
            } catch (error) {
                console.log(error)
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    if (!open) return null;

    return (
        <> 
            <div className='fixed top-20 right-[5%] md:right-[25%] w-[340px] md:w-[600px] h-[550px] md:h-[500px] bg-white z-[1000] overflow-auto px-5 py-5'>
                <h1 className='p-700 text-xl'>EDIT YOUR DETAILS</h1>
                <form onSubmit={handleFormSubmit} className='w-full flex flex-col gap-4 py-5'>
                    <p className='p-500 text-green-500'>{isUserUpdated}</p>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor='firstName' className='p-500'>
                            First name
                        </label>
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            <input
                                type='text'
                                id='firstName'
                                className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder='Enter your name'
                            />
                        )}
                        {errors.firstName && <p className='-mt-2 text-red-500'>{errors.firstName}</p>}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor='lastName' className='p-500'>
                            Last name
                        </label>
                        <input
                            type='text'
                            id='lastName'
                            className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Enter your name'
                        />
                        {errors.lastName && <p className='-mt-2 text-red-500'>{errors.lastName}</p>}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor='phoneNumber' className='p-500'>
                            Phone
                        </label>
                        <input
                            type='phone'
                            id='phoneNumber'
                            className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder='Enter your Phone'
                        />
                        {errors.phoneNumber && <p className='-mt-2 text-red-500'>{errors.phoneNumber}</p>}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor='dob' className='p-500'>
                            D.O.B
                        </label>
                        <input
                            type='date'
                            id='dob'
                            className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}
                            placeholder='Enter your Date of Birth'
                        />
                        {errors.dob && <p className='-mt-2 text-red-500'>{errors.dob}</p>}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label className='p-500'>GENDER</label>
                        <div className='flex gap-4'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    name='gender'
                                    id='male'
                                    className='text-black checked:before:bg-black focus:ring-black w-5 h-5' checked={gender === "male" ? true : false}
                                    onChange={() => setGender("male")}
                                />
                                <label htmlFor='male' className='p-400'>
                                    Male
                                </label>
                            </div>

                            <div className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    name='gender'
                                    id='female'
                                    className='text-black checked:before:bg-black focus:ring-black w-5 h-5'
                                    checked={gender === "female" ? true : false}
                                    onChange={() => setGender("female")}
                                />
                                <label htmlFor='female' className='p-400'>
                                    Female
                                </label>
                            </div>

                            <div className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    name='gender'
                                    id='other'
                                    className='text-black checked:before:bg-black focus:ring-black w-5 h-5'
                                    checked={gender === "others" ? true : false}
                                    onChange={() => setGender("others")}
                                />
                                <label htmlFor='other' className='p-400'>
                                    Others
                                </label>
                            </div>
                        </div>
                        {errors.gender && <p className='-mt-2 text-red-500'>{errors.gender}</p>}
                    </div>

                    <button
                        type='submit'
                        className={`mt-4 p-600 flex justify-between border border-gray-900 py-3 uppercase px-4 w-full text-gray-950 text-[15px] hover:bg-gray-900 hover:text-white ${isSubmitting ? "cursor-not-allowed hover:bg-gray-500" : ""
                            }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center">
                                <div className="animate-spin mr-2">
                                    <i className="ri-loader-2-line text-[15px]"></i>
                                </div>
                                <p className='p-600 text-[15px] uppercase'>Updating...</p>
                            </div>
                        ) : (
                            <>
                                <p className='p-600 text-[15px] uppercase '>UPDATE DETAILS</p>
                                <i className='ri-arrow-right-line'></i>
                            </>
                        )}
                    </button>

                </form>
            </div>
            <button
                type='button'
                onClick={onClose}
                className='fixed top-16 right-[1%] md:right-[24%] h-12 w-12 bg-white flex items-center justify-center border border-black z-[10000]'
            >
                <i className='ri-close-line text-3xl'></i>
            </button>
        </>
    );
};

export default EditDetails;
