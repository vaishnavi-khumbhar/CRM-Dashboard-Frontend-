import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy chart data
const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
];

const Dashboard = () => {
  return (
    <Layout>
      <h2 className="mb-4 fw-bold">Dashboard Overview</h2>

      {/* Cards */}
      <div className="row g-3">
        <Card title="Total Customers" value="120" color="#4e73df" />
        <Card title="Total Sales" value="₹75,000" color="#1cc88a" />
        <Card title="Pending Tasks" value="18" color="#f6c23e" />
      </div>

      {/* Chart Section */}
      <div className="card shadow mt-4 p-3">
        <h5 className="fw-bold mb-2">Sales Overview</h5>

        {/* Reduced height here */}
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4e73df"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="mt-4">
        <h5 className="fw-bold">Recent Activity</h5>

        <div className="card shadow-sm p-3">
          <p>✅ New customer registered</p>
          <p>💰 Sale completed</p>
          <p>📌 Task updated</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
