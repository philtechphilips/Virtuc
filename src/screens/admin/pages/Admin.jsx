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
import apiService from "../../../api/apiRequests"



const Admin = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeMenu } = useStateContext();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id) => {
    setIsDeleted(true)
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await apiService.deleteAdmin(user.token, id);
      toast.success("Admin Deleted Sucessfully!", {
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
    first_name: '',
    last_name: '',
    email: ''
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('User first name is required'),
    last_name: Yup.string().required('User last name is required'),
    email: Yup.string().required('User email address is required'),
  });

  const userColumns = [
    {
      field: "first_name",
      headerName: "First Name",
      width: 250,
    },

    {
      field: "last_name",
      headerName: "Surname",
      width: 280,
    },

    {
      field: "email",
      headerName: "Email Address",
      width: 200,
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
              className={`deleteButton ${isDeleted ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              onClick={() => handleDelete(params.row._id)}
              disabled={isDeleted}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAdmin = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await apiService.fetchAdmin(user.token);
        setData(response.data.payload);
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
      }
    }
    fetchAdmin()
  }, [isSubmitting, isDeleted]);



  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true)
    console.log(values)
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await apiService.addAdmin(user.token, values);
      toast.success("Admin Added Sucessfully!", {
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
                <h1 className="text-lg font-semibold mb-4">Add Admin</h1>
              </div>

              <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit} className="md:w-1/2 w-full">
                <Form>
                  <div className="w-full flex flex-wrap justify-between">
                    <div className="mb-4 mt-4 w-full pr-3">
                      <label
                        htmlFor="receipt-no"
                        className="block text-gray-700 font-semibold text-sm mb-2"
                      >
                        First Name:
                      </label>
                      <Field type="text" id="first_name" name="first_name" placeholder="Enter First Name" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      <ErrorMessage name="first_name" component="div" className="text-sm text-red-600" />
                      {errors && (<p className="text-sm text-red-600">{errors}</p>)}
                    </div>
                  </div>

                  <div className="w-full flex flex-wrap justify-between">
                    <div className="mb-4 mt-4 w-full pr-3">
                      <label
                        htmlFor="lastname"
                        className="block text-gray-700 font-semibold text-sm mb-2"
                      >
                        Last Name:
                      </label>
                      <Field type="text" id="last_name" name="last_name" placeholder="Enter Last Name" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      <ErrorMessage name="last_name" component="div" className="text-sm text-red-600" />

                    </div>
                  </div>

                  <div className="w-full flex flex-wrap justify-between">
                    <div className="mb-4 mt-4 w-full pr-3">
                      <label
                        htmlFor="firstname"
                        className="block text-gray-700 font-semibold text-sm mb-2"
                      >
                        Email:
                      </label>
                      <Field type="text" id="email" name="email" placeholder="Enter Email Address" className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      <ErrorMessage name="email" component="div" className="text-sm text-red-600" />

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
                      "Add Admin"
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
};

export default Admin;
