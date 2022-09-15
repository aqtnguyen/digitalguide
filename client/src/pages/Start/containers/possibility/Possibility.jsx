import React from "react";
import mobileDemo from "../../assets/mobiledemo.png";
import "./possibility.css";

const Possibility = () => (
  <div className="dgPossibilityContainer section__padding" id="possibility">
    <div className="dgPossibilityImage">
      <img src={mobileDemo} alt="mobileDemo" />
    </div>
    <div className="dgPossibilityContent">
      <h1 className="gradient__text">
        The visitors will love it <br /> why staying at home when <br /> there
        is an adventure in the city!
      </h1>
      <p>
        Visitors can use their cell phones to navigate themselves trough your
        city. The Digital Guide app is available for any platforms.
      </p>
    </div>
  </div>
);

export default Possibility;
