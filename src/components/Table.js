import React from "react";

const Table = ({ columns, data }) => {
  return (
    <table className="table table-striped w-100">
      <thead className="table-dark">
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col, i) => (
              <td key={i}>{row[col.toLowerCase()]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
