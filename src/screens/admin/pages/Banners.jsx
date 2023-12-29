import React, { useEffect } from "react";
import { COLORS } from "../constants/data";
import { useState } from "react";
import "./table.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from "@mui/x-data-grid";
import apiService from "../../../api/apiRequests";
import { Link, useLocation } from "react-router-dom";

const Banners = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [errors, setErrors] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { activeMenu } = useStateContext();
    const [isDeleted, setIsDeleted] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [image, setImage] =  useState("");

    const handleDelete = async (id) => {
        setIsDeleted(true)
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await apiService.deleteBanner(user.token, id);
            toast.success("Banner Deleted Sucessfully!", {
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

    const convertToBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImage(reader.result)
            
        }
        reader.onerror = error => {
            console.log("Error: ", error)
        }
  }

    const formik = useFormik({
        initialValues: {
            title: "",
            body: "",
            buttonText: "",
            buttonUrl: "",
            categoryId: ""
        },
        validationSchema: Yup.object({
            title: Yup.mixed().required("Title is required!"),
            body: Yup.mixed().required("Body is required!"),
            buttonText: Yup.mixed().required("Button text is required!"),
            buttonUrl: Yup.mixed().required("Button url is required!"),
            categoryId: Yup.mixed().required("Category is required!"),
        }),
        onSubmit: async () => {
            setIsSubmitting(true)
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await apiService.createBanner(user.token, formik.values, image);
                toast.success("Banner Upload Sucessful!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }  catch (e) {
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
                setIsSubmitting(false)
            }
        }
    });

      
    const userColumns = [
        {
            field: "",
            headerName: "Category",
            width: 200,
            renderCell: (params) => {
                return <div className="cellWithImg">{params.row.categoryId.category}</div>;
            },
        },
        {
            field: "title",
            headerName: "Title",
            width: 500
        },
        {
            field: "body",
            headerName: "Content",
            width: 600,
        },
        {
            field: "buttonText",
            headerName: "Button Text",
            width: 200,
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
                        <button
                            type="button"
                            className={`viewButton ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                                }`}
                            onClick={() => handleDelete(params.row._id)}
                            disabled={isSubmitting}
                        >
                            Edit
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
        const fetchBanner = async () => {
            try {
                const response = await apiService.fetchBanner();
                const responses = await apiService.fetchCategory();
                setData(response.data.payload);
                setCategory(responses.data.payload);
            } catch (error) {
                toast.error("Something went wrong!");
            }
        }
        fetchBanner();
    }, [isSubmitting, isDeleted]);
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
                                <h1 className="text-lg font-semibold mb-4">Add Home Banner</h1>
                            </div>

                            <form onSubmit={formik.handleSubmit}>
                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Banner Category:
                                        </label>
                                        <select className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="categoryId" onChange={(e) => formik.setFieldValue("categoryId", e.target.value)}>
                                        <option disabled selected>Select a Category</option>
                                            {category && category.length > 0 && category.map((item, index) => (
                                                <option key={index} value={item._id}>{item.category}</option>
                                            ))}
                                        </select>
                                        {formik.errors.categoryId && (
                                            <p className="text-red-600 text-sm">{formik.errors.categoryId}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Banner Title:
                                        </label>
                                        <input type="text" placeholder="Enter banner title" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" onChange={(e) => formik.setFieldValue("title", e.target.value)}></input>
                                        {formik.errors.title && (
                                            <p className="text-red-600 text-sm">{formik.errors.title}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Banner Body Text:
                                        </label>
                                        <input type="text" placeholder="Enter banner body text" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="body" onChange={(e) => formik.setFieldValue("body", e.target.value)}></input>
                                        {formik.errors.body && (
                                            <p className="text-red-600 text-sm">{formik.errors.body}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Button Url:
                                        </label>
                                        <input type="text" placeholder="Enter banner body text" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="buttonUrl" onChange={(e) => formik.setFieldValue("buttonUrl", e.target.value)} ></input>
                                        {formik.errors.buttonUrl && (
                                            <p className="text-red-600 text-sm">{formik.errors.buttonUrl}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Button Text:
                                        </label>
                                        <input type="text" placeholder="Enter banner button text" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="buttonText" onChange={(e) => formik.setFieldValue("buttonText", e.target.value)}></input>
                                        {formik.errors.buttonText && (
                                            <p className="text-red-600 text-sm">{formik.errors.buttonText}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Banner Image:
                                        </label>
                                        <input type="file" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="image"   onChange={convertToBase64}></input>
                                        {formik.errors.image && (
                                            <p className="text-red-600 text-sm">{formik.errors.image}</p>
                                        )}
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
                                        "Add Banner Image"
                                    )}
                                </button>
                            </form>
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

export default Banners