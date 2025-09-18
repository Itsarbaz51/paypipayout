import { useState } from "react";
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
  User,
  Phone,
  CreditCard,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  BanknoteArrowDown,
} from "lucide-react";
import { PayoutForm } from "../forms/PayoutForm";
import ButtonField from "../ui/ButtonField";
import AccountVerificationForm from "../forms/AccountVerificationForm";

const PageHeader = ({ breadcrumb, title, description }) => (
  <div>
    <nav className="text-sm mb-2">
      {breadcrumb.map((item, index) => (
        <span key={index} className="text-blue-600">
          {item}
          {index < breadcrumb.length - 1 && (
            <span className="text-gray-400 mx-2">/</span>
          )}
        </span>
      ))}
    </nav>
    <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PayoutTable = ({
  title = "Payout Accounts",
  accounts: initialAccounts = [],
  actions = [],
}) => {
  const [search, setSearch] = useState("");
  const [showFormMordel, setShowFormMordel] = useState(false);
  const [showAccountVerificationForm, setShowAccountVerificationForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
      Approved:
        "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200",
      Pending:
        "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200",
      Rejected:
        "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200",
    };

    return (
      statusClasses[status] ||
      "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200"
    );
  };

  const maskAccountNumber = (accountNo) => {
    if (!accountNo) return "";
    const visible = accountNo.slice(-4);
    return `****${visible}`;
  };

  return (
    <div className="">
      {showFormMordel && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <PayoutForm onClose={() => setShowFormMordel(false)} />
        </div>
      )}
      {showAccountVerificationForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <AccountVerificationForm onClose={() => setShowAccountVerificationForm(false)} />
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <PageHeader
            breadcrumb={["Dashboard", "Payout"]}
            title="Payout Accounts"
            description="Manage payout accounts and bank details with modern interface"
          />
          <div className="flex gap-3">
            <ButtonField
              type="submit"
              isDisabled={loading}
              icon={Plus}
              isOpen={() => setShowAccountVerificationForm(true)}
              name={"Add Account"}
            />
            <ButtonField
              type="submit"
              isDisabled={loading}
              icon={BanknoteArrowDown}
              isOpen={() => setShowFormMordel(true)}
              name={"Payout"}
            />
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden backdrop-blur-sm">
        {/* Enhanced Toolbar */}
        <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Enhanced Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search accounts, names, or bank details..."
                className="w-full pl-12 pr-4 py-4 border border-blue-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Enhanced Filter Button */}
            <button className="inline-flex items-center px-6 py-4 text-blue-700 bg-white/80 backdrop-blur-sm hover:bg-white border border-blue-200 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-xl font-bold text-gray-900">
                    {accounts.filter((acc) => acc.status === "Approved").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-xl font-bold text-gray-900">
                    {accounts.filter((acc) => acc.status === "Pending").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-xl font-bold text-gray-900">
                    {accounts.filter((acc) => acc.status === "Rejected").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <th className="text-left px-8 py-6 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  User Profile
                </th>
                <th className="text-left px-8 py-6 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="text-left px-8 py-6 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Account Details
                </th>
                <th className="text-left px-8 py-6 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Bank Information
                </th>
                <th className="text-left px-8 py-6 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-8 py-6 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((acc) => (
                  <tr
                    key={acc.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                  >
                    {/* User Profile */}
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform">
                          {acc.avatar}
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {acc.name}
                          </p>
                          <p className="text-sm text-blue-600 font-medium">
                            @{acc.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-8 py-6">
                      <div className="flex items-center mb-2">
                        <Phone className="w-4 h-4 text-blue-500 mr-2" />
                        <div className="text-sm font-semibold text-gray-900">
                          {acc.phone}
                        </div>
                      </div>
                      <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-lg inline-block">
                        ID: #{acc.id}
                      </div>
                    </td>

                    {/* Account Holder */}
                    <td className="px-8 py-6">
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 text-blue-500 mr-2" />
                        <div className="text-sm font-semibold text-gray-900">
                          {acc.accHolder}
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        Joined {new Date(acc.joinDate).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Bank Details */}
                    <td className="px-8 py-6">
                      <div className="flex items-center mb-2">
                        <CreditCard className="w-4 h-4 text-blue-500 mr-2" />
                        <div className="text-sm font-bold text-gray-900 font-mono bg-gray-100 px-3 py-1 rounded-lg">
                          {maskAccountNumber(acc.accountNo)}
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Building2 className="w-3 h-3 mr-1" />
                        <span className="font-mono font-semibold">
                          {acc.ifsc}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${getStatusBadge(
                          acc.status
                        )}`}
                      >
                        {acc.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {acc.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(acc.id, "Approved")
                              }
                              className="p-3 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-110"
                              title="Approve Account"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(acc.id, "Rejected")
                              }
                              className="p-3 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-110"
                              title="Reject Account"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button
                          className="p-3 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-110"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(acc.id)}
                          className="p-3 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-110"
                          title="Delete Account"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        {/* Custom Action Buttons */}
                        {actions?.map((btn, i) => (
                          <button
                            key={i}
                            className={`p-3 text-white rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-110 ${btn.color} hover:opacity-90`}
                            onClick={() => btn.onClick(acc)}
                            title={btn.label}
                          >
                            <DollarSign className="w-5 h-5" />
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-8 py-16 text-center">
                    <div className="text-gray-500">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-10 h-10 text-blue-300" />
                      </div>
                      <p className="text-lg font-semibold text-gray-600 mb-2">
                        No accounts found
                      </p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search criteria or add a new account
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        <div className="px-8 py-6 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-medium">
              Showing <span className="font-bold text-blue-600">1</span> to{" "}
              <span className="font-bold text-blue-600">
                {filteredAccounts.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-blue-600">
                {filteredAccounts.length}
              </span>{" "}
              results
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                disabled
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                1
              </button>
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                disabled
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutTable;
