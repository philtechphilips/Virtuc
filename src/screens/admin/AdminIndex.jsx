import React from "react";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import AddCTA from "./pages/AddCTA";

const AdminIndex = () => {
  return (

    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/administrators" element={<Admin />} />
      <Route path="/users" element={<Users />} />
      <Route path="/add-cta" element={<AddCTA />} />
      <Route path="*" element="404" />
    </Routes>
  )

};

export default AdminIndex;
