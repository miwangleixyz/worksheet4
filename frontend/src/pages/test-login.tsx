import React, { useState } from "react";

export default function TestLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`❌ Login failed: ${errorData.message || res.statusText}`);
        return;
      }

      const data = await res.json();
      alert(`✅ Login successful!\n\n${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error("Login error:", err);
      alert("⚠️ Network error: could not connect to backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Test</h1>
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
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
