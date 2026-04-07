import React, { useState } from "react";
import Layout from "../components/Layout";
import leadsData from "../data/leads";

const Leads = () => {
  const [leads, setLeads] = useState(leadsData);

  // Convert lead
  const convertLead = (index) => {
    const updated = [...leads];
    updated[index].status = "Converted";
    setLeads(updated);

    alert("Lead Converted to Customer!");
  };

  // Badge color logic
  const getBadge = (status) => {
    if (status === "New") return "bg-primary";
    if (status === "Contacted") return "bg-warning text-dark";
    if (status === "Converted") return "bg-success";
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Leads Management</h2>

      <div className="card shadow p-3">
        <table className="table align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead, i) => (
              <tr key={i}>
                <td className="fw-semibold">{lead.name}</td>

                <td>
                  <span className={`badge ${getBadge(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>

                <td>
                  {lead.status !== "Converted" ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => convertLead(i)}
                    >
                      Convert
                    </button>
                  ) : (
                    <span className="text-success fw-bold">
                      ✔ Done
                    </span>
                  )}
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
