import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  User,
  Phone,
  Eye,
  Edit,
  UserMinus,
  Settings,
  LogIn,
  Plus,
  MoreVertical,
  X,
  Mail,
  Wallet,
  Users,
} from "lucide-react";
import AddMember from "../forms/AddMember";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getUserById,
  updateUserStates,
} from "../../redux/slices/userSlice";
import UserProfilePage from "../../pages/UserProfilePage ";

const MembersTable = () => {
  const [search, setSearch] = useState("");
  const [showform, setShowform] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const { users: usersData, isLoading } = useSelector((state) => state.user);

  const users = Array.isArray(usersData) ? usersData : [];

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case "STATE_HOLDER":
        return "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300";
      case "MASTER_DISTRIBUTOR":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300";
      case "DISTRIBUTOR":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300";
      case "AGENT":
        return "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border-amber-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300";
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "STATE_HOLDER":
        return "State Holder";
      case "MASTER_DISTRIBUTOR":
        return "Master Distributor";
      case "DISTRIBUTOR":
        return "Distributor";
      case "AGENT":
        return "Agent";
      default:
        return role;
    }
  };
  const handleMenuAction = (action, user, userData) => {
    if (action === "status") {
      dispatch(updateUserStates(user.id, userData));
    } else if (action === "view") {
      dispatch(getUserById(user.id));
      setShowViewProfile(true);
    }
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2 tracking-tight">
                  Members Management
                </h1>
                <p className="text-blue-100 text-lg">
                  Manage your team members and their access levels
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {filteredUsers?.length || 0} Members
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Add Member */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                Team Members
              </h2>
              <p className="text-gray-600">Manage and monitor your team</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search members..."
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64 bg-gray-50 focus:bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => setShowform(true)}
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                    Member
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                    Wallet
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {isLoading && (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4 mx-auto"></div>
                      <p className="text-gray-500">Loading members...</p>
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredUsers?.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all"
                    >
                      <td className="px-6 py-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">
                              {user.name}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Mail className="w-3 h-3 mr-1" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center text-sm text-gray-700">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {user.phone}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {getRoleDisplayName(user.role)}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2">
                          <Wallet className="w-4 h-4 text-gray-400" />
                          <span
                            className={`text-sm font-semibold ${
                              user.walletBalance > 0
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            ₹{user.walletBalance?.toLocaleString() || 0}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                            user.status === "IN_ACTIVE"
                              ? "bg-red-100 text-red-800 border-red-300"
                              : "bg-green-100 text-green-800 border-green-300"
                          }`}
                        >
                          {user.status === "IN_ACTIVE"
                            ? "Inactive"
                            : user.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center relative">
                        <div ref={menuRef} className="inline-block">
                          <button
                            className="p-2 rounded-full hover:bg-gray-100"
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === user.id ? null : user.id
                              )
                            }
                          >
                            {openMenuId === user.id ? (
                              <X className="w-5 h-5 text-gray-600" />
                            ) : (
                              <MoreVertical className="w-5 h-5 text-gray-600" />
                            )}
                          </button>

                          {openMenuId === user.id && (
                            <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-lg w-48 z-50 border border-gray-200">
                              <button
                                onClick={() => handleMenuAction("login", user)}
                                className="flex items-center w-full px-4 py-3 text-sm hover:bg-blue-50"
                              >
                                <LogIn className="w-4 h-4 mr-3 text-blue-500" />
                                Login as User
                              </button>
                              <button
                                onClick={() =>
                                  handleMenuAction("services", user)
                                }
                                className="flex items-center w-full px-4 py-3 text-sm hover:bg-green-50"
                              >
                                <Settings className="w-4 h-4 mr-3 text-green-500" />
                                Manage Services
                              </button>
                              <button
                                onClick={() => handleMenuAction("view", user)}
                                className="flex items-center w-full px-4 py-3 text-sm hover:bg-purple-50"
                              >
                                <Eye className="w-4 h-4 mr-3 text-purple-500" />
                                View Details
                              </button>
                              <button
                                onClick={() => handleMenuAction("edit", user)}
                                className="flex items-center w-full px-4 py-3 text-sm hover:bg-amber-50"
                              >
                                <Edit className="w-4 h-4 mr-3 text-amber-500" />
                                Edit Member
                              </button>
                              <div className="border-t border-gray-100"></div>

                              <button
                                onClick={() =>
                                  handleMenuAction("status", user, {
                                    status:
                                      user.status === "IN_ACTIVE"
                                        ? "ACTIVE"
                                        : "IN_ACTIVE",
                                  })
                                }
                                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                              >
                                {user.status === "IN_ACTIVE"
                                  ? "Activate"
                                  : "Deactivate"}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showform && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <AddMember onClose={() => setShowform(false)} />
        </div>
      )}
      {showViewProfile && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <UserProfilePage onClose={() => setShowViewProfile(false)} />
        </div>
      )}
    </div>
  );
};

export default MembersTable;
