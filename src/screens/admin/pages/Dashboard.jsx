import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import apiService from "../../../api/apiRequests";
import { ToastContainer, toast } from "react-toastify";
import { revenue } from "../../../utils";
import Skeleton from "react-loading-skeleton";
import ChangeOrderStatus from "../components/ChangeOrderStatus";
import OrderDetails from "./OrderDetails";
import TableLoading from "../components/TableLoading";
import { DataGrid } from "@mui/x-data-grid";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ordersToBeShown, setOrdersToBeShown] = useState("All");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPaymentReference, setSelectedPaymentReference] = useState("");
  const [isViewOrderDeatils, setIsViewOrderDetails] = useState(false);
  const [isViewOrderFullDeatils, setIsViewOrderFullDetails] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true)
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await apiService.fetchDashboard(user.token);
        console.log(response.data.payload)
        setData(response.data.payload);
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboard();
  }, []);
  const { activeMenu } = useStateContext();


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


          <div className="mt-25 mr-3" style={{ paddingBottom: "150px" }}>
            <div className="flex flex-wrap gap-4 pt-20 px-5 md:p-10">
              {isLoading ? (
                <>
                  <Skeleton className="py-10 w-72" />
                  <Skeleton className="py-10 w-72" />
                  <Skeleton className="py-10 w-72" />
                  <Skeleton className="py-10 w-72" />
                  <Skeleton className="py-10 w-72" />
                  <Skeleton className="py-10 w-72" />
                </>
              ) : (
                <>
                  <div className="bg-white p-5 rounded w-full md:w-72 shadow flex flex-col gap-1">
                    <p className="font-semibold text-gray-500">Orders</p>
                    <h2 className="text-3xl font-bold">{data && data.ordersCount}</h2>
                  </div>

                  <div className="bg-white p-5 rounded w-full md:w-72 shadow flex flex-col gap-1">
                    <p className="font-semibold text-gray-500">Products</p>
                    <h2 className="text-3xl font-bold">{data && data.productsCount}</h2>
                  </div>

                  <div className="bg-white p-5 rounded w-full md:w-72 shadow flex flex-col gap-1">
                    <p className="font-semibold text-gray-500">Revenue</p>
                    <h2 className="text-3xl font-bold">{data && data.payments && revenue(data.payments)}</h2>
                  </div>

                  <div className="bg-white p-5 rounded w-full md:w-72 shadow flex flex-col gap-1">
                    <p className="font-semibold text-gray-500">Users</p>
                    <h2 className="text-3xl font-bold">{data && data.usersCount}</h2>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white px-2 py-1 mt-3 mx-5 md:mx-10">
              <p className="font-semibold">Recent Orders</p>
            </div>

            <div className="py-5 mx-5 md:mx-10">
              {isLoading ? (
                <div className="mt-3">
                  <TableLoading />
                </div>
              ) : data && data.recentOrders && data.recentOrders.length > 0 ? (
                <DataGrid
                  className="datagrid bg-white mt-3 w-90"
                  rows={data.recentOrders}
                  columns={userColumns.concat(actionColumn)}
                  pageSize={9}
                  rowsPerPageOptions={[9]}
                  getRowId={(row) => row._id}
                />
              ) : (
                <p className="text-red-600 font-semibold">No Pending Orders</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChangeOrderStatus orderId={selectedOrderId} paymentReference={selectedPaymentReference} isModalOpen={isViewOrderDeatils} setIsViewOrderDetails={setIsViewOrderDetails} />
      <OrderDetails order={selectedOrder} isModalOpen={isViewOrderFullDeatils} setIsViewOrderDetails={setIsViewOrderFullDetails} />
      <ToastContainer />
    </div>

  );
};

export default Dashboard;

