import React from "react";
import frontImg from "../../assets/frontimg.svg";
import "./header.css";

const Header = () => (
  <div className="dgHeaderContainer section__padding" id="home">
    <div className="dgHeaderContent">
      <h1 className="gradient__text">
        Join our Community and create your own tour.
      </h1>
      <p>
        Thousands of cities create, distribute and maintain their tours on
        Digital Guide —the greatest and most adventurous guide platform in the
        world.
      </p>
    </div>

    <div className="dgHeaderImageContainer">
      <img src={frontImg} alt="frontImg" />
    </div>
  </div>
);

export default Header;
