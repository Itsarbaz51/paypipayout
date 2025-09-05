import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ currentUser, onLogout }) => {
  return (
    <div className=" min-h-screen">
      {/* Sidebar */}
      <Sidebar currentUser={currentUser} onLogout={onLogout} />

      {/* Main content */}
      <div className="ml-64 flex flex-col h-screen">
        <Navbar />

        {/* Page Content rendered by Router */}
        <div className="flex-1 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 p-6 overflow-auto">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
