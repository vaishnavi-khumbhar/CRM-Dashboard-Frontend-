import React, { useState } from "react";
import Layout from "../components/Layout";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Add task
  const addTask = () => {
    if (!task) return;

    setTasks([
      ...tasks,
      { text: task, done: false, priority },
    ]);

    setTask("");
    setPriority("Medium");
  };

  // Toggle complete
  const toggle = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  };

  // Priority color
  const getPriorityColor = (p) => {
    if (p === "High") return "bg-danger";
    if (p === "Medium") return "bg-warning text-dark";
    if (p === "Low") return "bg-success";
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Task Manager</h2>

      {/* Input Section */}
      <div className="card shadow p-3 mb-4">
        <div className="d-flex gap-2">

          <input
            className="form-control"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <select
            className="form-select w-25"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>

        </div>
      </div>

      {/* Task List */}
      <ul className="list-group">
        {tasks.map((t, i) => (
          <li
            key={i}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              t.done ? "text-decoration-line-through" : ""
            }`}
          >
            <div>
              {t.text}{" "}
              <span className={`badge ms-2 ${getPriorityColor(t.priority)}`}>
                {t.priority}
              </span>
            </div>

            <button
              className="btn btn-sm btn-success"
              onClick={() => toggle(i)}
            >
              {t.done ? "Undo" : "Done"}
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Tasks;
