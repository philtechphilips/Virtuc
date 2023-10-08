import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiRequests";
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const [errorsEmail, setErrorsEmail] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [wishList, setWishList] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const viewedProduct = JSON.parse(localStorage.getItem("recentlyViewed"));
    setRecentlyViewed(viewedProduct)
    if (userDetails) {
      const token = userDetails.token;
      const userDetailsTokenExpTimestamp = userDetails.tokenExp;
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

      const timeDifferenceInSeconds = userDetailsTokenExpTimestamp - currentTimestampInSeconds;
      const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;

      if (timeDifferenceInMinutes < 60 && timeDifferenceInMinutes > 0) {
        const refreshToken = async () => {
          try {
            const response = await apiService.refreshToken({ token });
            const userResponse = {
              role: response.data.payload.role,
              email: response.data.payload.email,
              first_name: response.data.payload.first_name,
              last_name: response.data.payload.last_name,
              token: response.data.token,
              tokenExp: response.data.tokenExp,
            };
            setUser(userResponse);
            localStorage.setItem("user", JSON.stringify(userResponse));
          } catch (error) {
            console.log(error)
          }
        }
        refreshToken()
      } else if (timeDifferenceInMinutes < 0) {
        localStorage.removeItem("user")
      }
    }

    setUser(userDetails);
  }, []);



  const register = async ({ ...data }) => {
    setIsSubmitting(true);
    console.log(data)
    try {
      const response = await axios.post("/users/create-account", data);
      if (response.status === 201) {
        setIsSubmitting(false);
        navigate("/auth/email-verification", { state: { email: data.email } })
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response.status === 400) {
        setErrors(error.response.data.message);
      }
    }
  };

  const logout = async ({ ...data }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token; // extract token from localStorage
      await axios.post("/auth/logout", data, {
        headers: {
          Authorization: `Bearer ${token}`, // set Authorization header with token value
        },
      });
      //   console.log(response);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/sign-in");
    } catch (error) {
      //   console.log(error);
    }
  };

  const login = async ({ ...data }) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/users/login", data);
      if (response.status === 200) {
        const userResponse = {
          role: response.data.payload.role,
          email: response.data.payload.email,
          first_name: response.data.payload.first_name,
          last_name: response.data.payload.last_name,
          token: response.data.token,
          tokenExp: response.data.tokenExp,
        };
        setUser(userResponse);
        localStorage.setItem("user", JSON.stringify(userResponse));
        Cookies.set('user', JSON.stringify(userResponse), { expires: 7 });
        setIsSubmitting(false);
      }
      navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.message === "Please confirm your email to login.") {
          navigate("/auth/email-verification", { state: { email: data.email } })
        }
        setErrors(error.response.data.message);
        setIsSubmitting(false);
      } else if (error.response.status === 422) {
        setErrors("Invalid Login Credentials");
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        register,
        errorsEmail,
        isSubmitting,
        activeCategory,
        setActiveCategory,
        activeCategoryId,
        setActiveCategoryId,
        recentlyViewed,
        setRecentlyViewed,
        setUser,
        login,
        logout,
        setIsSubmitting,
        setErrors,
        wishList,
        setWishList,
        cart,
        setCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}