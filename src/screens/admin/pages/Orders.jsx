import { useEffect } from "react";
import { useState } from "react";
import "./table.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from "@mui/x-data-grid";
import apiService from "../../../api/apiRequests";
import ReactModal from "react-modal";
import ChangeOrderStatus from "../components/ChangeOrderStatus";
import Skeleton from "react-loading-skeleton";
import TableLoading from "../components/TableLoading";
import { useNavigate } from "react-router-dom";
import OrderDetails from "./OrderDetails";



const Orders = () => {
    const [data, setData] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ordersToBeShown, setOrdersToBeShown] = useState("All");
    const [selectedOrderId, setSelectedOrderId] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedPaymentReference, setSelectedPaymentReference] = useState("");
    const [isViewOrderDeatils, setIsViewOrderDetails] = useState(false);
    const [isViewOrderFullDeatils, setIsViewOrderFullDetails] = useState(false);
    const { activeMenu } = useStateContext();
    const navigate = useNavigate();

    const handleOrderClick = (order) => {
        setOrdersToBeShown(order);
    };

    const viewOrderDetails = (orderId, paymentReference) => {
        setSelectedOrderId(orderId);
        setSelectedPaymentReference(paymentReference);
        setIsViewOrderDetails(!isViewOrderDeatils);
    };

    const viewFullOrderDetails = (order) => {
        console.log(order)
        setSelectedOrder(order);
        setIsViewOrderFullDetails(true)
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await apiService.fetchOrders(user.token);
                console.log(response.data.payload)
                if (ordersToBeShown === "All") {
                    setData(response.data.payload);
                } else {
                    const filteredOrders = response.data.payload.filter(
                        (order) => order.orderStatus === ordersToBeShown
                    );
                    setData(filteredOrders)
                }
            } catch (error) {
                toast.error("Something went wrong!");
            } finally {
                setIsLoading(false);
            }
        }
        fetchProduct();
    }, [ordersToBeShown, isViewOrderDeatils]);

    const userColumns = [
        {
            field: "product",
            headerName: "Product",
            width: 400,
            renderCell: (params) => {
                return <div className="cellWithImg">{params.row.productId.title}</div>;
            },
        },
        {
            field: "orderId",
            headerName: "Order Id",
            width: 200
        },
        {
            field: "paymentReference",
            headerName: "Payment Reference",
            width: 200
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
            renderCell: (params) => {
                return <div className="bg-yellow-500 text-amber-900 font-bold text-xs py-2 px-4 rounded">{params.row.orderStatus}</div>;
            },
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
                            onClick={() => viewFullOrderDetails(params.row)}
                        >
                            View Order Details
                        </button>

                        <button
                            type="button"
                            className={`deleteButton ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                                }`}
                            onClick={() => viewOrderDetails(params.row.orderId, params.row.paymentReference)}
                        >
                            Change Status
                        </button>
                    </div>
                );
            },
        },
    ];

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
                        <div className="flex w-full md:w-1/2 justify-between items-center">
                            <h1 className="text-lg font-semibold mb-4">Orders</h1>
                        </div>
                        <div className="flex gap-3">
                            <div
                                className={`bg-white cursor-pointer px-4 py-2 ${ordersToBeShown === 'All' ? 'border-2 border-green-500' : ''
                                    }`}
                                onClick={() => handleOrderClick('All')}
                            >
                                <h5 className="text-sm font-semibold text-gray-700">All</h5>
                            </div>
                            <div
                                className={`bg-white cursor-pointer px-4 py-2 ${ordersToBeShown === 'Pending' ? 'border-2 border-green-500' : ''
                                    }`}
                                onClick={() => handleOrderClick('Pending')}
                            >
                                <h5 className="text-sm font-semibold text-gray-700">Pending</h5>
                            </div>
                            <div
                                className={`bg-white cursor-pointer px-4 py-2 ${ordersToBeShown === 'Received' ? 'border-2 border-green-500' : ''
                                    }`}
                                onClick={() => handleOrderClick('Received')}
                            >
                                <h5 className="text-sm font-semibold text-gray-700">Received</h5>
                            </div>
                            <div
                                className={`bg-white cursor-pointer px-4 py-2 ${ordersToBeShown === 'Delivered' ? 'border-2 border-green-500' : ''
                                    }`}
                                onClick={() => handleOrderClick('Delivered')}
                            >
                                <h5 className="text-sm font-semibold text-gray-700">Delivered</h5>
                            </div>
                            <div
                                className={`bg-white cursor-pointer px-4 py-2 ${ordersToBeShown === 'Failed' ? 'border-2 border-green-500' : ''
                                    }`}
                                onClick={() => handleOrderClick('Failed')}
                            >
                                <h5 className="text-sm font-semibold text-gray-700">Failed</h5>
                            </div>
                        </div>
                        {/* All Administrators */}
                        {isLoading ? (
                            <div className="mt-3">
                                <TableLoading />
                            </div>
                        ) : (
                            <DataGrid
                                className="datagrid bg-white mt-3 w-90"
                                rows={data}
                                columns={userColumns.concat(actionColumn)}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                getRowId={(row) => row._id}
                            />
                        )}
                    </div>
                </div>
            </div>
            <ChangeOrderStatus orderId={selectedOrderId} paymentReference={selectedPaymentReference} isModalOpen={isViewOrderDeatils} setIsViewOrderDetails={setIsViewOrderDetails} />
            <OrderDetails order={selectedOrder} isModalOpen={isViewOrderFullDeatils} setIsViewOrderDetails={setIsViewOrderFullDetails} />
            <ToastContainer />
        </div>
    );
}

export default Orders
