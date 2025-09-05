import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import PayinComponent from "../components/PayinComponent";
import UserManagement from "../components/UserManagement";
import TransactionHistory from "../components/TransactionHistory";
import Reports from "../components/Reports";

import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/landing/Home";
import About from "../pages/landing/About";
import Contact from "../pages/landing/Contact";

import AllKycTable from "../components/tabels/AllKycTable";
import PayoutTable from "../components/tabels/PayoutTable";
// import CommissionCharges from "../components/sh/CommissionCharges";
import Setting from "../components/Setting";
import EmployeeTable from "../components/tabels/EmployeeTable";
import MembersTable from "../components/tabels/MembersTable";
import WalletTable from "../components/tabels/Wallet";
import Register from "../pages/auth/Register";

export const createRouter = (appProps) => {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route
            path="login"
            element={
              appProps.currentUser ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login users={appProps.users} onLogin={appProps.handleLogin} />
              )
            }
          />
        </Route>

        {/* Protected Routes with Main Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute currentUser={appProps.currentUser}>
              <MainLayout
                currentUser={appProps.currentUser}
                onLogout={appProps.handleLogout}
              />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <Dashboard
                currentUser={appProps.currentUser}
                transactions={appProps.transactions}
                users={appProps.users}
                commissionSettings={appProps.commissionSettings}
              />
            }
          />

          <Route
            path="payin"
            element={
              <PayinComponent
                currentUser={appProps.currentUser}
                transactions={appProps.transactions}
                setTransactions={appProps.setTransactions}
                users={appProps.users}
                setUsers={appProps.setUsers}
                setCurrentUser={appProps.setCurrentUser}
                commissionSettings={appProps.commissionSettings}
              />
            }
          />

          <Route
            path="payout"
            element={
              <PayoutTable
                currentUser={appProps.currentUser}
                transactions={appProps.transactions}
                setTransactions={appProps.setTransactions}
                users={appProps.users}
                setUsers={appProps.setUsers}
                setCurrentUser={appProps.setCurrentUser}
                commissionSettings={appProps.commissionSettings}
              />
            }
          />

          <Route
            path="transactions"
            element={
              <TransactionHistory
                currentUser={appProps.currentUser}
                transactions={appProps.transactions}
                users={appProps.users}
              />
            }
          />

          <Route
            path="users"
            element={
              <UserManagement
                currentUser={appProps.currentUser}
                users={appProps.users}
                setUsers={appProps.setUsers}
              />
            }
          />

          {/* <Route
            path="commission"
            element={
              <CommissionCharges
                commissionSettings={appProps.commissionSettings}
                setCommissionSettings={appProps.setCommissionSettings}
              />
            }
          /> */}

          <Route
            path="reports"
            element={
              <Reports
                currentUser={appProps.currentUser}
                transactions={appProps.transactions}
                users={appProps.users}
              />
            }
          />

          <Route
            path="kyc"
            element={
              <AllKycTable
                currentUser={appProps.currentUser}
                users={appProps.users}
                setUsers={appProps.setUsers}
                setCurrentUser={appProps.setCurrentUser}
              />
            }
          />

          <Route
            path="members"
            element={
              <MembersTable
                currentUser={appProps.currentUser}
                users={appProps.users}
                setUsers={appProps.setUsers}
                setCurrentUser={appProps.setCurrentUser}
              />
            }
          />

          <Route
            path="settings"
            element={
              <Setting
                currentUser={appProps.currentUser}
                users={appProps.users}
                setUsers={appProps.setUsers}
                setCurrentUser={appProps.setCurrentUser}
              />
            }
          />

          <Route
            path="employee-management"
            element={
              <EmployeeTable
                currentUser={appProps.currentUser}
                users={appProps.users}
                setUsers={appProps.setUsers}
                setCurrentUser={appProps.setCurrentUser}
              />
            }
          />
          <Route
            path="wallet"
            element={
              <WalletTable
                currentUser={appProps.currentUser}
                users={appProps.users}
                setUsers={appProps.setUsers}
                setCurrentUser={appProps.setCurrentUser}
              />
            }
          />
        </Route>

        {/* Catch all route */}
        <Route
          path="*"
          element={
            <Navigate to={appProps.currentUser ? "/dashboard" : "/"} replace />
          }
        />
      </>
    )
  );
};
