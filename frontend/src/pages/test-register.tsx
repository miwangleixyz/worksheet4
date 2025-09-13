import React, { useState } from "react";

export default function TestRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`❌ Failed: ${errorData.message || res.statusText}`);
        return;
      }

      const data = await res.json();
      alert(`✅ Registered successfully!\n\n${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error("Register error:", err);
      alert("⚠️ Network error: could not connect to backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register Test</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
