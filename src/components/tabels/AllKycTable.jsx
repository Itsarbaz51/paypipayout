import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Filter,
  Download,
  CheckCircle2,
  X,
  Clock,
  Shield,
  FileText,
  MapPin,
  Phone,
  Mail,
  User,
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteKyc, getKycAll, verifyKyc } from "../../redux/slices/kycSlice";
import StateCard from "../ui/StateCard";
import PageHeader from "../ui/PageHeader";

const AllKycTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getKycAll());
  }, []);

  const kycProfilesRaw = useSelector((state) => state.kyc?.kycData);
  const kycProfiles = Array.isArray(kycProfilesRaw) ? kycProfilesRaw : [];

  const filteredProfiles = kycProfiles?.filter((user) => {
    const matchesSearch =
      user.User?.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.User?.phone?.includes(search) ||
      user.panNumber?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || user.kycStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status) => {
    const configs = {
      VERIFIED: {
        classes: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        icon: <Shield className="w-3 h-3" />,
        dot: "bg-emerald-500",
      },
      PENDING: {
        classes: "bg-amber-50 text-amber-700 border border-amber-200",
        icon: <Clock className="w-3 h-3" />,
        dot: "bg-amber-500",
      },
      REJECTED: {
        classes: "bg-red-50 text-red-700 border border-red-200",
        icon: <AlertCircle className="w-3 h-3" />,
        dot: "bg-red-500",
      },
    };

    return (
      configs[status] || {
        classes: "bg-gray-50 text-gray-700 border border-gray-200",
        icon: <FileText className="w-3 h-3" />,
        dot: "bg-gray-500",
      }
    );
  };

  const handleKycVerification = (action, kycId) => {
    if (action === "verified") {
      dispatch(verifyKyc(kycId, "verified"));
    } else if (action === "reject") {
      dispatch(verifyKyc(kycId, "rejected"));
    } else if (action === "delete") {
      dispatch(deleteKyc(kycId));
    }
  };

  const getStatusCounts = () => {
    return {
      total: kycProfiles?.length,
      verified: kycProfiles?.filter((p) => p.kycStatus === "VERIFIED").length,
      pending: kycProfiles?.filter((p) => p.kycStatus === "PENDING").length,
      rejected: kycProfiles?.filter((p) => p.kycStatus === "REJECTED").length,
    };
  };

  const statusCounts = getStatusCounts();
  const statusCards = [
    {
      title: "Total",
      value: statusCounts.total,
      icon: User,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Verified",
      value: statusCounts.verified,
      icon: Shield,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Pending",
      value: statusCounts.pending,
      icon: Clock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Rejected",
      value: statusCounts.rejected,
      icon: AlertCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <PageHeader
            breadcrumb={["Dashboard", "KYC Management"]}
            title="KYC Profiles"
            description="Review and manage customer verification documents"
          />

          {/* Status Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statusCards.map((card, idx) => (
              <StateCard key={idx} {...card} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Enhanced Toolbar */}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or PAN..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[140px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="VERIFIED">Verified</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2.5 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors duration-200">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>
              <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
                  Profile
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
                  Documents
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
                  Location
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProfiles?.length > 0 ? (
                filteredProfiles?.map((kyc) => {
                  const statusConfig = getStatusConfig(kyc.kycStatus);

                  return (
                    <tr
                      key={kyc.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      {/* Enhanced Profile */}
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                              {kyc.kyc?.name?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig.dot} rounded-full border-2 border-white`}
                            ></div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-semibold text-gray-900">
                              {kyc.User?.name || "Unknown User"}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center mt-1">
                              <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                              ID: #{kyc.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Enhanced Contact */}
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                            {kyc.User?.phone || "N/A"}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            {kyc.User?.email || "N/A"}
                          </div>
                        </div>
                      </td>

                      {/* Enhanced Documents */}
                      <td className="px-6 py-5">
                        <div className="space-y-2 flex flex-col">
                          <span className="text-sm text-gray-900 font-mono">
                            {kyc.aadhaarNumber || "****"}
                          </span>
                          <span className="text-sm text-gray-700 font-mono">
                            {kyc.panNumber || "*****"}
                          </span>
                        </div>
                      </td>

                      {/* Enhanced Address */}
                      <td className="px-6 py-5">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-gray-900 max-w-xs">
                            <div
                              className="truncate"
                              title={`${kyc.shopAddress}, ${kyc.district}, ${kyc.state} - ${kyc.pinCode}`}
                            >
                              {kyc.shopAddress}
                            </div>
                            <div className="text-xs text-gray-600 truncate">
                              {kyc.district}, {kyc.state} - {kyc.pinCode}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Enhanced Status */}
                      <td className="px-6 py-5">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.classes}`}
                        >
                          {statusConfig.icon}
                          {kyc.kycStatus}
                        </div>
                      </td>

                      {/* Enhanced Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1">
                          {kyc.kycStatus === "PENDING" && (
                            <>
                              {/* Verified button */}
                              <button
                                onClick={() =>
                                  handleKycVerification("verified", kyc.id)
                                }
                                className="p-2.5 text-gray-400 hover:text-emerald-600 bg-emerald-50 hover:bg-green-100 rounded-lg transition-all duration-200 group"
                                title="Verified KYC"
                              >
                                <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              </button>

                              {/* Reject button */}
                              <button
                                onClick={() =>
                                  handleKycVerification("reject", kyc.id)
                                }
                                className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-100 bg-red-50 rounded-lg transition-all duration-200 group"
                                title="Reject KYC"
                              >
                                <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              </button>
                            </>
                          )}

                          {kyc.kycStatus === "VERIFIED" && (
                            <button
                              onClick={() =>
                                handleKycVerification("reject", kyc.id)
                              }
                              className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-100 bg-red-50 rounded-lg transition-all duration-200 group"
                              title="Reject KYC"
                            >
                              <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                          )}

                          {kyc.kycStatus === "REJECTED" && (
                            <button
                              onClick={() =>
                                handleKycVerification("verified", kyc.id)
                              }
                              className="p-2.5 text-gray-400 hover:text-emerald-600 bg-emerald-50 hover:bg-green-100 rounded-lg transition-all duration-200 group"
                              title="Verified KYC"
                            >
                              <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                          )}

                          <button
                            className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() =>
                              handleKycVerification("delete", kyc.id)
                            }
                            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                            title="Delete Profile"
                          >
                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        No profiles found
                      </p>
                      <p className="text-sm text-gray-600 max-w-sm">
                        {search || statusFilter !== "ALL"
                          ? "Try adjusting your search criteria or filters"
                          : "No KYC profiles have been submitted yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        {filteredProfiles?.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <span>Showing </span>
                <span className="font-semibold mx-1">
                  {filteredProfiles?.length}
                </span>
                <span> of </span>
                <span className="font-semibold mx-1">
                  {kycProfiles?.length}
                </span>
                <span> entries</span>
                {(search || statusFilter !== "ALL") && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    Filtered
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled
                >
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg">
                    1
                  </button>
                </div>
                <button
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllKycTable;
