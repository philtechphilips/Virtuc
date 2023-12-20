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
import { convertToBase64 } from "../../../utils";

const AddProduct = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [errors, setErrors] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const { activeMenu } = useStateContext();
    const [isDeleted, setIsDeleted] = useState(false);
    const [sizeQuantities, setSizeQuantities] = useState([{ size: '', quantity: '' }]);
    const [colorQuantities, setColorQuantities] = useState([{ color: '', quantity: '' }]);

    const handleSizeQuantityChange = (index, property, value) => {
        const updatedSizeQuantities = [...sizeQuantities];
        updatedSizeQuantities[index][property] = value;
        setSizeQuantities(updatedSizeQuantities);
        formik.setFieldValue("size", updatedSizeQuantities);
    };

    const handleColorQuantityChange = (index, property, value) => {
        const updatedColorQuantities = [...colorQuantities];
        updatedColorQuantities[index][property] = value;
        setColorQuantities(updatedColorQuantities);
        formik.setFieldValue("color", updatedColorQuantities);
    };

    const handleDelete = async (id) => {
        setIsDeleted(true)
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await apiService.deleteProduct(user.token, id);
            toast.success("Product Deleted Sucessfully!", {
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

    const convertImage = async (e) => {
        try {
            const result = await convertToBase64(e);
            formik.setFieldValue("image", result)
        } catch (error) {
            console.error("Error converting image: ", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            categoryId: "",
            categoryType: "",
            details: "",
            price: "",
            discount: "",
            quantity: "",
            instructions: "",
            highlight: "",
            image: "",
            size: "",
            color: ""
        },
        validationSchema: Yup.object({
            title: Yup.mixed().required("Title is required!"),
            categoryId: Yup.mixed().required("Product category is required!"),
            categoryType: Yup.mixed().required("Category type is required!"),
            details: Yup.mixed().required("Product details is required!"),
            price: Yup.mixed().required("Product price is required!"),
            discount: Yup.mixed().required("Product discount is required!"),
            quantity: Yup.mixed().required("Product quantity is required!"),
            instructions: Yup.mixed().required("Product instructions is required!"),
            highlight: Yup.mixed().required("Product highlights is required!"),
            image: Yup.mixed().required("Product image is required!")
        }),
        onSubmit: async () => {
            setIsSubmitting(true)
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                await apiService.createPoduct(user.token, formik.values);
                toast.success("Product Upload Sucessful!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                formik.resetForm();
            } catch (e) {
                console.log(e)
                // toast.error(e.response.data.message, {
                //     position: "bottom-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                // })
            } finally {
                setIsSubmitting(false)
            }
        }
    });


    const userColumns = [
        {
            field: "category",
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
            field: "details",
            headerName: "Details",
            width: 150,
        },
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
        const fetchProduct = async () => {
            try {
                const response = await apiService.fetchProducts();
                console.log(response)
                const responses = await apiService.fetchCategory();
                setData(response.data.payload);
                setCategory(responses.data.payload);
            } catch (error) {
                toast.error("Something went wrong!");
            }
        }
        fetchProduct();
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
                                            name="categoryType"
                                            onChange={(e) => {
                                                formik.setFieldValue("categoryType", e.target.value);
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
                                        {formik.errors.categoryType && (
                                            <p className="text-red-600 text-sm">{formik.errors.categoryType}</p>
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
                                        <input type="text" placeholder="Enter product details" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="details" onChange={(e) => formik.setFieldValue("details", e.target.value)}></input>
                                        {formik.errors.details && (
                                            <p className="text-red-600 text-sm">{formik.errors.details}</p>
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
                                        <input type="number" placeholder="Enter product price" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="price" onChange={(e) => formik.setFieldValue("price", e.target.value)}></input>
                                        {formik.errors.price && (
                                            <p className="text-red-600 text-sm">{formik.errors.price}</p>
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
                                        <input type="number" placeholder="Enter discount price" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="discount" onChange={(e) => formik.setFieldValue("discount", e.target.value)}></input>
                                        {formik.errors.discount && (
                                            <p className="text-red-600 text-sm">{formik.errors.discount}</p>
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
                                        <input type="text" placeholder="Enter product quantity" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="quantity" onChange={(e) => formik.setFieldValue("quantity", e.target.value)} ></input>
                                        {formik.errors.quantity && (
                                            <p className="text-red-600 text-sm">{formik.errors.quantity}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full flex flex-wrap justify-between">
                                    <div className="mb-4 mt-4 w-full pr-3">
                                        <label
                                            htmlFor="vote"
                                            className="block text-gray-700 font-semibold text-sm mb-2"
                                        >
                                            Product instructionss:
                                        </label>
                                        <input type="text" placeholder="Enter product instructionss" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="instructions" onChange={(e) => formik.setFieldValue("instructions", e.target.value)} ></input>
                                        {formik.errors.instructions && (
                                            <p className="text-red-600 text-sm">{formik.errors.instructions}</p>
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
                                            name="highlight"
                                            onChange={(e) => formik.setFieldValue("highlight", e.target.value.split('\n'))}
                                        ></textarea>
                                        {formik.errors.highlight && (
                                            <p className="text-red-600 text-sm">{formik.errors.highlight}</p>
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
                                        <input type="file" multiple className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="image" onChange={convertImage}></input>
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
