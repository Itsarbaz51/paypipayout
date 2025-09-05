import React, { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Filter,
  Download,
  Plus,
  CheckCircle2,
  X,
  DollarSign,
} from "lucide-react";

const PayoutTable = ({
  title = "Payout Accounts",
  accounts: initialAccounts = [],
  actions = [],
}) => {
  const [search, setSearch] = useState("");
  const [accounts, setAccounts] = useState(
    initialAccounts.length > 0
      ? initialAccounts
      : [
          {
            id: 1,
            name: "Harmeek Singh",
            username: "harmeek_singh",
            phone: "7896541236",
            accHolder: "Harmeek Singh",
            accountNo: "1234567890123456",
            ifsc: "SBIN0001234",
            status: "Pending",
            joinDate: "2024-01-15",
            avatar: "HS",
          },
          {
            id: 2,
            name: "Priya Sharma",
            username: "priya_sharma",
            phone: "9876543210",
            accHolder: "Priya Sharma",
            accountNo: "9876543210987654",
            ifsc: "HDFC0001234",
            status: "Approved",
            joinDate: "2024-02-10",
            avatar: "PS",
          },
          {
            id: 3,
            name: "Rajesh Kumar",
            username: "rajesh_kumar",
            phone: "8765432109",
            accHolder: "Rajesh Kumar",
            accountNo: "5555444433332222",
            ifsc: "ICIC0001234",
            status: "Rejected",
            joinDate: "2024-01-28",
            avatar: "RK",
          },
          {
            id: 4,
            name: "Anjali Patel",
            username: "anjali_patel",
            phone: "9123456789",
            accHolder: "Anjali Patel",
            accountNo: "1111222233334444",
            ifsc: "AXIS0001234",
            status: "Pending",
            joinDate: "2024-02-15",
            avatar: "AP",
          },
          {
            id: 5,
            name: "Vikram Gupta",
            username: "vikram_gupta",
            phone: "8234567890",
            accHolder: "Vikram Gupta",
            accountNo: "7777888899990000",
            ifsc: "PUNB0001234",
            status: "Pending",
            joinDate: "2024-01-20",
            avatar: "VG",
          },
        ]
  );

  const handleStatusUpdate = (accountId, newStatus) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === accountId ? { ...account, status: newStatus } : account
      )
    );
  };

  const handleDeleteAccount = (accountId) => {
    setAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account.id !== accountId)
    );
  };

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.username.toLowerCase().includes(search.toLowerCase()) ||
      acc.phone.includes(search) ||
      acc.accHolder.toLowerCase().includes(search.toLowerCase()) ||
      acc.ifsc.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusClasses = {
      Approved: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      Pending: "bg-amber-100 text-amber-800 border border-amber-200",
      Rejected: "bg-red-100 text-red-800 border border-red-200",
    };

    return (
      statusClasses[status] ||
      "bg-gray-100 text-gray-800 border border-gray-200"
    );
  };

  const maskAccountNumber = (accountNo) => {
    if (!accountNo) return "";
    const visible = accountNo.slice(-4);
    return `****${visible}`;
  };

  return (
    <div className=" bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex mb-4 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Azzunique
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{title}</span>
          </nav>

          {/* Page Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-1">
                Manage payout accounts and bank details
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
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, username, phone, or IFSC..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Filter Button */}
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
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User Profile
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Account Holder
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Bank Details
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((acc) => (
                    <tr
                      key={acc.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* User Profile */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {acc.avatar}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {acc.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              @{acc.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{acc.phone}</div>
                        <div className="text-xs text-gray-500">
                          ID: #{acc.id}
                        </div>
                      </td>

                      {/* Account Holder */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {acc.accHolder}
                        </div>
                        <div className="text-xs text-gray-500">
                          Joined {acc.joinDate}
                        </div>
                      </td>

                      {/* Bank Details */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-mono">
                          {maskAccountNumber(acc.accountNo)}
                        </div>
                        <div className="text-xs text-gray-600 font-mono">
                          {acc.ifsc}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            acc.status
                          )}`}
                        >
                          {acc.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {acc.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(acc.id, "Approved")
                                }
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve Account"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(acc.id, "Rejected")
                                }
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject Account"
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
                            onClick={() => handleDeleteAccount(acc.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {/* Custom Action Buttons */}
                          {actions?.map((btn, i) => (
                            <button
                              key={i}
                              className={`p-2 text-white rounded-lg text-xs transition-colors ${btn.color} hover:opacity-90`}
                              onClick={() => btn.onClick(acc)}
                              title={btn.label}
                            >
                              <DollarSign className="w-4 h-4" />
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Search className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm font-medium">No accounts found</p>
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
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredAccounts.length}</span>{" "}
                of{" "}
                <span className="font-medium">{filteredAccounts.length}</span>{" "}
                results
              </div>

              <div className="flex items-center space-x-1">
                <button
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Previous
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-none">
                  1
                </button>
                <button
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutTable;
