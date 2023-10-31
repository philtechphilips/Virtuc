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
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await apiService.deleteHeaderBarContent(user.token, id);
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

    const initialValues = {
        content: '',
    };

    const validationSchema = Yup.object().shape({
        content: Yup.string().required('Header bar content is required'),
    });

    const userColumns = [
        {
            field: "content",
            headerName: "Content",
            width: 600
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
        const fetchHeaderBarContent = async () => {
            try {
                const response = await apiService.fetchHeaderBarContent();
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
            const response = await apiService.addCategory(user.token, values);
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
                                <h1 className="text-lg font-semibold mb-4">Add Header Bar</h1>
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
                                                Content:
                                            </label>
                                            <Field type="text" id="content" name="content" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Add header bar content" />
                                            <ErrorMessage name="content" component="div" className="text-sm text-red-600" />
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
                                            "Add Header Bar Content"
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