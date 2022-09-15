import React from "react";
import Feature from "../../components/feature/Feature";
import "./whatDG.css";

const WhatDG = () => (
  <div className="dgWhatContainer section__margin" id="wdg">
    <div className="dgWhatFeatureContainer">
      <Feature
        title="What is Digital Guide?"
        text="We support all locals out there. Why do you need to hire tour guides, when you can create several digital tours instead. Design and customize your own tour to attract new visitors."
      />
    </div>
    <div className="dgWhatHeader">
      <h1 className="gradient__text">
        Elevate your city to a whole new level!
      </h1>
    </div>
    <div className="dgWhatContentContainer">
      <Feature
        title="Tour"
        text="Create a tour with several Point of interests. The creation process is simple and straightforward!"
      />
      <Feature
        title="Stats"
        text="Have the possibility to monitor all your tours. That way, you can optimize and tailor your tour to obtain the best results!"
      />
      <Feature
        title="Gamification"
        text="Entertain your visitors with some gamification. We provide a great repertoire of games!"
      />
    </div>
  </div>
);

export default WhatDG;
