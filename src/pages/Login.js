import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isStrongPassword = (pass) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields",
      });
      return;
    }

    if (!isStrongPassword(password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        html:
          "Password must be at least 8 characters long and include:<br/>" +
          "- 1 uppercase letter<br/>" +
          "- 1 lowercase letter<br/>" +
          "- 1 number<br/>" +
          "- 1 special character",
      });
      return;
    }

    localStorage.setItem("isLoggedIn", true);
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `Welcome ${email}!`,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => navigate("/dashboard"));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <form
        onSubmit={handleLogin}
        className="p-5 bg-white rounded shadow-lg"
        style={{ width: "350px", animation: "fadeIn 0.8s ease-in-out" }}
      >
        <h3 className="text-center mb-4 fw-bold">CRM Login</h3>

        {/* Email input */}
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

        {/* Password input */}
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
      </form>

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

export default Login;