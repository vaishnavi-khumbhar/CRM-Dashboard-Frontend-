import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";



const Leads = () => {
  const [leads, setLeads] = useState([]);

  const hasFetched = useRef(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  // 📥 FETCH LEADS
  useEffect(() => {
    const fetchLeads = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const res = await fetch(`${API_BASE_URL}/api/leads`);

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();
        setLeads(data || []);

        toast.success("Leads loaded successfully ✅", {
          toastId: "leads-load",
        });
      } catch (err) {
        console.error(err);

        toast.error("Failed to load leads ❌", {
          toastId: "leads-error",
        });
      }
    };

    fetchLeads();
  }, []);

  // ✍️ INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ ADD LEAD
  const addLead = async (e) => {
    e.preventDefault();

    const { name, email, phone } = form;

    if (!name || !email || !phone) {
      toast.warning("All fields are required ⚠️", {
        toastId: "lead-validation",
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Add failed");

      const newLead = await res.json();

      setLeads((prev) => [...prev, newLead]);

      toast.success("Lead added successfully 🎉", {
        toastId: "lead-add",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        status: "New",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to add lead ❌", {
        toastId: "lead-add-error",
      });
    }
  };

  // 🔁 CONVERT LEAD
  const convertLead = async (lead) => {
    const updatedLead = { ...lead, status: "Converted" };

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/${lead.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLead),
      });

      if (!res.ok) throw new Error("Convert failed");

      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? updatedLead : l))
      );

      toast.success("Lead converted to customer 🎯", {
        toastId: "lead-convert",
      });
    } catch (error) {
      console.error(error);

      toast.error("Conversion failed ❌", {
        toastId: "lead-convert-error",
      });
    }
  };

  // 🗑 DELETE LEAD
  const deleteLead = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setLeads((prev) => prev.filter((l) => l.id !== id));

      toast.success("Lead deleted successfully 🗑️", {
        toastId: "lead-delete",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete lead ❌", {
        toastId: "lead-delete-error",
      });
    }
  };

  // 🎨 Badge
  const getBadge = (status) => {
    if (status === "New") return "bg-primary";
    if (status === "Contacted") return "bg-warning text-dark";
    if (status === "Converted") return "bg-success";
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Leads Management</h2>

      {/* FORM */}
      <div className="card shadow p-3 mb-4">
        <h5 className="mb-3">Add New Lead</h5>

        <form onSubmit={addLead} className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Name"
            />
          </div>

          <div className="col-md-3">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Phone"
            />
          </div>

          <div className="col-md-2">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-select"
            >
              <option>New</option>
              <option>Contacted</option>
            </select>
          </div>

          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="card shadow p-3">
        <table className="table align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="fw-semibold">{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>

                <td>
                  <span className={`badge ${getBadge(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>

                <td className="d-flex gap-2">
                  {lead.status !== "Converted" && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => convertLead(lead)}
                    >
                      Convert
                    </button>
                  )}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteLead(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Leads;
