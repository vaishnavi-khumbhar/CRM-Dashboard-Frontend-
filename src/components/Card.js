import React from "react";

const Card = ({ title, value, color }) => {
  return (
    <div className="col-md-4">
      <div
        className="card shadow-lg border-0 text-white"
        style={{
          background: color,
          borderRadius: "15px",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div className="card-body">
          <h6>{title}</h6>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
