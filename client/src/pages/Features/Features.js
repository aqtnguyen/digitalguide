import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../../components/Logout/Logout";
import "./Features.css";

function Features() {
  const navigate = useNavigate();

  return (
    <div className="featureContainer">
      <Logout />
      <h1>Features</h1>
      <p
        className="featureTag"
        onClick={() => {
          navigate("/imgmenu");
        }}
      >
        1. Add additional images
      </p>
      <p
        className="featureTag"
        onClick={() => {
          navigate("/quizmenu");
        }}
      >
        2. Create a quiz game
      </p>
    </div>
  );
}

export default Features;
