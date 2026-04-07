import React from "react";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Sales Data
const salesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 700 },
  { month: "Mar", sales: 1000 },
  { month: "Apr", sales: 600 },
];

// Customer Growth Data
const growthData = [
  { name: "New", value: 400 },
  { name: "Returning", value: 300 },
];

const COLORS = ["#4e73df", "#1cc88a"];

const Reports = () => {
  return (
    <Layout>
      <h2 className="fw-bold mb-4">Reports & Analytics</h2>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h6>Total Sales</h6>
            <h4 className="text-success">₹1,50,000</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h6>Customers Growth</h6>
            <h4 className="text-primary">+25%</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h6>Monthly Orders</h6>
            <h4 className="text-warning">320</h4>
          </div>
        </div>
      </div>

      <div className="row g-4">

        {/* Bar Chart */}
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="fw-bold mb-3">Monthly Sales</h5>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4e73df" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="fw-bold mb-3">Customer Growth</h5>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={growthData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {growthData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Reports;
