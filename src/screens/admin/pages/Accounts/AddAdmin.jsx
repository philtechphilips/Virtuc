// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { COLORS } from "../../constants/data";
// import useAuthContext from "../../../main/context/AuthContext";
// import axios from "../../../main/api/axios";
// import FlashMessage from "../../components/FlashMessage";

// const AddAdmin = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleHideMessage = () => {
//     setSuccess("");
//   };

//   const { user } = useAuthContext();
//   const token = user.token;
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   function handleSubmit(event) {
//     event.preventDefault();
//     const AdminProfile = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.post(
//           "/create-admin-profile",
//           {
//             name,
//             phone,
//             email,
//           },
//           { headers }
//         );
//         if (response.status === 200) {
//           setName("");
//           setPhone("");
//           setEmail("");
//           setErrors([]);
//           setSuccess(response.data.message);
//         }
//       } catch (e) {
//         console.log(e);
//         if (e.response.status === 422) {
//           setErrors(e.response.data.errors);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     AdminProfile();
//   }

//   return (
//     <div className="h-screen w-full p-5 pt-24 md:p-10">
//       <div className="bg-white p-5">
//         <div className="flex justify-between items-center">
//           <h1 className="text-lg font-semibold">Add Administrator</h1>
//           <Link
//             to="/administrator/admin-users"
//             className="text-white text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             style={styles}
//           >
//             View Admins
//           </Link>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {success != "" && (
//             <FlashMessage
//               type="success"
//               message={success}
//               onHideMessage={handleHideMessage}
//             />
//           )}
//           <div className="mb-4 mt-4">
//             <label
//               htmlFor="name"
//               className="block text-gray-700 font-semibold text-sm mb-2"
//             >
//               Full Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter Full Name"
//               className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {errors.name && (
//               <p className="text-sm text-red-500">{errors.name[0]}</p>
//             )}
//           </div>

//           <div className="mb-4 mt-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 font-semibold text-sm mb-2"
//             >
//               Email Address:
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter E-Mail Address"
//               className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {errors.email && (
//               <p className="text-sm text-red-500">{errors.email[0]}</p>
//             )}
//           </div>

//           <div className="mb-4 mt-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 font-semibold text-sm mb-2"
//             >
//               Phone:
//             </label>
//             <input
//               type="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter Phone Number"
//               className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {errors.phone && (
//               <p className="text-sm text-red-500">{errors.phone[0]}</p>
//             )}
//           </div>

//           <button
//             disabled={isLoading}
//             type="submit"
//             style={{
//               backgroundColor: COLORS.primary,
//               color: "#fff",
//               borderRadius: "3px",
//             }}
//             className={`text-sm font-medium p-3 hover:drop-shadow-xl pl-5 pr-5 ${
//               isLoading && "cursor-not-allowed"
//             }`}
//           >
//             {isLoading ? (
//               <div className="flex items-center px-3">
//                 <div className=" inset-0 flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-r-2 border-white"></div>
//                 </div>{" "}
//                 <span className="text-sm font-medium ml-2">Submitting..</span>
//               </div>
//             ) : (
//               "Add Administrator"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddAdmin;
// const styles = {
//   backgroundColor: COLORS.primary,
//   ":hover": {
//     backgroundColor: COLORS.primaryDark,
//     // add other hover properties here
//   },
// };