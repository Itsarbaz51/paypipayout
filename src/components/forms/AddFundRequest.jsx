import React, { useEffect, useState } from "react";
import {
  CreditCard,
  Upload,
  Send,
  CheckCircle,
  Calendar,
  Hash,
  User,
  DollarSign,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminBank } from "../../redux/slices/bankSlice";
import { addFunds } from "../../redux/slices/walletSlice";

// Helper function for orderId
const generateOrderId = (prefix = "ORD") => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}_${year}_${randomDigits}`;
};

const AddFundRequest = () => {
  const dispatch = useDispatch();
  const { bankData } = useSelector((state) => state.bank);

  const [form, setForm] = useState({
    account: "",
    ifsc: "",
    name: "",
    amount: "",
    rrn: "",
    date: "",
    file: null,
  });

  useEffect(() => {
    dispatch(getAdminBank());
  }, [dispatch]);

  useEffect(() => {
    if (bankData) {
      setForm((prev) => ({
        ...prev,
        account: bankData.accountNumber,
        ifsc: bankData.ifscCode,
        name: bankData.accountHolder,
      }));
    }
  }, [bankData]);

  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  // Razorpay Payment Simulation
  const handleRazorpayPayment = () => {
    if (!form.amount || form.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const mockPaymentId = "pay_" + Math.random().toString(36).substr(2, 9);
      const mockOrderId = generateOrderId("RZP");

      dispatch(
        addFunds({
          amount: parseFloat(form.amount),
          provider: "RAZORPAY",
          paymentId: mockPaymentId,
          orderId: mockOrderId,
        })
      );

      setForm((prev) => ({
        ...prev,
        rrn: mockPaymentId,
        date: new Date().toISOString().split("T")[0],
      }));

      alert(`Payment successful! Payment ID: ${mockPaymentId}`);
      setIsProcessing(false);
    }, 2000);
  };

  // Bank Transfer Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.rrn) {
      alert("Please enter amount and RRN/UTR number");
      return;
    }

    setIsProcessing(true);

    const orderId = generateOrderId("BT");

    dispatch(
      addFunds({
        amount: parseFloat(form.amount),
        provider: "BANK_TRANSFER",
        paymentId: form.rrn,
        orderId: orderId,
        paymentImage: form.file.name,
      })
    );

    setTimeout(() => {
      alert("Fund request submitted successfully!");
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Add Fund Request
            </h1>
            <div className="flex items-center text-slate-500 text-sm">
              <span>Dashboard</span>
              <span className="mx-2">•</span>
              <span className="text-indigo-600 font-medium">Fund Request</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Bank Info + Payment Method */}
        <div className="space-y-6">
          {/* Bank Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Bank Account Details
            </h3>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200 space-y-3">
              <p className="flex justify-between">
                <span className="font-medium">Account Number:</span>
                <span>{bankData?.accountNumber || "-"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">IFSC Code:</span>
                <span>{bankData?.ifscCode || "-"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Bank Name:</span>
                <span>{bankData?.bankName || "-"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Account Holder:</span>
                <span>{bankData?.accountHolder || "-"}</span>
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Choose Payment Method
            </h3>
            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl border-2 cursor-pointer ${
                  paymentMethod === "bank_transfer"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200"
                }`}
                onClick={() => setPaymentMethod("bank_transfer")}
              >
                <p className="font-semibold">Bank Transfer</p>
                <p className="text-sm text-slate-600">
                  Transfer to bank & upload receipt
                </p>
              </div>
              <div
                className={`p-4 rounded-xl border-2 cursor-pointer ${
                  paymentMethod === "razorpay"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200"
                }`}
                onClick={() => setPaymentMethod("razorpay")}
              >
                <p className="font-semibold">Razorpay</p>
                <p className="text-sm text-slate-600">
                  Instant payment via UPI/Cards
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Fund Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Fund Request Details
          </h3>

          <div className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleInputChange}
                className="w-full border-2 border-slate-200 rounded-xl p-3"
                placeholder="Enter amount"
                min="1"
              />
            </div>

            {paymentMethod === "razorpay" ? (
              <button
                type="button"
                onClick={handleRazorpayPayment}
                disabled={isProcessing || !form.amount}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Pay with Razorpay"}
              </button>
            ) : (
              <>
                {/* RRN */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    RRN/UTR Number
                  </label>
                  <input
                    type="text"
                    name="rrn"
                    value={form.rrn}
                    onChange={handleInputChange}
                    className="w-full border-2 border-slate-200 rounded-xl p-3"
                    placeholder="Enter RRN/UTR"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Transaction Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    className="w-full border-2 border-slate-200 rounded-xl p-3"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Payment Receipt
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".png,.jpg,.jpeg,.pdf"
                  />
                  {form.file && (
                    <p className="text-sm text-indigo-600">{form.file.name}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl disabled:opacity-50"
                >
                  {isProcessing ? "Submitting..." : "Submit Fund Request"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFundRequest;
