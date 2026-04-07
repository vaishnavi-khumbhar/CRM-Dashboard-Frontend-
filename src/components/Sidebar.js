import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartLine,
  FaTasks,
  FaBell,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div
      className="sidebar text-white p-3"
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #141e30, #243b55)",
      }}
    >
      <h4 className="mb-4 fw-bold text-center"> CRM </h4>

      <ul className="nav flex-column gap-3">

        <li>
          <NavLink to="/dashboard" className="nav-link sidebar-link">
            <span className="icon bg-primary"><FaTachometerAlt /></span>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/customers" className="nav-link sidebar-link">
            <span className="icon bg-success"><FaUsers /></span>
            Customers
          </NavLink>
        </li>

        <li>
          <NavLink to="/leads" className="nav-link sidebar-link">
            <span className="icon bg-warning"><FaUsers /></span>
            Leads
          </NavLink>
        </li>

        <li>
          <NavLink to="/sales" className="nav-link sidebar-link">
            <span className="icon bg-info"><FaChartLine /></span>
            Sales
          </NavLink>
        </li>

        <li>
          <NavLink to="/tasks" className="nav-link sidebar-link">
            <span className="icon bg-danger"><FaTasks /></span>
            Tasks
          </NavLink>
        </li>

        <li>
          <NavLink to="/notifications" className="nav-link sidebar-link">
            <span className="icon bg-secondary"><FaBell /></span>
            Notifications
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" className="nav-link sidebar-link">
            <span className="icon bg-dark"><FaCog /></span>
            Settings
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;