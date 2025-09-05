import React, { useState } from "react";

const PayoutForm = () => {
  const [customerNo] = useState("9649730196");
  const [selectAccount, setSelectAccount] = useState("");
  const [selectMode, setSelectMode] = useState("IMPS");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Sample accounts for dropdown
  const accounts = [
    { id: "acc1", name: "Account 1 - 1234567890" },
    { id: "acc2", name: "Account 2 - 0987654321" },
  ];

  const handleTransfer = () => {
    if (!selectAccount || !amount) {
      alert("Please select account and enter amount.");
      return;
    }
    alert(`Transfer requested for ${amount} via ${selectMode} from account ${selectAccount}`);
  };

  const handleAddAccount = () => {
    alert("Add Account clicked");
  };

  return (
    <div style={{ display: "flex", gap: 40, padding: 20, fontFamily: "Arial, sans-serif" }}>
      {/* Left side: Payout form */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 0 8px rgba(0,0,0,0.05)",
          padding: 20,
          maxWidth: 400,
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>Payout</h3>

        <label style={labelStyle}>
          CUSTOMER NO *
          <input
            type="text"
            value={customerNo}
            readOnly
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Select Account *
          <select
            value={selectAccount}
            onChange={(e) => setSelectAccount(e.target.value)}
            style={inputStyle}
          >
            <option value="">select</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.name}>
                {acc.name}
              </option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          Select Mode *
          <select
            value={selectMode}
            onChange={(e) => setSelectMode(e.target.value)}
            style={inputStyle}
          >
            <option value="IMPS">IMPS</option>
            <option value="NEFT">NEFT</option>
          </select>
        </label>

        <label style={labelStyle}>
          AMOUNT *
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
            placeholder="Enter amount"
          />
        </label>

        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button onClick={handleTransfer} style={buttonStyleOutlined}>
            Transfer
          </button>
          <button onClick={handleAddAccount} style={buttonStyle}>
            Add Account
          </button>
        </div>
      </div>

      {/* Right side: Recent transactions */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 0 8px rgba(0,0,0,0.05)",
          padding: 20,
          maxWidth: 600,
        }}
      >
        <h4>Last recent transactions</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th style={thTdStyle}>Details</th>
              <th style={thTdStyle}>Customer</th>
              <th style={thTdStyle}>Status</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                  No recent transactions
                </td>
              </tr>
            ) : (
              transactions.map((tx, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={thTdStyle}>{tx.details}</td>
                  <td style={thTdStyle}>{tx.customer}</td>
                  <td style={thTdStyle}>{tx.status}</td>
                  <td style={thTdStyle}>
                    <button style={{ ...buttonStyle, padding: "4px 8px", fontSize: 12 }}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: 15,
  fontWeight: "bold",
  fontSize: 13,
  color: "#222",
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 5,
  border: "1px solid #ccc",
  marginTop: 5,
  fontSize: 14,
};

const buttonStyle = {
  backgroundColor: "#121840",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: 6,
  cursor: "pointer",
};

const buttonStyleOutlined = {
  ...buttonStyle,
  backgroundColor: "#fff",
  color: "#121840",
  border: "1.5px solid #121840",
};

const thTdStyle = {
  padding: 12,
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

export default PayoutForm;
