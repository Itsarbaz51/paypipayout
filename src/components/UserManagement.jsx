import React, { useState } from "react";
import {
  UserPlus,
  Eye,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  X,
  RefreshCw,
  Trash2,
} from "lucide-react";

const UserManagement = ({ currentUser, users, setUsers }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "agent",
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const canManageUsers =
    currentUser.role === "super_admin" || currentUser.role === "admin";

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (currentUser.role === "super_admin") return matchesSearch;
    if (currentUser.role === "admin")
      return (
        (user.parent_id === currentUser.id || user.id === currentUser.id) &&
        matchesSearch
      );
    return user.id === currentUser.id && matchesSearch;
  });

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) return;

    const user = {
      id: users.length + 1,
      ...newUser,
      wallet_balance: 0,
      parent_id:
        currentUser.role === "super_admin"
          ? newUser.role === "admin"
            ? currentUser.id
            : null
          : currentUser.id,
      kyc_status: "pending",
      created_at: new Date().toISOString(),
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "agent" });
    setShowForm(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "super_admin":
        return "bg-orange-100 text-orange-600";
      case "admin":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-green-100 text-green-600";
    }
  };

  const getKycColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-red-100 text-red-600";
    }
  };

  return (
    <div className="bg-gray-50  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>Azzunique</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">User Management</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-600">
              Manage user accounts and permissions
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            {canManageUsers && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Account
              </button>
            )}
          </div>
        </div>

        {/* Create User Form */}
        {showForm && (
          <div className="bg-white rounded-lg border border-gray-200 mb-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New User
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {currentUser.role === "super_admin" && (
                    <option value="admin">Admin</option>
                  )}
                  <option value="agent">Agent</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create User
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Search and Filter Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, username, phone, or IFSC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    USER PROFILE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CONTACT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROLE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    WALLET BALANCE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`h-10 w-10 rounded-full ${getAvatarColor(
                            user.name
                          )} flex items-center justify-center text-white font-medium text-sm`}
                        >
                          {getInitials(user.name)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{user.name.toLowerCase().replace(/\s+/g, "_")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">
                        ID: #{user.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role === "super_admin"
                          ? "Super Admin"
                          : user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹{user.wallet_balance.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getKycColor(
                          user.kyc_status
                        )}`}
                      >
                        {user.kyc_status.charAt(0).toUpperCase() +
                          user.kyc_status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <X className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600 p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1 to {filteredUsers.length} of {filteredUsers.length}{" "}
              results
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                1
              </button>
              <button
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
