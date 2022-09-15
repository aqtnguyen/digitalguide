import React from "react";
import { FaCity, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CreateMenu.css";

function CreateMenu() {
  const navigate = useNavigate();
  return (
    <div className="createMenuContainer">
      <div
        className="createMenuLeftSide"
        onClick={() => {
          navigate("/createtour");
        }}
      >
        <div className="createMenuTourContainer">
          <h1>Create a new Tour!</h1>
          <FaCity className="createMenuIcon" />
        </div>
      </div>
      <div
        className="createMenuRightSide"
        onClick={() => {
          navigate("/singlepoi");
        }}
      >
        <div className="createMenuTourContainer">
          <h1>Create a new POI!</h1>
          <FaMapMarkerAlt className="createMenuIcon" />
        </div>
      </div>
    </div>
  );
}

export default CreateMenu;
