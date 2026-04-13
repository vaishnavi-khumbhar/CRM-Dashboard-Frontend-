import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";



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
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      if (!res.ok) throw new Error("Signup failed");

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Signup successful ✅",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate("/"));
    } catch (error) {
      console.error(error);
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
        style={{ width: "350px" }}
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

        {/* Login Link */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              color: "#667eea",
              fontWeight: "bold",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
