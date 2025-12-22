// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blogs" },
  { name: "Experience", path: "/experiences" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  return (
    <>
      <div
        className="nav-scroll bg-white shadow-sm"
        style={{
          marginTop: "0px",
          top: "0px",
          height: "48px",
        }}
      >
        {/* Add justify-content-between to separate nav links and login */}
        <div className="container d-flex justify-content-between align-items-center">
          {/* Left: Nav Links */}
          <div className="d-flex align-items-center overflow-auto">
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `custom-nav-link ${isActive ? "active" : ""}`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>

          {/* Right: Login Button with 1rem margin (ms-3) */}
          <div className="ms-3 flex-shrink-0">
            <NavLink to="/admin/login" className="btn btn-outline-primary">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
