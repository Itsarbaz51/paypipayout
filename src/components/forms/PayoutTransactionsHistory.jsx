import React, { useState } from "react";

const PayoutTransactionsHistory = () => {
  const [months, setMonths] = useState("Last six Months");
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(50000);
  const [order, setOrder] = useState("Desc.");
  const [type, setType] = useState("All");

  const handleFetch = () => {
    alert(
      `Fetching transactions with:\nMonths: ${months}\nAmount from: ${amountFrom}\nAmount to: ${amountTo}\nOrder: ${order}\nType: ${type}`
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        maxWidth: 600,
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ marginTop: 0 }}>PAYOUT</h3>

      <div style={{ marginBottom: 15 }}>
        <label style={labelStyle}>
          By Months
          <input
            type="text"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            style={inputStyle}
            placeholder="Select months"
          />
        </label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 15,
        }}
      >
        <label style={{ ...labelStyle, flex: 1 }}>
          Amount From
          <input
            type="number"
            value={amountFrom}
            onChange={(e) => setAmountFrom(e.target.value)}
            style={{ ...inputStyle, width: "100%" }}
          />
        </label>

        <label style={{ ...labelStyle, flex: 1 }}>
          Amount To
          <input
            type="number"
            value={amountTo}
            onChange={(e) => setAmountTo(e.target.value)}
            style={{ ...inputStyle, width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 15 }}>
        <label style={labelStyle}>
          Select Order
          <input
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            style={inputStyle}
            placeholder="Select order"
          />
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>
          Select type
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle}
            placeholder="Select type"
          />
        </label>
      </div>

      <button
        onClick={handleFetch}
        style={{
          width: "100%",
          padding: "12px 0",
          backgroundColor: "#121840",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Fetch Transactions
      </button>
    </div>
  );
};

const labelStyle = {
  display: "block",
  fontWeight: "600",
  fontSize: 14,
  color: "#222",
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
};

export default PayoutTransactionsHistory;
