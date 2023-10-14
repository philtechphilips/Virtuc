import React, { createContext, useContext, useState } from "react";

// Create a context using createContext() from React
const StateContext = createContext();

// ContextProvider component that wraps the child components and provides the state values and functions through the context
export const ContextProvider = ({ children }) => {
  // Define state values using useState() hook
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedProfile, setIsProfileClicked] = useState(false);

  // Event handler for toggling isClicked state value
  const handleClick = (event) => {
    setIsClicked(!isClicked);
    // If isClickedProfile is true, set it to false to ensure only one state value is true at a time
    if (isClickedProfile === true) {
      setIsProfileClicked(false);
    }
  };

  // Event handler for toggling isClickedProfile state value
  const handleClickProfile = (event) => {
    setIsProfileClicked(!isClickedProfile);
    // If isClicked is true, set it to false to ensure only one state value is true at a time
    if (isClicked === true) {
      setIsClicked(false);
    }
  };

  // Provide the state values and functions through the context using StateContext.Provider
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        isClicked,
        setIsClicked,
        handleClick,
        isClickedProfile,
        handleClickProfile,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the state values and functions from the context
export const useStateContext = () => useContext(StateContext);
