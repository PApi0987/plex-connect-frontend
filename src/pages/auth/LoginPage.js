import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Fill all fields");
    login({ name: form.name, email: form.email });
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit}>
        <h2>Login / Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
