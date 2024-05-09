import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import AddCar from "../pages/AddCar";
import Listings from "../pages/Listings";
import Bookings from "../pages/Bookings";
import Settings from "../pages/Settings";
import SellerList from "../pages/SellerList";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" element={<Dashboard />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-car" element={<AddCar />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/seller" element={<SellerList />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default Router;
