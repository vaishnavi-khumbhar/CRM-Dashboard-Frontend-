import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

const Leads = () => {
  const [leads, setLeads] = useState([]);

  const hasFetched = useRef(false); 

  //  Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  //  FETCH FROM BACKEND
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("http://localhost:8080/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);

        toast.success("Leads loaded successfully ✅", {
          toastId: "leads-load",
        });
      })
      .catch((err) => {
        console.log(err);

        toast.error("Failed to load leads ❌", {
          toastId: "leads-error",
        });
      });
  }, []);

  //  HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  ADD NEW LEAD
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
      const res = await fetch("http://localhost:8080/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const newLead = await res.json();

      setLeads([...leads, newLead]);

      toast.success("Lead added successfully 🎉", {
        toastId: "lead-add",
      });

      // Reset form
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

  // CONVERT LEAD
  const convertLead = async (lead) => {
    const updatedLead = { ...lead, status: "Converted" };

    try {
      await fetch(`http://localhost:8080/api/leads/${lead.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLead),
      });

      setLeads(
        leads.map((l) => (l.id === lead.id ? updatedLead : l))
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

  //  DELETE LEAD
  const deleteLead = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/leads/${id}`, {
        method: "DELETE",
      });

      setLeads(leads.filter((l) => l.id !== id));

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

  // Badge color
  const getBadge = (status) => {
    if (status === "New") return "bg-primary";
    if (status === "Contacted") return "bg-warning text-dark";
    if (status === "Converted") return "bg-success";
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Leads Management</h2>

      {/*  ADD LEAD FORM */}
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
              required
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
              required
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
              required
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

      {/*  TABLE */}
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