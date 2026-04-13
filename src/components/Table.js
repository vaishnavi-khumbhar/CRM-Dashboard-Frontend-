import React from "react";

const Table = ({ columns, data, onDelete }) => {
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
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col, i) => {
              if (col === "Action") {
                return (
                  <td key={i}>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                );
              }
              return <td key={i}>{row[col.toLowerCase()]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
