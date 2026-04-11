import React, { useState } from "react";
import { FaMoon, FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleTheme, dark, toggleSidebar }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <nav
      className="navbar px-3 px-md-5 py-3 d-flex justify-content-between shadow position-relative"
      style={{
        background: dark ? "#1f1f1f" : "#83cdf8",
        color: dark ? "white" : "black",
      }}
    >
      <div className="d-flex align-items-center gap-3">
        {/* ☰ Mobile Menu */}
        <FaBars
          className="d-md-none"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />

        <h5 className="fw-bold m-0">CRM Dashboard</h5>
      </div>

      <div className="d-flex align-items-center gap-3 position-relative">
        <FaMoon size={22} style={{ cursor: "pointer" }} onClick={toggleTheme} />

        <FaBell
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/notifications")}
        />

        <FaUserCircle
          size={26}
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        />

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

            <div className="dropdown-item text-danger" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
