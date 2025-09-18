import { useState } from "react";
import axios from "axios";
import {
  User,
  CreditCard,
  Building2,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  FileImage,
} from "lucide-react";
import Title from "../ui/Title";
import CloseBtn from "../ui/CloseBtn";
import { addBankWithVerify } from "../../redux/slices/bankSlice";
import { useDispatch } from "react-redux";

const AccountVerificationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    passbookImage: null,
  });

  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        passbookImage: file,
      }));
      setErrors((prev) => ({
        ...prev,
        passbookImage: "",
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          passbookImage: file,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accountHolder.trim()) {
      newErrors.accountHolder = "Customer name is required";
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    } else if (formData.accountNumber.length < 9) {
      newErrors.accountNumber = "Account number must be at least 9 digits";
    }
    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code format";
    }
    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }
    if (!formData.passbookImage) {
      newErrors.passbookImage = "Passbook picture is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("accountHolder", formData.accountHolder);
      data.append("accountNumber", formData.accountNumber);
      data.append("ifscCode", formData.ifscCode);
      data.append("bankName", formData.bankName);
      data.append("passbookImage", formData.passbookImage);

      console.log(data);
      

      dispatch(addBankWithVerify(data));

    //   alert("Bank account verified successfully!");
    //   onClose();
    } catch (error) {
      console.error(error.response?.data || error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while verifying bank."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl space-y-4">
        <div className="flex justify-between space-y-3.5">
          <Title />
          <CloseBtn isClose={onClose} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Bank Account Details
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Customer Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                Customer Name
              </label>
              <input
                type="text"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.accountHolder
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
              />
              {errors.accountHolder && (
                <p className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.accountHolder}
                </p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                Account Number
              </label>
              <div className="relative">
                <input
                  type={showAccountNumber ? "text" : "password"}
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${
                    errors.accountNumber
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowAccountNumber(!showAccountNumber)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showAccountNumber ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.accountNumber && (
                <p className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.accountNumber}
                </p>
              )}
            </div>

            {/* IFSC Code */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                IFSC Code
              </label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                placeholder="Enter IFSC code (e.g., SBIN0001234)"
                className={`w-full px-4 py-3 rounded-xl border-2 uppercase ${
                  errors.ifscCode
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
              />
              {errors.ifscCode && (
                <p className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.ifscCode}
                </p>
              )}
            </div>

            {/* Bank Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="Enter bank name"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.bankName
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
              />
              {errors.bankName && (
                <p className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.bankName}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileImage className="h-4 w-4 mr-2 text-gray-500" />
                Passbook Picture
              </label>
              <div
                className={`relative rounded-xl border-2 border-dashed ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : errors.passbookImage
                    ? "border-red-300"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="p-2 text-center">
                  {formData.passbookImage ? (
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {formData.passbookImage.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          File uploaded successfully
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        Drag and drop your passbook picture here, or{" "}
                        <span className="text-blue-600 font-medium">
                          browse
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              {errors.passbookImage && (
                <p className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.passbookImage}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Submit & Verify"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
