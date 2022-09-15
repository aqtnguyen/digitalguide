import React, { useState } from "react";
import {
  FaBars,
  FaRegChartBar,
  FaCity,
  FaMapMarkerAlt,
  FaPlusSquare,
  FaRegSun,
} from "react-icons/fa";
import logo from "./logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "./SideBar.css";

function SideBar({ children }) {
  const [openStatus, setOpenStatus] = useState(true);
  const toggle = () => setOpenStatus(!openStatus);
  const navigate = useNavigate();
  const menuItem = [
    {
      name: "All Stats",
      icon: <FaRegChartBar />,
      path: "/allstats",
    },

    {
      name: "Overview Tours",
      icon: <FaCity />,
      path: "/alltours",
    },

    {
      name: "Overview POIs",
      icon: <FaMapMarkerAlt />,
      path: "/allpois",
    },

    {
      name: "Features",
      icon: <FaPlusSquare />,
      path: "/features",
    },

    {
      name: "Settings",
      icon: <FaRegSun />,
      path: "/settings",
    },
  ];

  return (
    <div className="sidebarContainer">
      <div
        style={{ width: openStatus ? "300px" : "60px" }}
        className="sidebarData"
      >
        <div className="topSection">
          <img
            style={{ display: openStatus ? "block" : "none" }}
            src={logo}
            onClick={() => {
              navigate("/home");
            }}
            alt="logo"
          />
          <div className="sidebarCircle">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="dashboardSection">
          <h1 style={{ display: openStatus ? "block" : "none" }}>Dashboard</h1>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="sidebarLink"
            activeclassname="active"
          >
            <div className="sidebarIcon">{item.icon}</div>
            <div
              style={{ display: openStatus ? "block" : "none" }}
              className="sidebarName"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <div className="sidebarButtonContainer">
          <button
            style={{ width: openStatus ? "240px" : "60px" }}
            onClick={() => {
              navigate("/createmenu");
            }}
          >
            Add
          </button>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default SideBar;
