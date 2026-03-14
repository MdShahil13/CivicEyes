import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ReportIssue from "../pages/ReportIssue";
import Helpers from "../pages/Helpers";
import HelperProfile from "../pages/HelperProfile";
import Booking from "../pages/Booking";
import Rating from "../pages/Rating";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<ReportIssue />} />
      <Route path="/helpers" element={<Helpers />} />
      <Route path="/helper-profile" element={<HelperProfile />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/rating" element={<Rating />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;