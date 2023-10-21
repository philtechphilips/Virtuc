import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiService from '../../../api/apiRequests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true)
        console.log(values)
        try {
            const response = await apiService.subscribeToNewsLetter(values);
            toast.success("Newsletter  subscription sucessful!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            resetForm();
        } catch (e) {
            toast.error("Error!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className='flex flex-col justify-center items-center gap-2 md:gap-5 -mt-5 p-5'>
            <div className='w-full md:w-[650px] text-center'>
                <h1 className='p-700 text-lg md:text-3xl'>Subscribe to our newsletter to get updates to our latest collection</h1>
                <p className='p-500 text-sm mt-2 md:mt-4 mb-4 text-gray-500'>Be the first to know about our new and trending products.</p>
                <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit} >
                    <Form >
                        <div className="flex flex-col md:flex-row items-center justify-center mt-5">
                        <div className='bg-gray-100 border border-gray-300 rounded h-10 flex item-center justify-center px-3 w-full md:w-fit'>
                            <i className="ri-mail-line text-lg text-gray-400 mt-[5px]"></i>
                            <Field type="email" id="email" name="email" placeholder="Enter your email"
                                className="flex-1  bg-transparent border-none focus:outline-none text-gray-400  p-400 w-72 md:w-72 pl-1" />
                        </div>
                       
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            style={{
                                color: "#fff",
                                borderRadius: "4px",
                            }}
                            className={`text-sm md:w-fit w-full mt-2 md:mt-0 md:ml-4 rounded bg-gray-800 hover:bg-gray-900 font-medium p-3 hover:drop-shadow-xl pl-5 pr-5 ${isSubmitting ? "cursor-not-allowed" : ""
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center px-3">
                                    <div className=" inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-r-2 border-white"></div>
                                    </div>{" "}
                                    <span className="text-sm font-medium ml-2">Submitting..</span>
                                </div>
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                        </div>
                    <ErrorMessage name="email" component="p" className="text-sm font-bold text-red-600" />

                    </Form>
                </Formik>
            </div>
            <ToastContainer />
        </div>

    )
}

export default Newsletter