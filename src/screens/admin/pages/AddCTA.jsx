import React, { useEffect } from "react";
import { COLORS } from "../constants/data";
import { useState } from "react";
import "./table.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import apiService from "../../api/apiRequests";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


const AddCTA = () => {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { activeMenu } = useStateContext();
    const [isDeleted, setIsDeleted] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleted(true)
        try {
            const response = await apiService.deleteVote(id);
            toast.success("Vote Deleted Sucessfully!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (e) {
            toast.error(e.response.data.message, {
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
            setIsDeleted(false)
        }
    }

    const handleActive = async (id) => {
        setIsActive(true)
        try {
            const response = await apiService.activateVote(id);
            toast.success("Vote Status Changed Sucessfully!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (e) {
            toast.error(e.response.data.message, {
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
            setIsActive(false)
        }
    }

    const initialValues = {
        vote: '',
        startDate: '',
        endDate: '',
    };

    const validationSchema = Yup.object().shape({
        vote: Yup.string().required('Vote type is required'),
        startDate: Yup.string().required('Vote start date and time is required'),
        endDate: Yup.string().required('Vote end date and time is required'),
    });

    const userColumns = [
        {
            field: "vote",
            headerName: "Vote Type",
            width: 250,
            renderCell: (params) => {
                return <div className="cellWithImg">{params.row.vote}</div>;
            },
        },

        {
            field: "startDate",
            headerName: "Start Date/Time",
            width: 280,
            renderCell: (params) => {
                return <div className="cellWithImg">{new Date(params.row.startDate).toLocaleString()}</div>;
            },
        },

        {
            field: "endDate",
            headerName: "End Date/Time",
            width: 200,
            renderCell: (params) => {
                return <div className="cellWithImg">{new Date(params.row.endDate).toLocaleString()}</div>;
            },
        }
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellAction flex gap-5">
                        <button onClick={() => handleActive(params.row._id)}  style={{ textDecoration: "none" }}>
                            <div className="viewButton">{params.row.isActive ? "Active" : "Inactive"}</div>
                        </button>
                        <button
                            type="button"
                            className={`deleteButton ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                                }`}
                            onClick={() => handleDelete(params.row._id)}
                            disabled={isSubmitting}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        const fetchVote = async () => {
            const response = await apiService.fetchVote();
            setData(response.data.payload);
        }
        fetchVote()
    }, [isSubmitting, isDeleted]);



    const handleSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true)
        console.log(values)
        try {
            const response = await apiService.createVote(values);
            toast.success("Vote Created Sucessfully!", {
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
            setErrors(e.response.data.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex relative">
            {/* Sidebar */}
            {activeMenu ? (
                <div className="w-72 fixed sidebar" style={{ background: "#fff" }}>
                    <Sidebar />
                </div>
            ) : (
                <div className="w-0">
                    <Sidebar />
                </div>
            )}

            <div
                className={
                    activeMenu
                        ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                        : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                }
            >
                {/* Navbar */}
                <div className="fixed md:static bg-gray-100 navbar w-full">
                    <Navbar />
                </div>

                {/* Content */}
                <div className="bg-gray-100 w-full">

                    {/* Add Admin Form */}
                    <div className="pb-20 w-full h-full  p-5 pt-24 md:pt-2">
                        <div className="bg-white p-5">
                            <div className="flex w-full md:w-1/2 justify-between items-center">
                                <h1 className="text-lg font-semibold mb-4">Create Votes</h1>
                            </div>

                            <Formik initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit} className="md:w-1/2 w-full">
                                <Form>
                                    <div className="w-full flex flex-wrap justify-between">
                                        <div className="mb-4 mt-4 w-full pr-3">
                                            <label
                                                htmlFor="vote"
                                                className="block text-gray-700 font-semibold text-sm mb-2"
                                            >
                                                Vote Type
                                            </label>
                                            <Field type="text" id="vote" name="vote" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter vote type" />
                                            <ErrorMessage name="vote" component="div" className="text-sm text-red-600" />
                                            {errors && (<p className="text-sm text-red-600">{errors}</p>)}
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-wrap justify-between">
                                        <div className="mb-4 mt-4 w-full pr-3">
                                            <label
                                                htmlFor="startDate"
                                                className="block text-gray-700 font-semibold text-sm mb-2"
                                            >
                                                Start Date/Time:
                                            </label>
                                            <Field type="datetime-local" id="startDate" name="startDate" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            <ErrorMessage name="startDate" component="div" className="text-sm text-red-600" />

                                        </div>
                                    </div>

                                    <div className="w-full flex flex-wrap justify-between">
                                        <div className="mb-4 mt-4 w-full pr-3">
                                            <label
                                                htmlFor="firstname"
                                                className="block text-gray-700 font-semibold text-sm mb-2"
                                            >
                                                End Date/Time:
                                            </label>
                                            <Field type="datetime-local" id="endDate" name="endDate" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            <ErrorMessage name="endDate" component="div" className="text-sm text-red-600" />

                                        </div>
                                    </div>

                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        style={{
                                            backgroundColor: COLORS.primary,
                                            color: "#fff",
                                            borderRadius: "3px",
                                        }}
                                        className={`text-sm font-medium p-3 hover:drop-shadow-xl pl-5 pr-5 ${isSubmitting ? "cursor-not-allowed" : ""
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
                                            "Create Vote"
                                        )}
                                    </button>
                                </Form>
                            </Formik>
                            <ToastContainer />
                        </div>
                        {/* All Administrators */}
                        <DataGrid
                            className="datagrid bg-white mt-3 w-90"
                            rows={data}
                            columns={userColumns.concat(actionColumn)}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            getRowId={(row) => row._id}
                        />
                        {/* All Administrators Ends Here*/}
                    </div>
                    {/* Add Admin Form Ends Here */}
                </div>
            </div>

        </div>

    );
}

export default AddCTA