import React, { useState } from "react";
import {
  Search,
  User,
  Phone,
  Mail,
  Wallet,
  Eye,
  Edit,
  UserMinus,
  Settings,
  LogIn,
  Plus,
} from "lucide-react";
import AddMember from "../forms/AddMember";

const MembersTable = () => {
  const [search, setSearch] = useState("");
  const [showform, setShowform] = useState(false);

  const users = [
    {
      id: 1,
      name: "harmeek Singh",
      username: "AZU3158358586",
      phone: "7896541236",
      email: "harmeek@gmail.com",
      role: "State Head",
      wallet: 996066,
    },
    {
      id: 2,
      name: "Navindra Singh",
      username: "AZU9578552905",
      phone: "7300389828",
      email: "navindra@ecuzen.com",
      role: "Master Distributor",
      wallet: 0,
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case "State Head":
        return "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-200";
      case "Master Distributor":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className=" ">
      <div className="">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Members Management</h1>
              <p className="text-slate-300">
                Manage your team members and their access
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <User className="w-5 h-5" />
              <span className="text-sm">{filteredUsers.length} Members</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Team Members
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search members..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="bg-blue-500 text-white flex p-3 rounded cursor-pointer" onClick={() => setShowform(true)}>
              <Plus />
              Add Memeber
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Member Details
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center">
                      <Wallet className="w-4 h-4 mr-2" />
                      Wallet
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200"
                  >
                    <td className="px-6 py-5 text-sm font-medium text-gray-900">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                          {user.username}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" />
                          {user.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <Mail className="w-3 h-3 mr-2 text-gray-400" />
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${
                            user.wallet > 0 ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                        <span
                          className={`text-sm font-semibold ${
                            user.wallet > 0 ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          ₹{user.wallet.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="group p-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                          <LogIn className="w-4 h-4" />
                        </button>
                        <button className="group p-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="group p-2 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="group p-2 bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="group p-2 bg-gradient-to-r from-gray-400 to-slate-500 hover:from-gray-500 hover:to-slate-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <User className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-gray-500 text-lg">
                          No members found
                        </p>
                        <p className="text-gray-400 text-sm">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <span>Showing </span>
                <span className="font-semibold text-gray-800 mx-1">1</span>
                <span>to </span>
                <span className="font-semibold text-gray-800 mx-1">
                  {filteredUsers.length}
                </span>
                <span>of </span>
                <span className="font-semibold text-gray-800 mx-1">
                  {filteredUsers.length}
                </span>
                <span>entries</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  1
                </button>
                <button
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showform && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/10 z-50 backdrop-blur-xs"
        
        >
          <AddMember onClose={() => setShowform(false)} />
        </div>
      )}
    </div>
  );
};

export default MembersTable;
