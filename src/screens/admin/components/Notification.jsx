import React from "react";
import { NavLink } from "react-router-dom";
import { COLORS, notification } from "../constants/data";

const Notification = () => {
  return (
    <div className="nav-item absolute right-0  md:right-40 top-10 rounded-lg w-full md:w-96">
      <div className="m-5 shadow-lg bg-white rounded-md pb-2 " style={{ maxHeight: '400px', overflow: 'auto' }}>
        <div className="flex justify-between items-center p-5">
          <div>
            <p className="font-bold text-sm text-gray-500">Notifications</p>
            <p className="text-sm text-gray-700 pt-1 pb-1">
              You have 2 unread notifications
            </p>
          </div>
          <i
            className="ri-check-double-line text-lg"
            style={{ color: COLORS.primaryDark }}
          ></i>
        </div>
        
        <div className="mb-3" style={{ borderBottom: 'dashed', borderBottomWidth: 2, borderColor: '#efefef'  }}></div>
        
        {/* Loop through the notification data and render each item */}
        {notification.map((item) => (
          <div className="flex justify-between items-center bg-gray-100 p-4 mb-1">
            <div
              className="bg-gray-300 text-center p-1 pr-2 pl-2 mr-3"
              style={{ borderRadius: "50px" }}
            >
              <i
                className="ri-mail-unread-line text-lg"
                style={{ color: COLORS.primaryDark }}
              ></i>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                <b>You have new mail </b>sent from Ajala Oladayo
              </p>
            </div>
          </div>
        ))}

        <div>
          <div className="mt-3" style={{ borderBottom: 'dashed', borderBottomWidth: 2, borderColor: '#efefef'  }}></div>
          {/* Render a "View All" link */}
          <NavLink>
            <p
              className="text-center text-sm font-bold mt-5 mb-2"
              style={{ color: COLORS.primaryDark }}
            >
              View All
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Notification;
