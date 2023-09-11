import React from 'react'
import useAuthContext from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import apiService from '../api/apiRequests'

const AuthenticatedRoutes = () => {
    const  user  = JSON.parse(localStorage.getItem('user'))
    if(user){
      const token = user.token;
      const userTokenExpTimestamp = user.tokenExp; 
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000); 
  
      const timeDifferenceInSeconds = userTokenExpTimestamp - currentTimestampInSeconds;
      const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  
      if(timeDifferenceInMinutes < 60 && timeDifferenceInMinutes > 0){
        const refreshToken = async () => {
          try {
            const response = await apiService.refreshToken({token});
            const userResponse = {
              role: response.data.payload.role,
              email: response.data.payload.email,
              first_name: response.data.payload.first_name,
              last_name: response.data.payload.last_name,
              token: response.data.token,
              tokenExp: response.data.tokenExp,
            };
            localStorage.setItem("user", JSON.stringify(userResponse));
          } catch (error) {
           console.log(error)
          }
        }
        refreshToken()
      }else if(timeDifferenceInMinutes < 0){
        localStorage.removeItem("user")
      }
    }
    return (
      user ? <Outlet /> : <Navigate to="/auth/verify-identity" />
    )
}

export default AuthenticatedRoutes