import React, { useState } from "react";
import { Search, Filter, Download, Edit, Save, X } from "lucide-react";

const CommissionCharges = () => {
  const [role, setRole] = useState("PAYOUT CHARGE NEFT");
  const [packageName, setPackageName] = useState("SH");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Example data for NEFT and IMPS charges (can be dynamic)
  const [neftData, setNeftData] = useState([
    { id: 1, from: 1, to: 5000, amount: 10, percent: false },
    { id: 2, from: 5001, to: 10000, amount: 15, percent: false },
    { id: 3, from: 10001, to: 25000, amount: 20, percent: false },
    { id: 4, from: 25001, to: 50000, amount: 25, percent: false },
    { id: 5, from: 50001, to: 100000, amount: 30, percent: false },
    { id: 6, from: 0, to: 0, amount: 0, percent: false },
    { id: 7, from: 0, to: 0, amount: 0, percent: false },
    { id: 8, from: 0, to: 0, amount: 0, percent: false },
    { id: 9, from: 0, to: 0, amount: 0, percent: false },
    { id: 10, from: 0, to: 0, amount: 0, percent: false },
  ]);

  const [impsData, setImpsData] = useState([
    { id: 1, from: 1, to: 2000, amount: 5, percent: true },
    { id: 2, from: 2001, to: 5000, amount: 8, percent: false },
    { id: 3, from: 5001, to: 10000, amount: 12, percent: false },
    { id: 4, from: 10001, to: 25000, amount: 18, percent: false },
    { id: 5, from: 25001, to: 50000, amount: 25, percent: false },
    { id: 6, from: 0, to: 0, amount: 0, percent: false },
    { id: 7, from: 0, to: 0, amount: 0, percent: false },
    { id: 8, from: 0, to: 0, amount: 0, percent: false },
    { id: 9, from: 0, to: 0, amount: 0, percent: false },
    { id: 10, from: 0, to: 0, amount: 0, percent: false },
  ]);

  // Select the data based on role
  const chargesData = role.includes("NEFT") ? neftData : impsData;
  const setChargesData = role.includes("NEFT") ? setNeftData : setImpsData;

  const filteredData = chargesData.filter(
    (item) =>
      item.from.toString().includes(searchTerm) ||
      item.to.toString().includes(searchTerm) ||
      item.amount.toString().includes(searchTerm)
  );

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const updateChargeData = (id, field, value) => {
    const updatedData = chargesData.map((item) =>
      item.id === id
        ? { ...item, [field]: field === "percent" ? value : Number(value) }
        : item
    );
    setChargesData(updatedData);
  };

  return (
    <div className="bg-gray-50  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>Dashboard</span>
          <span className="mx-2">•</span>
          <span className="text-gray-900">Commission and Charges</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Commission and Charges
            </h1>
            <p className="text-gray-600">
              Manage payout charges and commission rates
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role*
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="PAYOUT CHARGE NEFT">PAYOUT CHARGE NEFT</option>
                <option value="PAYOUT CHARGE IMPS">PAYOUT CHARGE IMPS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Package*
              </label>
              <input
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter package name"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{role}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Package: {packageName}
                </p>
              </div>
              <div className="flex gap-3 mt-4 sm:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search charges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SLAB #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    FROM AMOUNT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TO AMOUNT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CHARGE AMOUNT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PERCENTAGE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                          {item.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="number"
                          value={item.from}
                          onChange={(e) =>
                            updateChargeData(item.id, "from", e.target.value)
                          }
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {item.from > 0
                            ? `₹${item.from.toLocaleString()}`
                            : "-"}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="number"
                          value={item.to}
                          onChange={(e) =>
                            updateChargeData(item.id, "to", e.target.value)
                          }
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {item.to > 0 ? `₹${item.to.toLocaleString()}` : "-"}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(e) =>
                            updateChargeData(item.id, "amount", e.target.value)
                          }
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">
                          {item.amount > 0 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              ₹{item.amount}
                            </span>
                          ) : (
                            "-"
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="checkbox"
                          checked={item.percent}
                          onChange={(e) =>
                            updateChargeData(
                              item.id,
                              "percent",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {item.percent ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                              No
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-800 p-1"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredData.length} charge slabs
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Active slabs:{" "}
                {filteredData.filter((item) => item.amount > 0).length}
              </div>
              <div className="text-sm text-gray-600">
                Empty slabs:{" "}
                {filteredData.filter((item) => item.amount === 0).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionCharges;
