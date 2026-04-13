import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!email || !password) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const data = await res.text();

      if (data === "Login Successful") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", email.trim().toLowerCase());

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${email}!`,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate("/dashboard"));
      } else {
        Swal.fire("Error", "Invalid email or password", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Backend not reachable ❌", "error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <form
        onSubmit={handleLogin}
        className="p-5 bg-white rounded shadow-lg"
        style={{ width: "350px" }}
      >
        <h3 className="text-center mb-4 fw-bold">CRM Login</h3>

        {/* Email */}
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <FaEnvelope />
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="input-group mb-4">
          <span className="input-group-text bg-white">
            <FaLock />
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 fw-bold">Login</button>

        {/* Signup */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              cursor: "pointer",
              color: "#667eea",
              fontWeight: "bold",
            }}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
