import { useState } from "react";

const PayinComponent = ({
  currentUser,
  transactions,
  setTransactions,
  users,
  setUsers,
  setCurrentUser,
  commissionSettings,
}) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  const handlePayin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate Razorpay Order Creation
      const orderData = {
        amount: parseFloat(amount) * 100, // Convert to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };

      // Mock Razorpay Checkout
      const options = {
        key: "rzp_test_XXXXXXXXXX",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Payment System",
        description: "Wallet Recharge",
        order_id: `order_${Date.now()}`,
        handler: function (response) {
          // Success handler
          const newTransaction = {
            id: transactions.length + 1,
            user_id: currentUser.id,
            type: "payin",
            amount: parseFloat(amount),
            status: "success",
            razorpay_order_id: response.razorpay_order_id,
            commission:
              parseFloat(amount) * (commissionSettings[currentUser.role] / 100),
            created_at: new Date().toISOString(),
          };

          setTransactions([...transactions, newTransaction]);

          // Update wallet balance
          const updatedUsers = users.map((u) =>
            u.id === currentUser.id
              ? {
                  ...u,
                  wallet_balance: u.wallet_balance + parseFloat(amount),
                }
              : u
          );
          setUsers(updatedUsers);
          setCurrentUser({
            ...currentUser,
            wallet_balance: currentUser.wallet_balance + parseFloat(amount),
          });

          alert("Payment Successful! Wallet recharged.");
          setAmount("");
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
        },
        theme: {
          color: "#dc2626",
        },
      };

      // Simulate opening Razorpay checkout (in real app, this would be actual Razorpay)
      setTimeout(() => {
        const confirmed = confirm(
          `Simulate payment of ₹${amount} via ${paymentMethod.toUpperCase()}?`
        );
        if (confirmed) {
          options.handler({ razorpay_order_id: `order_${Date.now()}` });
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      alert("Payment failed. Please try again.", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-red-700">
        Add Money to Wallet
      </h3>
      <form onSubmit={handlePayin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            max="50000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
            <option value="card">Credit/Debit Card</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>

        <div className="bg-red-50 p-3 rounded-md">
          <p className="text-sm text-red-700">
            Commission: {commissionSettings[currentUser.role]}% | You'll pay: ₹
            {amount
              ? (
                  parseFloat(amount) +
                  (parseFloat(amount) * commissionSettings[currentUser.role]) /
                    100
                ).toFixed(2)
              : "0"}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !amount}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 transition duration-200"
        >
          {loading ? "Processing..." : `Pay ₹${amount || "0"} via Razorpay`}
        </button>
      </form>
    </div>
  );
};

export default PayinComponent;
