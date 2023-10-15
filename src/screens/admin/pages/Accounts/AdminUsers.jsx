// import "./../table.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "../../../main/api/axios";
// import useAuthContext from "../../../main/context/AuthContext";
// import Swal from "sweetalert2";
// import FlashMessage from "../../components/FlashMessage";

// const AdminUsers = () => {
//   const [data, setData] = useState([]);
//   const [success, setSuccess] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { user } = useAuthContext();
//   const token = user.token;
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   const userColumns = [
//     {
//       field: "name",
//       headerName: "Name",
//       width: 330,
//       renderCell: (params) => {
//         return <div className="cellWithImg">{params.row.name}</div>;
//       },
//     },

//     {
//       field: "email",
//       headerName: "Email",
//       width: 280,
//     },

//     {
//       field: "phone",
//       headerName: "Phone",
//       width: 200,
//     },
//   ];

//   useEffect(() => {
//     axios
//       .get("/all-admin", { headers })
//       .then((response) => {
//         setData(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setIsSubmitting(true);
//         axios
//           .delete("/delete-admin/" + id, { headers })
//           .then((response) => {
//             setSuccess(response.data.message);
//             setData(data.filter((item) => item.id !== id));
//             setIsSubmitting(false);
//             Swal.fire("Deleted!", "User details has been deleted.", "success");
//           })
//           .catch((error) => {
//             setIsSubmitting(false);
//             console.error(error);
//           });
//       }
//     });
//   };

//   const handleHideMessage = () => {
//     setSuccess("");
//   };

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             <Link to="/users/test" style={{ textDecoration: "none" }}>
//               <div className="viewButton">View Details</div>
//             </Link>
//             <button
//               type="button"
//               className={`deleteButton ${
//                 isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
//               }`}
//               onClick={() => handleDelete(params.row.id)}
//               disabled={isSubmitting}
//             >
//               Delete
//             </button>
//           </div>
//         );
//       },
//     },
//   ];
//   return (
//     <div className="w-full flex justify-center pt-20 md:mt-0 ">
//       <div className="datatable pb-20 mb-40">
//         <div className="datatableTitle">
//           <p className="text-lg font-semibold text-gray-950">Administrators</p>
//           <Link to="/administrator/add-admin-users" className="link">
//             Add New Administrators
//           </Link>
//         </div>
//         {success != "" && (
//           <FlashMessage
//             type="success"
//             message={success}
//             onHideMessage={handleHideMessage}
//           />
//         )}
//         <DataGrid
//           className="datagrid bg-white mt-3"
//           rows={data}
//           columns={userColumns.concat(actionColumn)}
//           pageSize={9}
//           rowsPerPageOptions={[9]}
//           getRowId={(row) => row.id}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;
