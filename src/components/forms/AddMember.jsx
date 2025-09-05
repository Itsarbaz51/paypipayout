import React, { useState } from "react";

const AddMember = () => {
  const [search, setSearch] = useState("");

  // Dummy empty members list, you can replace with actual data
  const members = [];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#dbe9ff",
        padding: "15px 20px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <div>
          <h2 style={{ margin: 0 }}>Add Member</h2>
          <p style={{ margin: "5px 0 0", color: "#555" }}>
            Dashboard &nbsp;•&nbsp; Add Member
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1040/1040228.png"
          alt="Add Member Icon"
          style={{ width: 60, height: 60 }}
        />
      </div>

      {/* Search and Add Button */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
        backgroundColor: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)"
      }}>
        <input
          type="search"
          placeholder="Search Members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        <button
          style={{
            backgroundColor: "#3a86ff",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
          onClick={() => alert("Add Member clicked")}
        >
          Add Member
        </button>
      </div>

      {/* Members Table */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        padding: "20px"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ padding: "10px" }}>
                <input type="checkbox" />
              </th>
              <th style={{ padding: "10px", textAlign: "left", color: "#555" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left", color: "#555" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left", color: "#555" }}>Phone</th>
              <th style={{ padding: "10px", textAlign: "left", color: "#555" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((member, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>
                    <input type="checkbox" />
                  </td>
                  <td style={{ padding: "10px" }}>{member.name}</td>
                  <td style={{ padding: "10px" }}>{member.email}</td>
                  <td style={{ padding: "10px" }}>{member.phone}</td>
                  <td style={{ padding: "10px" }}>
                    {/* Add your action buttons here */}
                    <button>Edit</button>
                    <button>Delete</button>
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

export default AddMember;
