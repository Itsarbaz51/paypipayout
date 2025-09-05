import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const KYCVerification = ({ currentUser, users, setUsers, setCurrentUser }) => {
  const [kycData, setKycData] = useState({
    pan: "",
    aadhaar: "",
    bank_account: "",
    ifsc: "",
  });

  const handleKYCSubmit = (e) => {
    e.preventDefault();

    // Update user KYC status
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? { ...u, kyc_status: "pending" } : u
    );
    setUsers(updatedUsers);
    setCurrentUser({ ...currentUser, kyc_status: "pending" });

    alert("KYC verification completed successfully!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-red-700">
        KYC Verification
      </h3>

      <div className="mb-4">
        <div
          className={`p-3 rounded-md ${
            currentUser.kyc_status === "verified"
              ? "bg-green-50 border border-green-200"
              : currentUser.kyc_status === "pending"
              ? "bg-yellow-50 border border-yellow-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p
            className={`text-sm ${
              currentUser.kyc_status === "verified"
                ? "text-green-800"
                : currentUser.kyc_status === "pending"
                ? "text-yellow-800"
                : "text-red-800"
            }`}
          >
            KYC Status: {currentUser.kyc_status.toUpperCase()}
          </p>
        </div>
      </div>

      {currentUser.kyc_status !== "verified" && (
        <form onSubmit={handleKYCSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN Number
            </label>
            <input
              type="text"
              value={kycData.pan}
              onChange={(e) =>
                setKycData({ ...kycData, pan: e.target.value.toUpperCase() })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="ABCDE1234F"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aadhaar Number
            </label>
            <input
              type="text"
              value={kycData.aadhaar}
              onChange={(e) =>
                setKycData({ ...kycData, aadhaar: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="1234 5678 9012"
              pattern="[0-9]{4}[\\s][0-9]{4}[\\s][0-9]{4}"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Account Number
            </label>
            <input
              type="text"
              value={kycData.bank_account}
              onChange={(e) =>
                setKycData({ ...kycData, bank_account: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Account Number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              value={kycData.ifsc}
              onChange={(e) =>
                setKycData({ ...kycData, ifsc: e.target.value.toUpperCase() })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="HDFC0000001"
              pattern="[A-Z]{4}0[A-Z0-9]{6}"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Submit for Verification
          </button>
        </form>
      )}

      {currentUser.kyc_status === "verified" && (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-green-800">
            KYC Verified Successfully!
          </h4>
          <p className="text-gray-600">You can now perform payouts</p>
        </div>
      )}
    </div>
  );
};

export default KYCVerification;
