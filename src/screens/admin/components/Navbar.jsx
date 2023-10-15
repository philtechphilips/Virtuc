import React, { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import "remixicon/fonts/remixicon.css";
import { COLORS } from "../constants/data";
import Notification from "./Notification";
// import Profile from "./Profile";
// import useAuthContext from "../../main/context/AuthContext";

// Custom button component for navigation buttons
const NavButton = ({ customFunc, icon, dotColor }) => (
  
  <button
    type="button"
    onClick={customFunc}
    className="relative text-xl rounded-full p-3 ho bg-light-gray"
  >
    <span
      className="absolute inline-flex rounded-full h-2 w-2 right-3 top-4"
      style={{ background: dotColor }}
    ></span>
    <i className={icon} style={{ color: COLORS.primaryDark }}></i>
  </button>
);

// Navbar component
const Navbar = () => {
  // const { user } = useAuthContext();
  // Accessing state variables and update functions from the context
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    isClicked,
    isClickedProfile,
    handleClick,
    handleClickProfile,
  } = useStateContext();

  // UseEffect for handling window resize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // UseEffect for updating active menu based on screen size
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      {/* Menu button */}
      <NavButton
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        icon="ri-menu-line"
      />
      <div className="flex items-end">
        {/* Notification button */}
        <NavButton
          customFunc={() => handleClick()}
          icon="ri-notification-4-line"
          dotColor={COLORS.dangerDark}
        />
        {/* Profile button */}
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClickProfile()}
        >
          <img
            className="rounded-full w-10 h-10"
            src="https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
            alt="Profile"
          ></img>
          <p>
            <span className="text-gray-400 text-14">Hi, </span>{" "}
            <span className="text-gray-400 ml-1 font-bold text-14">
              Isola Pelumi
            </span>
          </p>
          <i className="ri-arrow-down-s-line text-gray-400 text-14"></i>
        </div>
        {/* Render Notification component based on isClicked state */}
        {isClicked && <Notification />}
        {/* Render Profile component based on isClickedProfile state */}
        {/* {isClickedProfile && <Profile />} */}
      </div>
    </div>
  );
};

export default Navbar;
