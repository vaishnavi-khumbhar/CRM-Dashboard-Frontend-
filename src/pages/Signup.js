import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      Swal.fire("Error", "All fields required", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "Signup successful ✅",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate("/"));
      } else {
        Swal.fire("Error", "Signup failed ❌", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error ❌", "error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <form
        onSubmit={handleSignup}
        className="p-5 bg-white rounded shadow-lg"
        style={{ width: "350px", animation: "fadeIn 0.8s ease-in-out" }}
      >
        <h3 className="text-center mb-4 fw-bold">Create Account</h3>

        {/* Name */}
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <FaUser />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <button className="btn btn-success w-100 fw-bold">
          Signup
        </button>

        {/* 🔥 LOGIN LINK */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", color: "#667eea", fontWeight: "bold" }}
          >
            Login
          </span>
        </p>
      </form>

      {/* Animation + Input Style */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          input:focus {
            box-shadow: none !important;
            border-color: #667eea !important;
          }

          .input-group-text {
            border-right: none;
          }

          .form-control {
            border-left: none;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;