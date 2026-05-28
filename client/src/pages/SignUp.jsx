import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://note-backend-b56h.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Account created successfully..");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Server error. Try again.");
    }
  };

 return (
  <div style={styles.container}>
    <form onSubmit={handleSignUp} style={styles.form}>
      <h2 style={styles.title}>Create Account</h2>
      <p style={styles.subtitle}>Join us and start your journey today</p>

      <input
        style={styles.input}
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} type="submit">
        Sign Up
      </button>

      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.bottomText}>
        Already have an account?
        <button
          type="button"
          style={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </form>
  </div>
);
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9fafb", 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: "20px",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.02)", 
    border: "1px solid #f0f0f0",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "22px",
    fontWeight: "600",
    color: "#111111",
    textAlign: "center",
  },
  subtitle: {
    margin: "0 0 28px 0",
    fontSize: "13px",
    color: "#707070",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    marginBottom: "16px",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#ffffff",
    backgroundColor: "#3b82f6", 
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "8px",
  },
  message: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#023f85",
    textAlign: "center",
  },
  bottomText: {
    marginTop: "24px",
    fontSize: "13px",
    color: "#000000",
    textAlign: "center",
  },
  loginButton: {
    background: "none",
    border: "none",
    color: "#3b82f6",
    fontWeight: "600",
    cursor: "pointer",
    padding: "0",
    marginLeft: "5px",
    textDecoration: "underline",
  },
};



export default SignUp;
