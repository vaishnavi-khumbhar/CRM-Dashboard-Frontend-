import React, { useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import customersData from "../data/customers";

const Customers = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [customers, setCustomers] = useState(customersData);

  const filtered = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || c.status === statusFilter)
    );
  });

  const addCustomer = () => {
    const name = prompt("Enter Name");
    const email = prompt("Enter Email");
    const phone = prompt("Enter Phone");

    if (name && email && phone) {
      setCustomers([
        ...customers,
        { name, email, phone, status: "Active" },
      ]);
    }
  };

  return (
    <Layout>
      
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
        <h2 className="fw-bold">Customers</h2>

        <button className="btn btn-primary w-100 w-md-auto" onClick={addCustomer}>
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

      {/* Responsive Table FIX */}
      <div className="card shadow-sm p-3">
  <div className="table-responsive">
    <Table
      columns={["Name", "Email", "Phone", "Status"]}
      data={filtered}
    />
  </div>
</div>


    </Layout>
  );
};

export default Customers;
