import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const hasFetched = useRef(false); //  prevent double API call

  //  FETCH FROM BACKEND
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/notifications");
      const data = await res.json();

      setNotifications(data);

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

  //  MARK AS READ
  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/notifications/${id}`, {
        method: "PUT",
      });

      // update UI without refetch (faster)
      setNotifications(
        notifications.map((n) =>
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