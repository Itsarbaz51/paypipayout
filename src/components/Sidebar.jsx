import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  ArrowDownCircle,
  FileText,
  Shield,
  Users,
  Percent,
  Settings,
  Play,
  LogOut,
  Wallet,
  BadgeIndianRupee,
} from "lucide-react";

const Sidebar = ({ currentUser, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    // --- MAIN ---
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      path: "/dashboard",
      group: "main",
    },
    {
      id: "add-fund",
      label: "Add Fund",
      icon: BadgeIndianRupee,
      path: "/add-fund",
      group: "main",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: FileText,
      path: "/transactions",
      group: "main",
    },
    {
      id: "members",
      label: "Members",
      icon: Users,
      path: "/members",
      group: "main",
    },
    {
      id: "commission",
      label: "Commission",
      icon: Percent,
      path: "/commission",
      group: "main",
    },

    // --- SERVICE (non-admin) ---
    {
      id: "payout",
      label: "Payouts",
      icon: ArrowDownCircle,
      path: "/payout",
      group: "service",
    },

    // --- ADMIN ONLY ---
    {
      id: "kyc",
      label: "KYC Requests",
      icon: Shield,
      path: "/all-kyc",
      group: "admin",
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: Wallet,
      path: "/wallet",
      group: "admin",
    },
    {
      id: "employee-management",
      label: "Employee Management",
      icon: Users,
      path: "/employee-management",
      group: "admin",
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      path: "/reports",
      group: "admin",
    },

    // --- SYSTEM ---
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/settings",
      group: "system",
    },
  ];

  const isAdmin = currentUser.role === "ADMIN";

  // Filter menus by role
  const mainItems = menuItems.filter((item) => {
    if (isAdmin && item.id === "add-fund") return false; // Admins don’t need "Add Fund"
    return item.group === "main";
  });

  const adminItems = isAdmin
    ? menuItems.filter((item) => item.group === "admin")
    : [];
  const systemItems = isAdmin
    ? menuItems.filter((item) => item.group === "system")
    : [];
  const serviceItems = !isAdmin
    ? menuItems.filter((item) => item.group === "service")
    : [];

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <Link
        to={item.path}
        className={`group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive ? "bg-gray-200 shadow-xs" : "hover:bg-gray-300"
        }`}
      >
        <Icon
          className={`h-5 w-5 mr-3 transition-transform duration-200 ${
            isActive ? "scale-110" : "group-hover:scale-105"
          }`}
        />
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  const MenuSection = ({ title, items }) =>
    items.length > 0 && (
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-3">
          {title}
        </h3>
        <div className="space-y-1">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );

  const formattedRole = currentUser.role
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="w-64 flex flex-col fixed h-screen border-r border-gray-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center">
            <Play className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Payment System</h2>
            <p className="text-xs">{formattedRole} Panel</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4">
        <div className="backdrop-blur-sm rounded-xl p-4 border text-black border-gray-600/30">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{currentUser.name}</p>
              <p className="text-xs capitalize truncate">{formattedRole}</p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Wallet Balance</span>
              <Wallet className="h-3 w-3" />
            </div>
            <p className="text-sm font-semibold mt-1">
              ₹{currentUser?.walletBalance?.toLocaleString() || "0"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        <MenuSection title="Main" items={mainItems} />
        {isAdmin && <MenuSection title="Administration" items={adminItems} />}
        {isAdmin && <MenuSection title="System" items={systemItems} />}
        {!isAdmin && <MenuSection title="Services" items={serviceItems} />}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700/50">
        <button
          onClick={onLogout}
          className="w-full cursor-pointer hover:bg-red-200 flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 mr-3 group-hover:scale-105 transition-transform duration-200" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
