import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

const Settings = () => {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Default login history
  const defaultHistory = [
    { email: "admin@gmail.com", time: "01 Apr 2026, 10:30 AM" },
    { email: "user1@gmail.com", time: "02 Apr 2026, 12:15 PM" },
    { email: "testuser@gmail.com", time: "03 Apr 2026, 09:45 AM" },
    { email: "demo@gmail.com", time: "04 Apr 2026, 06:20 PM" },
  ];

  // Load History
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loginHistory"));

    if (stored && stored.length > 0) {
      setHistory(stored.reverse());
    } else {
      // If no data in localStorage → show default
      setHistory(defaultHistory);
      localStorage.setItem("loginHistory", JSON.stringify(defaultHistory));
    }
  }, []);

  const handleSave = () => {
    alert("Settings Saved!");
  };

  // Delete single history
  const deleteHistory = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("loginHistory", JSON.stringify(updated.reverse()));
  };

  // Delete all history
  const deleteAllHistory = () => {
    setHistory([]);
    localStorage.removeItem("loginHistory");
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Settings</h2>

      <div className="row g-4">

        {/* Profile */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="fw-bold mb-3">Profile Settings</h5>

            <input
              className="form-control mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="fw-bold mb-3">Change Password</h5>

            <input
              type="password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
          </div>
        </div>

      </div>

      {/* LOGIN HISTORY */}
      <div className="card shadow p-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold">Login History</h5>

          <div>
            <button
              className="btn btn-secondary btn-sm me-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show All"}
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={deleteAllHistory}
            >
              Delete All
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <p>No login history found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Login Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(showAll ? history : history.slice(0, 3)).map((item, index) => (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.time}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteHistory(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Save */}
      <div className="mt-4">
        <button className="btn btn-primary px-4" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </Layout>
  );
};

export default Settings;