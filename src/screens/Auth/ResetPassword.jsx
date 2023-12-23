import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiService from '../../api/apiRequests';

const ResetPassword = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState("");
    const [isPasswordReset, setIsPasswordReset] = useState("");
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state != null) {
            setEmail(location.state);
        } else {
            navigate('/auth/security-code');
        }

        const handlePopState = () => {
            navigate('/auth/verify-identity', { state: email });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [email, location.state, navigate]);

    const handlePasswordVisibilityToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    //   const editEmail = () => {
    //     navigate("/auth/verify-identity", { state: email });
    //   }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (password != confirmPassword) {
            setErrors("Password doesn't match!");
            setIsSubmitting(false);
        } else {
            try {
                const response = await apiService.resetPassword(email, password);
                setIsSubmitting(false)
                setErrors("");
                setIsPasswordReset(response.data.message)
                // console.log(response)
            } catch (error) {
                if (error) {
                    setIsSubmitting(false)
                    if (error.response.status === 422) {
                        setErrors("Empty field!");
                    } else if (error.response.status === 400) {
                        setErrors("Invalid credentials!");
                        setSuccess("");
                    } else {
                        setErrors("An error occured, pls try again later.");
                        setSuccess("");
                    }
                }
            }
        }
    };

    return (
        <div className='w-full flex flex-col justify-center items-center min-h-screen'>
            <div className='flex items-center flex-col mb-7 gap-2 w-[340px] md:w-[400px] px-1 text-sm'>
                <h1 className='p-700 text-xl'>Reset Password!</h1>
                <p className='p-500 text-gray-500 text-center'>Enter your new password!</p>
            </div>
            <form className='w-[340px] md:w-[400px]' onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className='w-full px-3 relative'>
                    {isPasswordReset && (<p className='text-center text-green-600'>{isPasswordReset}</p>)}
                    <label className='p-700 block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' htmlFor='grid-email'>
                        E-mail Address
                    </label>
                    <input
                        className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        type='email'
                        disabled
                        value={email}
                    />
                </div>
                {/* {errors && <p className='text-red-500 p-500 px-3 mb-3'>{errors}</p>} */}
                {/* Password Input */}
                <div className='w-full px-3 relative'>
                    <label className='p-700 block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' htmlFor='grid-password'>
                        Password
                    </label>
                    <input
                        className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className='absolute top-8 right-5 px-2 text-lg py-1 cursor-pointer' onClick={handlePasswordVisibilityToggle}>
                        {isPasswordVisible ? <i className='ri-eye-line'></i> : <i className='ri-eye-off-line'></i>}
                    </span>
                </div>
                {errors && <p className='text-red-500 p-500 px-3 mb-3'>{errors}</p>}

                <div className='w-full px-3 relative'>
                    <label className='p-700 block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' htmlFor='grid-password'>
                        Confirm Password
                    </label>
                    <input
                        className='p-400 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder='Enter your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className='absolute top-8 right-5 px-2 text-lg py-1 cursor-pointer' onClick={handlePasswordVisibilityToggle}>
                        {isPasswordVisible ? <i className='ri-eye-line'></i> : <i className='ri-eye-off-line'></i>}
                    </span>
                </div>

                <div className='w-full my-3 px-3'>
                    <button
                        type='submit'
                        className={`bg-gray-700 hover:bg-gray-900 text-center flex items-center justify-center text-white p-600 p-3 w-full rounded py-3 ${isSubmitting && 'cursor-not-allowed'}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <svg
                                aria-hidden='true'
                                className='w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="blue"
                                />
                            </svg>
                        ) : (
                            'Login'
                        )}
                    </button>
                </div>
            </form>
            {/* Support and Branding */}
            <div className='flex items-center flex-col mt-7 gap-2 w-[340px] md:w-[400px] px-1 text-sm'>
                <p className='p-500 text-gray-500 text-center'>
                    For further support, you may visit the Help Center or contact our customer service team.
                </p>
                <h1 className='p-700 text-xl'>VirtuC</h1>
            </div>
        </div>
    );
};

export default ResetPassword;
