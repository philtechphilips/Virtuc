import React, { useEffect } from 'react'
import useAuthContext from '../../../context/AuthContext';

const Logout = () => {
    const { logout } = useAuthContext()
    useEffect(() => {
        logout();
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Logout
