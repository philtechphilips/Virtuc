import React, { useEffect } from "react";
import { COLORS } from "../constants/data";
import { useState } from "react";
import "./table.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from "@mui/x-data-grid";
import apiService from "../../../api/apiRequests";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { activeMenu } = useStateContext();
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        setIsDeleted(true)
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await apiService.deleteCategory(user.token, id);
            toast.success("Category Deleted Sucessfully!", {
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

    const initialValues = {
        category: '',
    };

    const validationSchema = Yup.object().shape({
        category: Yup.string().required('Category is required'),
    });

    const userColumns = [
        {
            field: "category",
            headerName: "Category",
            width: 200
        },
        {
            field: "",
            headerName: "Category Type",
            width: 600,
            renderCell: (params) => {
                return (
                    <div className="flex gap-5">
                        {params.row.categoryTypes.map((item, index) => (
                            <div className="cellWithImg" key={index}>{item.type}</div>
                        ))}
                    </div>
                );
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
                        <Link to={"/category-type"}
                            state={{ id: params.row._id, category: params.row.category }}
                          className='viewButton'>
                            Add Category Type
                        </Link>
                        <button
                            type="button"
                            className={`viewButton ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                                }`}
                            onClick={() => navigate("/edit-categories", { state: params.row})}
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
        const fetchHeaderBarContent = async () => {
            try {
                const response = await apiService.fetchCategory();
                setData(response.data.payload);
            } catch (error) {
                toast.error("Something went wrong!");
            }
        }
        fetchHeaderBarContent();
    }, [isSubmitting, isDeleted]);

    const handleSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true)
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await apiService.addCategory(user.token, values);
            toast.success("Category Created Sucessfully!", {
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
                                <h1 className="text-lg font-semibold mb-4">Add Categories</h1>
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
                                                Category:
                                            </label>
                                            <Field type="text" id="category" name="category" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter category" />
                                            <ErrorMessage name="category" component="div" className="text-sm text-red-600" />
                                            {errors && (<p className="text-sm text-red-600">{errors}</p>)}
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
                                            "Add Category"
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

export default Categories