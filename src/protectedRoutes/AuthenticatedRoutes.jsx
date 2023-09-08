import React from 'react'
import useAuthContext from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AuthenticatedRoutes = () => {
    const  user  = JSON.parse(localStorage.getItem('user'))
    return (
      user ? <Outlet /> : <Navigate to="/auth/verify-identity" />
    )
}

export default AuthenticatedRoutes