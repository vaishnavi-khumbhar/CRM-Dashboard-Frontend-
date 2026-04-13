import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";



const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // 🚀 LOAD ALL DATA
  useEffect(() => {
    fetchProfile();
    fetchHistory();
  }, []);

  // 👤 PROFILE
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`);

      if (!res.ok) throw new Error("Profile error");

      const data = await res.json();

      setName(data?.name || "");
      setEmail(data?.email || "");
    } catch (error) {
      console.error("Profile error:", error);
      toast.error("Failed to load profile ❌");
    }
  };

  // 📜 HISTORY
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/history`);

      if (!res.ok) throw new Error("History error");

      const data = await res.json();
      setHistory(data || []);
    } catch (error) {
      console.error("History error:", error);
      toast.error("Failed to load history ❌");
    }
  };

  // 💾 SAVE SETTINGS
  const handleSave = async () => {
    if (!name || !email) {
      toast.warning("Name & Email required ⚠️");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) throw new Error("Save failed");

      toast.success("Settings Saved Successfully ✅");
    } catch (error) {
      console.error(error);
      toast.error("Error saving settings ❌");
    }
  };

  // 🗑 DELETE SINGLE HISTORY
  const deleteHistory = async (id) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/history/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setHistory((prev) => prev.filter((item) => item.id !== id));

      toast.success("History deleted 🗑️");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting ❌");
    }
  };

  // 🧹 DELETE ALL HISTORY
  const deleteAllHistory = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/history`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete all failed");

      setHistory([]);
      toast.success("All history cleared 🧹");
    } catch (error) {
      console.error(error);
      toast.error("Error ❌");
    }
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

      {/* HISTORY */}
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
              {(showAll ? history : history.slice(0, 3)).map((item) => (
                <tr key={item.id}>
                  <td>{item.email}</td>
                  <td>{item.time}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteHistory(item.id)}
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

      {/* SAVE */}
      <div className="mt-4">
        <button className="btn btn-primary px-4" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </Layout>
  );
};

export default Settings;
