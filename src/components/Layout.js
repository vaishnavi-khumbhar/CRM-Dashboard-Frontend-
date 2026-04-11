import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={dark ? "bg-dark text-white" : "bg-light"}>
      <Navbar
        toggleTheme={toggleTheme}
        dark={dark}
        toggleSidebar={toggleSidebar}
      />

      <div className="d-flex">
        <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />

        <div className="p-3 p-md-4 w-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
