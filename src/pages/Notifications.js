import React, { useState } from "react";
import Layout from "../components/Layout";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { text: "New Lead Added", read: false },
    { text: "Task Due Today", read: false },
    { text: "Sales Updated", read: true },
  ]);

  // Toggle read/unread
  const toggleRead = (index) => {
    const updated = [...notifications];
    updated[index].read = !updated[index].read;
    setNotifications(updated);
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Notifications</h2>

      <div className="card shadow p-3">
        <ul className="list-group">
          {notifications.map((n, i) => (
            <li
              key={i}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                !n.read ? "fw-bold bg-light" : ""
              }`}
            >
              <div>
                {n.text}
                {!n.read && (
                  <span className="badge bg-danger ms-2">
                    New
                  </span>
                )}
              </div>

              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => toggleRead(i)}
              >
                {n.read ? "Mark Unread" : "Mark Read"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Notifications;
