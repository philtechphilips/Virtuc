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

const Users = () => {
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
                  <h1 className="text-lg font-semibold">Users</h1>
                </div>
                <ToastContainer />
              </div>
              {/* All Administrators */}
              <DataGrid
                className="datagrid bg-white mt-3 w-90"
                rows={data}
                columns={userColumns}
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

export default Users