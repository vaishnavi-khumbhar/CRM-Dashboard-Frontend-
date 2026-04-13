import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const hasFetched = useRef(false); // prevent double API call

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium"
  });

  //  FETCH FROM BACKEND
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("http://localhost:8080/api/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data);

        toast.success("Tasks loaded successfully ✅", {
          toastId: "tasks-load",
        });
      })
      .catch(err => {
        console.log(err);

        toast.error("Failed to load tasks ❌", {
          toastId: "tasks-error",
        });
      });
  }, []);

  //  HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  ADD TASK
  const addTask = async (e) => {
    e.preventDefault();

    if (!form.title) {
      toast.warning("Task title required ⚠️", {
        toastId: "task-validation",
      });
      return;
    }

    const newTask = {
      ...form,
      status: "Pending"
    };

    try {
      const res = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });

      const data = await res.json();
      setTasks([...tasks, data]);

      toast.success("Task added successfully 📝", {
        toastId: "task-add",
      });

      setForm({
        title: "",
        description: "",
        priority: "Medium"
      });

    } catch (error) {
      console.error(error);

      toast.error("Failed to add task ❌", {
        toastId: "task-add-error",
      });
    }
  };

  //  TOGGLE DONE
  const toggle = async (task) => {
    const updated = {
      ...task,
      status: task.status === "Done" ? "Pending" : "Done"
    };

    try {
      await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });

      setTasks(tasks.map(t => t.id === task.id ? updated : t));

      toast.success(
        task.status === "Done"
          ? "Task marked as Pending 🔄"
          : "Task marked as Done ✅",
        { toastId: "task-toggle" }
      );

    } catch (error) {
      console.error(error);

      toast.error("Failed to update task ❌", {
        toastId: "task-toggle-error",
      });
    }
  };

  //  DELETE TASK
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE"
      });

      setTasks(tasks.filter(t => t.id !== id));

      toast.success("Task deleted successfully 🗑️", {
        toastId: "task-delete",
      });

    } catch (error) {
      console.error(error);

      toast.error("Failed to delete task ❌", {
        toastId: "task-delete-error",
      });
    }
  };

  //  PRIORITY COLOR
  const getPriorityColor = (p) => {
    if (p === "High") return "bg-danger";
    if (p === "Medium") return "bg-warning text-dark";
    if (p === "Low") return "bg-success";
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Task Manager</h2>

      {/*  FORM */}
      <div className="card shadow p-3 mb-4">
        <form className="d-flex gap-2" onSubmit={addTask}>
          
          <input
            className="form-control"
            name="title"
            placeholder="Enter task..."
            value={form.title}
            onChange={handleChange}
          />

          <input
            className="form-control"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <select
            className="form-select w-25"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button className="btn btn-primary">
            Add
          </button>
        </form>
      </div>

      {/*  TASK LIST */}
      <ul className="list-group">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              t.status === "Done" ? "text-decoration-line-through" : ""
            }`}
          >
            <div>
              <strong>{t.title}</strong><br />
              <small>{t.description}</small>{" "}
              <span className={`badge ms-2 ${getPriorityColor(t.priority)}`}>
                {t.priority}
              </span>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() => toggle(t)}
              >
                {t.status === "Done" ? "Undo" : "Done"}
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(t.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Tasks;