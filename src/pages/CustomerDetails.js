import React, { useState } from "react";
import Layout from "../components/Layout";

const CustomerDetails = () => {
  const [notes, setNotes] = useState("");

  const customer = {
    name: "John Doe",
    email: "john@gmail.com",
    phone: "9876543210",
    status: "Active",
  };

  const purchases = [
    { product: "Laptop", amount: "₹50,000" },
    { product: "Headphones", amount: "₹2,000" },
  ];

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Customer Details</h2>

      <div className="row g-4">

        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card shadow text-center p-4">
            <div
              className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{ width: "80px", height: "80px", fontSize: "30px" }}
            >
              {customer.name.charAt(0)}
            </div>

            <h4>{customer.name}</h4>
            <span className="badge bg-success">{customer.status}</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h5 className="fw-bold mb-3">Contact Information</h5>

            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
          </div>
        </div>

        {/* Purchase History */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="fw-bold mb-3">Purchase History</h5>

            <ul className="list-group">
              {purchases.map((p, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between">
                  {p.product}
                  <span>{p.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notes Section */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="fw-bold mb-3">Notes</h5>

            <textarea
              className="form-control mb-3"
              rows="5"
              placeholder="Write notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button
              className="btn btn-primary"
              onClick={() => alert("Notes Saved")}
            >
              Save Notes
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default CustomerDetails;
