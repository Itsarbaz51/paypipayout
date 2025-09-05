import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [commissionSettings, setCommissionSettings] = useState({
    super_admin: 0.5,
    admin: 1.0,
    agent: 2.0,
  });

  // Mock Data Initialize
  useEffect(() => {
    const mockUsers = [];

    const mockTransactions = [
      {
        id: 1,
        user_id: 3,
        type: "payin",
        amount: 2000,
        status: "success",
        razorpay_order_id: "order_123",
        commission: 40,
        created_at: "2024-08-29 10:30:00",
      },
      {
        id: 2,
        user_id: 3,
        type: "payout",
        amount: 1500,
        status: "processing",
        razorpay_payout_id: "payout_456",
        commission: 30,
        created_at: "2024-08-29 11:15:00",
      },
    ];

    setUsers(mockUsers);
    setTransactions(mockTransactions);

    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setCurrentUser(mockUsers[0]); // Default login as Super Admin
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Create router with current app state
  const router = createRouter({
    currentUser,
    transactions,
    users,
    commissionSettings,
    setTransactions,
    setUsers,
    setCurrentUser,
    setCommissionSettings,
    handleLogin,
    handleLogout,
  });

  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
      <RouterProvider router={router} /> ;
    </Provider>
  );
};

export default App;
