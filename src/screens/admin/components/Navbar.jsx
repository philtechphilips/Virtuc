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
     
    </div>
  );
};

export default Navbar;
