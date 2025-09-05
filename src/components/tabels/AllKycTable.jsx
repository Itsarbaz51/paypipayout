import React, { useState } from 'react';
import { Search, Eye, Trash2, Filter, Download, Plus, CheckCircle2, X } from 'lucide-react';

const AllKycTable = () => {
  const [search, setSearch] = useState('');

  const kycProfiles = [
    {
      id: 1,
      name: 'Harmeek Singh',
      phone: '7896541236',
      aadhar: '936396732445',
      pan: 'BZMPJ3095G',
      address: 'Di ni ni do Do',
      status: 'Approved',
      joinDate: '2024-01-15',
      avatar: 'HS'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      phone: '9876543210',
      aadhar: '456789123012',
      pan: 'ABCDE1234F',
      address: '123 Main Street, Delhi',
      status: 'Pending',
      joinDate: '2024-02-10',
      avatar: 'PS'
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      phone: '8765432109',
      aadhar: '789012345678',
      pan: 'FGHIJ5678K',
      address: '456 Park Road, Mumbai',
      status: 'Rejected',
      joinDate: '2024-01-28',
      avatar: 'RK'
    }
  ];

  const filteredProfiles = kycProfiles.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search) ||
    user.pan.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Approved': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      'Pending': 'bg-amber-100 text-amber-800 border border-amber-200',
      'Rejected': 'bg-red-100 text-red-800 border border-red-200'
    };
    
    return statusClasses[status] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  return (
    <div className="">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex mb-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Azzunique
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">All Profile KYC</span>
          </nav>

          {/* Page Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">KYC Profiles</h1>
              <p className="text-gray-600 mt-1">Manage and review all KYC submissions</p>
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
                  placeholder="Search by name, phone, or PAN..."
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
                    Profile
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
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
                {filteredProfiles.length > 0 ? (
                  filteredProfiles.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      {/* Profile */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {user.avatar}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">ID: #{user.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{user.phone}</div>
                        <div className="text-xs text-gray-500">Joined {user.joinDate}</div>
                      </td>

                      {/* Documents */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-mono">{user.aadhar}</div>
                        <div className="text-xs text-gray-600 font-mono">{user.pan}</div>
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={user.address}>
                          {user.address}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => handleStatusUpdate(user.id, 'Approved')}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(user.id, 'Rejected')}
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
                            onClick={() => handleDeleteProfile(user.id)}
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
                        <p className="text-xs">Try adjusting your search criteria</p>
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
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredProfiles.length}</span> of{' '}
                <span className="font-medium">{filteredProfiles.length}</span> results
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

export default AllKycTable;