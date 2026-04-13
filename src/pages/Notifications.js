import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";



const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const hasFetched = useRef(false);

  // 📥 FETCH NOTIFICATIONS
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications`);

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      setNotifications(data || []);

      toast.success("Notifications loaded 🔔", {
        toastId: "notifications-load",
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);

      toast.error("Failed to load notifications ❌", {
        toastId: "notifications-error",
      });
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchNotifications();
  }, []);

  // ✅ MARK AS READ
  const markAsRead = async (id) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/notifications/${id}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) throw new Error("Update failed");

      // update UI instantly (no refetch)
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, readStatus: true } : n
        )
      );

      toast.success("Marked as read ✅", {
        toastId: "notification-read",
      });
    } catch (error) {
      console.error("Error updating notification:", error);

      toast.error("Failed to update notification ❌", {
        toastId: "notification-error",
      });
    }
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Notifications</h2>

      <div className="card shadow p-3">
        <ul className="list-group">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                !n.readStatus ? "fw-bold bg-light" : ""
              }`}
            >
              <div>
                {n.message}

                {!n.readStatus && (
                  <span className="badge bg-danger ms-2">
                    New
                  </span>
                )}

                <br />
                <small className="text-muted">
                  {n.type} | {n.createdAt}
                </small>
              </div>

              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => markAsRead(n.id)}
              >
                {n.readStatus ? "Read" : "Mark Read"}
              </button>
            </li>
          ))}
        </ul>

        {notifications.length === 0 && (
          <p className="text-center mt-3">No notifications</p>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
