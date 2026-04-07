import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <div className={dark ? "bg-dark text-white" : "bg-light"}>
      <Navbar toggleTheme={toggleTheme} />

      <div className="d-flex">
        <Sidebar />

        <div className="p-4 w-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
