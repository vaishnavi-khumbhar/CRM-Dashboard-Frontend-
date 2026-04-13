import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";



const Sales = () => {
  const [sales, setSales] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const hasFetched = useRef(false);

  const [form, setForm] = useState({
    product: "",
    amount: "",
    date: "",
    customerId: "",
  });

  // 📥 FETCH SALES
  useEffect(() => {
    const fetchSales = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const res = await fetch(`${API_BASE_URL}/api/sales`);

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();
        setSales(data || []);

        toast.success("Sales loaded successfully ✅", {
          toastId: "sales-load",
        });
      } catch (err) {
        console.error(err);

        toast.error("Failed to load sales ❌", {
          toastId: "sales-error",
        });
      }
    };

    fetchSales();
  }, []);

  // 🔍 FILTER
  const filteredSales = sales.filter((s) => {
    if (!selectedMonth) return true;
    return s.date?.split("-")[1] === selectedMonth;
  });

  // ✍️ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ ADD SALE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { product, amount, date } = form;

    if (!product || !amount || !date) {
      toast.warning("All required fields fill kara ⚠️", {
        toastId: "sales-validation",
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(amount),
        }),
      });

      if (!res.ok) throw new Error("Add failed");

      const data = await res.json();

      setSales((prev) => [...prev, data]);

      toast.success("Sale added successfully 💰", {
        toastId: "sales-add",
      });

      setForm({
        product: "",
        amount: "",
        date: "",
        customerId: "",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to add sale ❌", {
        toastId: "sales-add-error",
      });
    }
  };

  // 🗑 DELETE SALE
  const deleteSale = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/sales/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setSales((prev) => prev.filter((s) => s.id !== id));

      toast.success("Sale deleted successfully 🗑️", {
        toastId: "sales-delete",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete sale ❌", {
        toastId: "sales-delete-error",
      });
    }
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Sales Records</h2>

      {/* FORM */}
      <div className="card shadow p-3 mb-4">
        <h5>Add Sale</h5>

        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              name="product"
              placeholder="Product"
              value={form.product}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              name="customerId"
              placeholder="Customer ID"
              value={form.customerId}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>

      {/* FILTER */}
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

      {/* TABLE */}
      <div className="card shadow p-3">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((s) => (
              <tr key={s.id}>
                <td className="fw-semibold">{s.product}</td>
                <td className="text-success fw-bold">{s.amount}</td>
                <td>{s.date}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSale(s.id)}
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

export default Sales;
