import React from "react";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import AddCTA from "./pages/AddCTA";
import Categories from "./pages/Categories";
import AddCategoryItems from "./pages/AddCategoryItems";
import Banners from "./pages/Banners";
import FeaturedProducts from "./pages/FeaturedProducts";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";

const AdminIndex = () => {
  return (

    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/administrators" element={<Admin />} />
      <Route path="/users" element={<Users />} />
      <Route path="/add-cta" element={<AddCTA />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category-type" element={<AddCategoryItems />} />
      <Route path="/banners" element={<Banners />} />
      <Route path="/featured-product" element={<FeaturedProducts />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element="404" />
    </Routes>
  )

};

export default AdminIndex;
