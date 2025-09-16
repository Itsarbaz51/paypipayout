import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ currentUser, onLogout }) => {
  return (
    <div className="">
      <Sidebar currentUser={currentUser} onLogout={onLogout} />
      <div className="ml-64 flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6 overflow-auto">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
