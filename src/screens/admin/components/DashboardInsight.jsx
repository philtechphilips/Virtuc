import React, { useEffect, useState } from "react";
import { COLORS, analytics } from "../constants/data";
// import axios from "../../main/api/axios";
// import useAuthContext from "../../main/context/AuthContext";

const DashboardInsight = () => {
  const [dashboardInsight, setDashboardInsight] = useState([]);
  // const { user } = useAuthContext();
  // const token = user.token;
  // const headers = {
  //   Authorization: `Bearer ${token}`,
  // };

  // useEffect(() => {
  //   const getStudents = async () => {
  //     try {
  //       const response = await axios.get("/dashboard", { headers });
  //       setDashboardInsight(response.data);
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getStudents();
  // }, []);
  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white h-44 rounded-xl w-full lg:w-80 p-8 pt-9 mr-3 ml-5 md:ml-10 mt-20 bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400 text-sm pb-1">
                No. of Pending Orders
              </p>
              <p className="text-2xl pb-2">40</p>
              <div>
                <button
                  type="button"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: "#fff",
                    borderRadius: "3px",
                  }}
                  className="text-sm font-medium p-3 hover:drop-shadow-xl"
                >
                  Manage Orders
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex m-3 flex-wrap w-full justify-center gap-1 items-center">
          {analytics.map((item) => (
            <div
              key={item.title}
              className="bg-white text-center md:w-56 w-40 p-4 pt-9 rounded-2xl"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span
                  className="text-lg font-semibold"
                  amount={dashboardInsight}
                >
                  {item.amount}
                </span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardInsight;
