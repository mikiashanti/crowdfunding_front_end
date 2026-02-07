import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function SignupForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = credentials;

    if (!username || !email || !password) {
      return alert("Please fill all fields");
    }

    try {
      // 1️⃣ Create new user
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        const msg = errBody?.detail ?? errBody?.message ?? "Failed to signup";
        return alert(msg);
      }

      // 2️⃣ Auto-login
      const loginRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!loginRes.ok) {
        return alert("Signup successful, but failed to login. Please login manually.");
      }

      const loginData = await loginRes.json();
      window.localStorage.setItem("token", loginData.token);
      setAuth({ token: loginData.token });

      // 3️⃣ Redirect
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("An error occurred during signup");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "30px",
        background: "#fefefe",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Sign Up</h2>

      <input
        type="text"
        id="username"
        placeholder="Username"
        onChange={handleChange}
        required
        style={{
          width: "95%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <input
        type="email"
        id="email"
        placeholder="Email"
        onChange={handleChange}
        required
        style={{
          width: "95%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={{
          width: "95%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#d6d2ac",
          color: "#fff",
          fontSize: "18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
