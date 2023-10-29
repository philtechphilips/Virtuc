import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { Menus } from "../constants/data";
import { useStateContext } from "../context/ContextProvider";
import {
  BsChevronDown,
} from "react-icons/bs";



const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  // const { user } = useAuthContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false)
    }
  }
  const location = useLocation();
  const activePage = location.pathname;
  const [activeLink, setActiveLink] = useState('');
  const [subMenuOpen, setSubMenuOpen] = useState(null);

  useEffect(() => {
    setActiveLink(activePage);
  }, [activePage]);

  const handleSubmenuClick = (menuTitle) => {
    setSubMenuOpen((prevSubMenu) =>
      prevSubMenu === menuTitle ? null : menuTitle
    );
  };
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 pr-3">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center pt-5">
            <Link
              to="/dashboard"
              onClick={handleCloseSideBar}
              className="flex items-center "
            >
              VirtuC

            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              className="rounded-full p-3 hover:bg-light-gray mt-4  block  md:hidden"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <Link
            to="/administrator/dashboard"
            className="flex items-center bg-gray-200 p-2 mt-5 rounded"
          >
            <p className="text-black text-md font-bold ml-4">Isola Pelumi</p>
          </Link>

          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <React.Fragment key={index}>
                <li
                  className={`flex  rounded-md p-2 cursor-pointer ${activeLink === Menu.src ? 'bg-gray-200' : ''} hover:bg-gray-200 text-gray-900 text-sm font-bold items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"}  `}
                  onClick={() => handleSubmenuClick(Menu.title)}
                >
                  <i className={Menu.icon}></i>
                  <NavLink className="flex-1" onClick={!Menu.subMenus && handleCloseSideBar}>
                    {Menu.title}
                  </NavLink>
                  {Menu.subMenus && (
                    <BsChevronDown
                      className={`${subMenuOpen === Menu.title && "rotate-180"
                        }`}
                    />
                  )}
                </li>

                {Menu.subMenus && subMenuOpen === Menu.title && (
                  <ul>
                    {Menu.subMenus.map((subMenuItem, idx) => (
                      <li
                        key={idx}
                        className={`flex px-4 cursor-pointer text-center text-sm text-gray-700 py-3 ${activeLink === subMenuItem.src ? 'bg-gray-200' : ''}`}
                      >
                        <NavLink to={subMenuItem.src} onClick={handleCloseSideBar}>
                          <i className="ri-donut-chart-line pr-3"></i>
                          {subMenuItem.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
