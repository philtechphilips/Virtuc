import React from "react";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";

const AdminIndex = () => {
  return (

    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element="404" />
    </Routes>
  )

};

export default AdminIndex;
