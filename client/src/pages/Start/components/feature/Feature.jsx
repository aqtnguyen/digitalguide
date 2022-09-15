import React from "react";
import "./feature.css";

const Feature = ({ title, text }) => (
  <div className="dgFeatureContainer">
    <div className="dgFeatureTitle">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="dgTextContainer">
      <p>{text}</p>
    </div>
  </div>
);

export default Feature;
