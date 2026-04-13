import React, { useState, useEffect } from "react";
import { FaMoon, FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";



const Navbar = ({ toggleTheme, dark, toggleSidebar }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // 🔔 Fetch unread notifications
  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications/unread`);
      const data = await res.json();
      setUnreadCount(data.length || 0);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      const email = localStorage.getItem("email");

      await fetch(`${API_BASE_URL}/api/auth/logout?email=${email}`, {
        method: "POST",
      });

      localStorage.removeItem("auth");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      className="navbar px-3 px-md-5 py-3 d-flex justify-content-between shadow position-relative"
      style={{
        background: dark ? "#1f1f1f" : "#83cdf8",
        color: dark ? "white" : "black",
      }}
    >
      {/* Left Side */}
      <div className="d-flex align-items-center gap-3">
        <FaBars
          className="d-md-none"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />
        <h5 className="fw-bold m-0">CRM Dashboard</h5>
      </div>

      {/* Right Side */}
      <div className="d-flex align-items-center gap-3 position-relative">
        <FaMoon size={22} style={{ cursor: "pointer" }} onClick={toggleTheme} />

        {/* Notification */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaBell size={22} onClick={() => navigate("/notifications")} />

          {unreadCount > 0 && (
            <span
              className="badge bg-danger"
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                fontSize: "10px",
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>

        {/* Profile */}
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
