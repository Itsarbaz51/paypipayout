import React, { useState } from "react";
import {
  CheckCircle,
  Upload,
  User,
  CreditCard,
  Building,
  FileText,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { kycSubmit } from "../../redux/slices/kycSlice";
import { useNavigate } from "react-router-dom";
import { addBank } from "../../redux/slices/bankSlice";

const KYCVerification = ({ currentUser, users, setUsers, setCurrentUser }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [kycData, setKycData] = useState({
    panNumber: "",
    aadhaarNumber: "",
    fatherName: "",
    dob: "",
    homeAddress: "",
    shopName: "",
    shopAddress: "",
    district: "",
    pinCode: "",
    state: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    panImage: null,
    aadhaarImageFront: null,
    aadhaarImageBack: null,
    shopAddressImage: null,
    passbookImage: null,
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
  ];

  const kycStatusOptions = {
    not_started: { color: "red", label: "NOT STARTED" },
    pending: { color: "yellow", label: "PENDING REVIEW" },
    verified: { color: "green", label: "VERIFIED" },
    rejected: { color: "red", label: "REJECTED" },
  };

  const handleInputChange = (field, value) => {
    setKycData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (field, file) => {
    if (!file) return;

    // only image check
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, [field]: "Only image files allowed" }));
      return;
    }

    // max 150KB check
    if (file.size > 150 * 1024) {
      setErrors((prev) => ({ ...prev, [field]: "File too large (max 150KB)" }));
      return;
    }

    // store file object directly (NOT base64)
    setKycData((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const tabs = [
    { id: "personal", label: "Personal Details", icon: User },
    { id: "shop", label: "Shop Details", icon: Building },
    { id: "bank", label: "Bank Details", icon: CreditCard },
    { id: "documents", label: "Documents", icon: Upload },
  ];

  const tabFieldsMap = {
    personal: [
      "panNumber",
      "aadhaarNumber",
      "fatherName",
      "dob",
      "homeAddress",
    ],
    shop: ["shopName", "shopAddress", "district", "pinCode", "state"],
    bank: ["accountHolder", "accountNumber", "ifscCode", "bankName"],
    documents: [
      "panImage",
      "aadhaarImageFront",
      "aadhaarImageBack",
      "shopAddressImage",
      "passbookImage",
    ],
  };

  const validateCurrentTab = () => {
    const currentFields = tabFieldsMap[activeTab];
    const newErrors = {};

    currentFields.forEach((field) => {
      if (!kycData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentTab()) {
      const nextIndex = tabs.findIndex((t) => t.id === activeTab) + 1;
      if (nextIndex < tabs.length) {
        setActiveTab(tabs[nextIndex].id);
      }
    } else {
      alert("Please fix errors before moving to the next step.");
    }
  };

  const handlePrev = () => {
    const prevIndex = tabs.findIndex((t) => t.id === activeTab) - 1;
    if (prevIndex >= 0) {
      setActiveTab(tabs[prevIndex].id);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKYCSubmit = async () => {
    const allErrors = {};
    Object.values(tabFieldsMap)
      .flat()
      .forEach((field) => {
        if (!kycData[field]) {
          allErrors[field] = "This field is required";
        }
      });
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      alert("Fix all validation errors before submitting.");
      return;
    }

    try {
      const kycForm = new FormData();
      [
        "panNumber",
        "aadhaarNumber",
        "fatherName",
        "dob",
        "homeAddress",
        "shopName",
        "shopAddress",
        "district",
        "pinCode",
        "state",
        "panImage",
        "aadhaarImageFront",
        "aadhaarImageBack",
        "shopAddressImage",
        "passbookImage",
      ].forEach((key) => {
        kycForm.append(key, kycData[key]);
      });

      const bankForm = new FormData();
      [
        "accountHolder",
        "accountNumber",
        "ifscCode",
        "bankName",
        "passbookImage",
      ].forEach((key) => {
        bankForm.append(key, kycData[key]);
      });

      // --- Call both APIs in parallel ---
      const [kycRes, bankRes] = await Promise.all([
        dispatch(kycSubmit(kycForm)),
        dispatch(addBank(bankForm)),
      ]);

      console.log("KYC response:", kycRes);
      console.log("Bank response:", bankRes);

      if (
        kycRes.data.kycStatus === "PENDING" &&
        bankRes.data.isVerified === false
      ) {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting KYC/Bank:", error);
      alert("Submission failed. Please try again.");
    }
  };

  const FileUploadComponent = ({ field, label, required = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`border-2 border-dashed p-4 text-center rounded-lg ${
          errors[field]
            ? "border-red-500 bg-red-50"
            : "border-gray-300 hover:border-gray-500"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          id={field}
          className="hidden"
          onChange={(e) => handleFileUpload(field, e.target.files[0])}
        />
        <label htmlFor={field} className="cursor-pointer">
          {kycData[field] ? (
            <div className="text-green-600">✓ Uploaded</div>
          ) : (
            <div className="text-gray-500">{label}</div>
          )}
        </label>
      </div>
      {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
    </div>
  );

  if (currentUser?.isKyc) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h4 className="text-2xl font-semibold text-green-800 mb-2">
          KYC Verified!
        </h4>
        <p className="text-gray-600">All verification steps completed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-6">
        <div className="flex gap-3 mb-4">
          <FileText className="h-8 w-8" />
          <h3 className="text-xl font-bold">KYC Verification</h3>
        </div>
        <p>
          Status:{" "}
          <span
            className={`font-bold text-${
              kycStatusOptions[currentUser?.isKyc]?.color
            }-600`}
          >
            {kycStatusOptions[currentUser?.isKyc]?.label}
          </span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 font-semibold"
                : ""
            }`}
          >
            <tab.icon className="mx-auto h-5 w-5 mb-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {activeTab === "personal" && (
          <>
            <div>
              <label>PAN Number*</label>
              <input
                type="text"
                maxLength={10}
                value={kycData.panNumber}
                onChange={(e) => {
                  let value = e.target.value.toUpperCase();
                  handleInputChange("panNumber", value);
                }}
                className="w-full border p-2 rounded border-gray-300"
              />
            </div>
            <div>
              <label>Aadhaar Number*</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={12}
                value={kycData.aadhaarNumber}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  handleInputChange("aadhaarNumber", value);
                }}
                className="w-full border p-2 rounded border-gray-300"
              />
            </div>

            <div>
              <label>Father's Name*</label>
              <input
                value={kycData.fatherName}
                onChange={(e) =>
                  handleInputChange("fatherName", e.target.value)
                }
                className={`w-full border p-2 rounded ${
                  errors.fatherName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fatherName && (
                <p className="text-red-500 text-xs">{errors.fatherName}</p>
              )}
            </div>
            <div>
              <label>Date of Birth*</label>
              <input
                type="date"
                value={kycData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs">{errors.dob}</p>
              )}
            </div>
            <div>
              <label>Home Address*</label>
              <textarea
                value={kycData.homeAddress}
                onChange={(e) =>
                  handleInputChange("homeAddress", e.target.value)
                }
                className={`w-full border p-2 rounded ${
                  errors.homeAddress ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.homeAddress && (
                <p className="text-red-500 text-xs">{errors.homeAddress}</p>
              )}
            </div>
          </>
        )}

        {activeTab === "shop" && (
          <>
            <div>
              <label>Shop Name*</label>
              <input
                value={kycData.shopName}
                onChange={(e) => handleInputChange("shopName", e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.shopName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.shopName && (
                <p className="text-red-500 text-xs">{errors.shopName}</p>
              )}
            </div>
            <div>
              <label>Shop Address*</label>
              <textarea
                value={kycData.shopAddress}
                onChange={(e) =>
                  handleInputChange("shopAddress", e.target.value)
                }
                className={`w-full border p-2 rounded ${
                  errors.shopAddress ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.shopAddress && (
                <p className="text-red-500 text-xs">{errors.shopAddress}</p>
              )}
            </div>
            <div>
              <label>District*</label>
              <input
                value={kycData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.district ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.district && (
                <p className="text-red-500 text-xs">{errors.district}</p>
              )}
            </div>
            <div>
              <label>PIN Code*</label>
              <input
                type="number"
                maxLength={6}
                value={kycData.pinCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 6) {
                    handleInputChange("pinCode", value);
                  }
                }}
                className={`w-full border p-2 rounded ${
                  errors.pinCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.pinCode && (
                <p className="text-red-500 text-xs">{errors.pinCode}</p>
              )}
            </div>
            <div>
              <label>State*</label>
              <select
                value={kycData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select State</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs">{errors.state}</p>
              )}
            </div>
          </>
        )}

        {activeTab === "bank" && (
          <>
            <div>
              <label>Account Holder*</label>
              <input
                value={kycData.accountHolder}
                onChange={(e) =>
                  handleInputChange("accountHolder", e.target.value)
                }
                className={`w-full border p-2 rounded ${
                  errors.accountHolder ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.accountHolder && (
                <p className="text-red-500 text-xs">{errors.accountHolder}</p>
              )}
            </div>
            <div>
              <label>Account Number*</label>
              <input
                value={kycData.accountNumber}
                onChange={(e) =>
                  handleInputChange("accountNumber", e.target.value)
                }
                className={`w-full border p-2 rounded ${
                  errors.accountNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs">{errors.accountNumber}</p>
              )}
            </div>
            <div>
              <label>IFSC Code*</label>
              <input
                value={kycData.ifscCode}
                onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.ifscCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.ifscCode && (
                <p className="text-red-500 text-xs">{errors.ifscCode}</p>
              )}
            </div>
            <div>
              <label>Bank Name</label>
              <input
                value={kycData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                className="w-full border p-2 rounded border-gray-300"
              />
            </div>
          </>
        )}

        {activeTab === "documents" && (
          <>
            <FileUploadComponent field="panImage" label="PAN Card" required />
            <FileUploadComponent
              field="aadhaarImageFront"
              label="Aadhaar Front"
              required
            />
            <FileUploadComponent
              field="aadhaarImageBack"
              label="Aadhaar Back"
              required
            />
            <FileUploadComponent
              field="shopAddressImage"
              label="Shop Address Proof"
              required
            />
            <FileUploadComponent field="passbookImage" label="Bank Passbook" />
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between p-6 border-t border-gray-200">
        <button
          disabled={activeTab === "personal"}
          onClick={handlePrev}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Previous
        </button>
        {activeTab !== "documents" ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleKYCSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit KYC
          </button>
        )}
      </div>
    </div>
  );
};

export default KYCVerification;
