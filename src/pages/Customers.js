import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { toast } from "react-toastify";

const Customers = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [customers, setCustomers] = useState([]);

  const hasFetched = useRef(false); // 🔥 prevent double call

  //  FETCH FROM BACKEND
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("http://localhost:8080/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);

        toast.success("Customers loaded successfully ✅", {
          toastId: "customers-load", // 🔥 prevent duplicate toast
        });
      })
      .catch((err) => {
        console.log(err);

        toast.error("Failed to load customers ❌", {
          toastId: "customers-error",
        });
      });
  }, []);

  //  FILTER
  const filtered = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || c.status === statusFilter)
    );
  });

  //  ADD CUSTOMER
  const addCustomer = async () => {
    const name = prompt("Enter Name");
    const email = prompt("Enter Email");
    const phone = prompt("Enter Phone");

    if (!name || !email || !phone) {
      toast.warning("All fields are required ⚠️", {
        toastId: "validation-warning",
      });
      return;
    }

    const newCustomer = {
      name,
      email,
      phone,
      status: "Active",
    };

    try {
      const res = await fetch("http://localhost:8080/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      const data = await res.json();
      setCustomers([...customers, data]);

      toast.success("Customer added successfully 🎉", {
        toastId: "add-success",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to add customer ❌", {
        toastId: "add-error",
      });
    }
  };

  //  DELETE CUSTOMER
  const deleteCustomer = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/customers/${id}`, {
        method: "DELETE",
      });

      setCustomers(customers.filter((c) => c.id !== id));

      toast.success("Customer deleted successfully 🗑️", {
        toastId: "delete-success",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete customer ❌", {
        toastId: "delete-error",
      });
    }
  };

  return (
    <Layout>
    {/* Header */}
<div className="d-flex flex-column mb-3 gap-2">
  <h2 className="fw-bold">Customers</h2>

  <button
    className="btn btn-primary w-100 w-md-auto"
    onClick={addCustomer}
  >
    + Add Customer
  </button>
</div>

      {/* Search + Filter */}
      <div className="d-flex flex-column flex-md-row gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search customer..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="card shadow-sm p-3">
        <div className="table-responsive">
          <Table
            columns={["Name", "Email", "Phone", "Status", "Action"]}
            data={filtered}
            onDelete={deleteCustomer}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Customers;