import React, { useState } from "react";

const CommissionSettings = ({ commissionSettings, setCommissionSettings }) => {
  const [tempSettings, setTempSettings] = useState(commissionSettings);

  const handleSaveCommission = () => {
    setCommissionSettings(tempSettings);
    alert("Commission settings updated successfully!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-red-700">
        Commission Settings
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Super Admin Commission (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={tempSettings.super_admin}
            onChange={(e) =>
              setTempSettings({
                ...tempSettings,
                super_admin: parseFloat(e.target.value),
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Lowest commission rate for super admin
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Commission (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={tempSettings.admin}
            onChange={(e) =>
              setTempSettings({
                ...tempSettings,
                admin: parseFloat(e.target.value),
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Commission rate for admins
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent Commission (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={tempSettings.agent}
            onChange={(e) =>
              setTempSettings({
                ...tempSettings,
                agent: parseFloat(e.target.value),
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Highest commission rate for agents
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-md">
          <h4 className="font-medium text-red-800 mb-2">Commission Preview</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Super Admin:</span>
              <span className="font-medium">{tempSettings.super_admin}%</span>
            </div>
            <div className="flex justify-between">
              <span>Admin:</span>
              <span className="font-medium">{tempSettings.admin}%</span>
            </div>
            <div className="flex justify-between">
              <span>Agent:</span>
              <span className="font-medium">{tempSettings.agent}%</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveCommission}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
        >
          Save Commission Settings
        </button>
      </div>
    </div>
  );
};

export default CommissionSettings;
