import React, { useState } from "react";

const AddFundRequest = () => {
  // Pre-filled bank details (simulate selecting from left card)
  const [bankDetails, setBankDetails] = useState({
    account: "34621114254",
    ifsc: "SBIN0004655",
    bank: "SBIN",
    name: "AZU",
  });

  const [form, setForm] = useState({
    account: bankDetails.account,
    ifsc: bankDetails.ifsc,
    name: bankDetails.name,
    amount: "",
    rrn: "",
    date: "",
    file: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert("Form submitted: " + JSON.stringify(form, null, 2));
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#dbe9ff",
          padding: "15px 20px",
          borderRadius: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Add Fund Request</h2>
          <p style={{ margin: "5px 0 0", color: "#555" }}>
            Dashboard &nbsp;•&nbsp; Fund Request
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1040/1040228.png"
          alt="Add Fund Icon"
          style={{ width: 60, height: 60 }}
        />
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Left side: Fund Request Banks */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ marginBottom: 10 }}>Fund Request Banks</h4>
          <p style={{ marginBottom: 20, color: "#555" }}>
            Select a bank from below list to add Request
          </p>
          <div
            style={{
              border: "2px solid black",
              borderRadius: 8,
              padding: 15,
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            <p>
              <strong>Account:</strong> {bankDetails.account}
            </p>
            <p>
              <strong>IFSC:</strong> {bankDetails.ifsc}
            </p>
            <p>
              <strong>BANK:</strong> {bankDetails.bank}
            </p>
            <p>
              <strong>NAME:</strong> {bankDetails.name}
            </p>
            <button
              style={{
                marginTop: 10,
                backgroundColor: "#0c134f",
                color: "white",
                padding: "8px 20px",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => alert("Bank selected")}
            >
              Select
            </button>
          </div>
        </div>

        {/* Right side: Confirm Details Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ marginBottom: 10 }}>Confirm Details for adding request</h4>
          <p style={{ marginBottom: 20, color: "red" }}>
            All fields are mandatory
          </p>

          {/* Account Number */}
          <input
            type="text"
            name="account"
            value={form.account}
            onChange={handleInputChange}
            placeholder="Account Number"
            style={inputStyle}
            required
          />

          {/* IFSC */}
          <input
            type="text"
            name="ifsc"
            value={form.ifsc}
            onChange={handleInputChange}
            placeholder="IFSC"
            style={inputStyle}
            required
          />

          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Name"
            style={inputStyle}
            required
          />

          {/* Amount */}
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            style={inputStyle}
            required
            min="1"
          />

          {/* RRN/UTR */}
          <input
            type="text"
            name="rrn"
            value={form.rrn}
            onChange={handleInputChange}
            placeholder="RRN/UTR"
            style={inputStyle}
            required
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />

          {/* File */}
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            style={{ marginBottom: 15 }}
            required
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#0c134f",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 20,
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="18"
              style={{ marginRight: 5 }}
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: 15,
  borderRadius: 6,
  border: "1.5px solid #0c134f",
  fontSize: 14,
  boxSizing: "border-box",
};

export default AddFundRequest;
