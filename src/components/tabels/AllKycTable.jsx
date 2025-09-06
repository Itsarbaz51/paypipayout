import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Filter,
  Download,
  CheckCircle2,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getKycAll, verifyKyc, rejectKyc } from "../../redux/slices/kycSlice";

const AllKycTable = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKycAll());
  }, [dispatch]);

  const kycProfiles = useSelector((state) => state.kyc?.kycData) || [];

  const filteredProfiles = kycProfiles?.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.includes(search) ||
      user.panNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusClasses = {
      VERIFIED: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      PENDING: "bg-amber-100 text-amber-800 border border-amber-200",
      REJECTED: "bg-red-100 text-red-800 border border-red-200",
    };

    return (
      statusClasses[status] ||
      "bg-gray-100 text-gray-800 border border-gray-200"
    );
  };

  const handleVerify = (userId) => {
    dispatch(verifyKyc(userId));
  };

  const handleReject = (userId) => {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      dispatch(rejectKyc(userId, reason));
    }
  };

  const handleDeleteProfile = (userId) => {
    // optional: add delete API if needed
    console.log("Delete profile:", userId);
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-8">
        <nav className="flex mb-4 text-sm">
          <span className="text-gray-500">Azzunique</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">All Profile KYC</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">KYC Profiles</h1>
            <p className="text-gray-600 mt-1">
              Manage and review all KYC submissions
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, phone, or PAN..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="inline-flex items-center px-4 py-2.5 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-left">
                  Profile
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-left">
                  Contact
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-left">
                  Documents
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-left">
                  Address
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-left">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProfiles?.length > 0 ? (
                filteredProfiles?.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Profile */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {user.User.name?.[0] || "U"}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {user.User.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            User ID: #{user.userId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{user.User.phone}</div>
                      <div className="text-xs text-gray-500">{user.User.email}</div>
                    </td>

                    {/* Documents */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-mono">
                        Aadhaar: {"*".repeat(8) + user.aadhaarNumber.slice(-4)}
                      </div>
                      <div className="text-xs text-gray-600 font-mono">
                        PAN: {"*".repeat(5) + user.panNumber.slice(-5)}
                      </div>
                    </td>

                    {/* Address */}
                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-gray-900 max-w-xs truncate"
                        title={`${user.shopAddress}, ${user.district}, ${user.state} - ${user.pinCode}`}
                      >
                        {user.shopAddress}, {user.district}, {user.state}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          user.kycStatus
                        )}`}
                      >
                        {user.kycStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.kycStatus === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleVerify(user.userId)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(user.userId)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProfile(user.userId)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Search className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm font-medium">No profiles found</p>
                      <p className="text-xs">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredProfiles?.length}</span> of{" "}
              <span className="font-medium">{filteredProfiles?.length}</span>{" "}
              results
            </div>
            <div className="flex items-center space-x-1">
              <button
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-none">
                1
              </button>
              <button
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg disabled:opacity-50"
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

export default AllKycTable;
