import { useEffect } from "react";
import { COLORS } from "../constants/data";
import { useState } from "react";
import "./table.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from "@mui/x-data-grid";
import apiService from "../../../api/apiRequests";
import { useLocation } from "react-router-dom";

const AddProduct = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [errors, setErrors] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const { activeMenu } = useStateContext();
    const [isDeleted, setIsDeleted] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [image, setImage] = useState("");
    const location = useLocation();
    const [sizeQuantities, setSizeQuantities] = useState([{ size: '', quantity: '' }]);
    const [colorQuantities, setColorQuantities] = useState([{ color: '', quantity: '' }]);

    const handleSizeQuantityChange = (index, property, value) => {
        const updatedSizeQuantities = [...sizeQuantities];
        updatedSizeQuantities[index][property] = value;
        setSizeQuantities(updatedSizeQuantities);
    };

    const handleColorQuantityChange = (index, property, value) => {
        const updatedColorQuantities = [...colorQuantities];
        updatedColorQuantities[index][property] = value;
        setColorQuantities(updatedColorQuantities);
    };

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
                                <h1 className="text-lg font-semibold mb-4">Add Product</h1>
                            </div>

                            <form onSubmit={formik.handleSubmit}>
                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Category:
                                        </label>
                                        <select className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="categoryId" onChange={(e) => {
                                            formik.setFieldValue("categoryId", e.target.value);
                                            setSelectedCategory(e.target.value);
                                        }}>
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
                                            Category Type:
                                        </label>
                                        <select
                                            className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="categoryId"
                                            onChange={(e) => {
                                                formik.setFieldValue("categoryId", e.target.value);
                                            }}
                                        >
                                            <option disabled selected>Select a Category Type</option>
                                            {category && category.length > 0
                                                ? category
                                                    .filter((item) => item._id === selectedCategory)
                                                    .map((filteredCategories) =>
                                                        filteredCategories.categoryTypes.map((type) => (
                                                            <option key={type._id} value={type.type}>
                                                                {type.type}
                                                            </option>
                                                        ))
                                                    )
                                                : null}
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
                                            Title:
                                        </label>
                                        <input type="text" placeholder="Enter product title" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" onChange={(e) => formik.setFieldValue("title", e.target.value)}></input>
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
                                            Product Details:
                                        </label>
                                        <input type="text" placeholder="Enter product details" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="body" onChange={(e) => formik.setFieldValue("body", e.target.value)}></input>
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
                                            Product Price:
                                        </label>
                                        <input type="text" placeholder="Enter product price" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="body" onChange={(e) => formik.setFieldValue("body", e.target.value)}></input>
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
                                            Discount Price:
                                        </label>
                                        <input type="text" placeholder="Enter discount price" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="body" onChange={(e) => formik.setFieldValue("body", e.target.value)}></input>
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
                                            Product Quantity:
                                        </label>
                                        <input type="text" placeholder="Enter product quantity" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="buttonUrl" onChange={(e) => formik.setFieldValue("buttonUrl", e.target.value)} ></input>
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
                                            Product Instructions:
                                        </label>
                                        <input type="text" placeholder="Enter product instructions" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="buttonUrl" onChange={(e) => formik.setFieldValue("buttonUrl", e.target.value)} ></input>
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
                                            Enter Product Highlights:
                                        </label>
                                        <textarea
                                            placeholder="Enter product highlights (separated by newline)"
                                            className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="instructions"
                                            onChange={(e) => formik.setFieldValue("instructions", e.target.value.split('\n'))}
                                        ></textarea>
                                        {formik.errors.instructions && (
                                            <p className="text-red-600 text-sm">{formik.errors.instructions}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    {sizeQuantities.map((sq, index) => (
                                        <div key={index} className="mb-4 mt-4 w-full pr-3">
                                            <label
                                                htmlFor={`size-${index}`}
                                                className="block text-gray-700 font-semibold text-sm mb-2"
                                            >
                                                Product Size:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter size"
                                                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id={`size-${index}`}
                                                value={sq.size}
                                                onChange={(e) => handleSizeQuantityChange(index, 'size', e.target.value)}
                                            />

                                            <label
                                                htmlFor={`quantity-${index}`}
                                                className="block text-gray-700 font-semibold text-sm mb-2 mt-2"
                                            >
                                                Product Quantity:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter quantity"
                                                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id={`quantity-${index}`}
                                                value={sq.quantity}
                                                onChange={(e) => handleSizeQuantityChange(index, 'quantity', e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        className="text-blue-500"
                                        onClick={() => setSizeQuantities([...sizeQuantities, { size: '', quantity: '' }])}
                                    >
                                        Add Size and Quantity
                                    </button>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    {colorQuantities.map((sq, index) => (
                                        <div key={index} className="mb-4 mt-4 w-full pr-3">
                                            <label
                                                htmlFor={`size-${index}`}
                                                className="block text-gray-700 font-semibold text-sm mb-2"
                                            >
                                                Product Color:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter color"
                                                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id={`color-${index}`}
                                                value={sq.color}
                                                onChange={(e) => handleColorQuantityChange(index, 'color', e.target.value)}
                                            />

                                            <label
                                                htmlFor={`quantity-${index}`}
                                                className="block text-gray-700 font-semibold text-sm mb-2 mt-2"
                                            >
                                                Quantity:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter quantity"
                                                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id={`quantity-${index}`}
                                                value={sq.quantity}
                                                onChange={(e) => handleColorQuantityChange(index, 'quantity', e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        className="text-blue-500 text-sm"
                                        onClick={() => setColorQuantities([...colorQuantities, { color: '', quantity: '' }])}
                                    >
                                        Add Color and Quantity
                                    </button>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Product Image:
                                        </label>
                                        <input type="file" multiple className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="image" onChange={convertToBase64}></input>
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
                                        "Add Product"
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

export default AddProduct
