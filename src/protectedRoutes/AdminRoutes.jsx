import { useEffect, useState, useMemo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';

const AdminLayout = () => {
  const { user, setUser } = useAuthContext([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [setUser]);

  const outletOrLogin = useMemo(() => {
    return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
  }, [user]);

  if (loading) {
    return null; // or render a loading indicator
  }

  return outletOrLogin;
};

export default AdminLayout;
