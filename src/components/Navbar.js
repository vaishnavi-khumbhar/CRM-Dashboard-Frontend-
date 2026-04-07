import React, { useState } from "react";
import { FaMoon, FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleTheme, dark }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");   // logout
    navigate("/");                     // login page
  };

  return (
    <nav
      className="navbar px-5 py-3 d-flex justify-content-between shadow position-relative"
      style={{
        background: dark ? "#1f1f1f" : "#83cdf8",
        color: dark ? "white" : "black",
      }}
    >
      <h4 className="fw-bold">CRM Dashboard</h4>

      <div className="d-flex align-items-center gap-3 position-relative">

        {/* Dark Mode */}
        <FaMoon size={26} style={{ cursor: "pointer" }} onClick={toggleTheme} />

        {/* Notification */}
        <FaBell
        size={26}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/notifications")}
        />

        {/* Profile Icon */}
        <FaUserCircle
          size={28}
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        />

        {/* 🔽 Dropdown */}
        {open && (
          <div className="profile-dropdown shadow">
            <div
              className="dropdown-item"
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
            >
              My Profile
            </div>

            <div
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
