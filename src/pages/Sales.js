import React, { useState } from "react";
import Layout from "../components/Layout";
import salesData from "../data/sales";

const Sales = () => {
  const [sales] = useState(salesData);
  const [selectedMonth, setSelectedMonth] = useState("");

  // Filter logic
  const filteredSales = sales.filter((s) => {
    if (!selectedMonth) return true;
    return s.date.split("-")[1] === selectedMonth;
  });

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Sales Records</h2>

      {/* Filter */}
      <div className="mb-3 d-flex gap-2">
        <select
          className="form-select w-25"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
        </select>
      </div>

      {/* Table */}
      <div className="card shadow p-3">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((s, i) => (
              <tr key={i}>
                <td className="fw-semibold">{s.product}</td>
                <td className="text-success fw-bold">{s.amount}</td>
                <td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Sales;
