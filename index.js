export const mockUsers = [
  {
    id: 1,
    name: "Arbaz Khan",
    email: "arbaz@superadmin.com",
    role: "super_admin",
    wallet_balance: 50000,
    parent_id: null,
    kyc_status: "verified",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    name: "Rajesh Sharma",
    email: "rajesh@admin.com",
    role: "admin",
    wallet_balance: 25000,
    parent_id: 1,
    kyc_status: "verified",
    created_at: "2024-02-01",
  },
  {
    id: 3,
    name: "Priya Singh",
    email: "priya@agent.com",
    role: "agent",
    wallet_balance: 5000,
    parent_id: 2,
    kyc_status: "pending",
    created_at: "2024-02-15",
  },
];

export const mockTransactions = [
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

export const protectedRoute = [
  "/dashboard",
  "/payin",
  "/payout",
  "/transactions",
  "/users",
  "/commission",
  "/reports",
  "/kyc",
  "/members",
  "/settings",
  "/employee-management",
  "/wallet",
  "/all-kyc",
  "/add-fund",
];

import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Users,
  Percent,
  BarChart3,
  Shield,
  FileText,
  Settings,
  User,
  BadgeIndianRupee,
} from "lucide-react";

export const navbarTitleConfig = {
  "/dashboard": {
    title: "Dashboard",
    tagLine: "Overview of your system",
    icon: BarChart3,
  },
  "/add-fund": {
    title: "Payin",
    tagLine: "Manage incoming transactions",
    icon: BadgeIndianRupee,
  },
  "/payout": {
    title: "Payout",
    tagLine: "Manage outgoing transactions",
    icon: ArrowDownCircle,
  },
  "/transactions": {
    title: "Transactions",
    tagLine: "All payment history",
    icon: FileText,
  },
  "/members": {
    title: "Members",
    tagLine: "Manage all members",
    icon: User,
  },
  "/users": {
    title: "Users",
    tagLine: "Manage your platform users",
    icon: Users,
  },
  "/commission": {
    title: "Commission Settings",
    tagLine: "Configure your commission rates",
    icon: Percent,
  },
  "/reports": {
    title: "Reports",
    tagLine: "Analytics & insights",
    icon: BarChart3,
  },
  "/all-kyc": {
    title: "KYC Verification",
    tagLine: "Verify your customers",
    icon: Shield,
  },
  "/wallet": {
    title: "Wallet",
    tagLine: "Wallet Management System",
    icon: Wallet,
  },
  "/settings": {
    title: "Settings",
    tagLine: "Manage application settings",
    icon: Settings,
  },
};
