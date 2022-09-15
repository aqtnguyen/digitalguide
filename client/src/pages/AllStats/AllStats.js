import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../../components/Logout/Logout";
import "./AllStats.css";

function AllStats() {
  const navigate = useNavigate();
  return (
    <div className="allStatsContainer">
      <Logout />
      <h1>All Stats</h1>
      <p
        className="featureTag"
        onClick={() => {
          navigate("/generalstats");
        }}
      >
        1. Overview all tours
      </p>
      <p
        className="featureTag"
        onClick={() => {
          navigate("/singlestatmenu");
        }}
      >
        2. Single stat view
      </p>
      <p
        className="featureTag"
        onClick={() => {
          navigate("/ratingmenu");
        }}
      >
        3. Tour rating stats
      </p>
      <p
        className="featureTag"
        onClick={() => {
          navigate("/reviewmenu");
        }}
      >
        4. Review menu
      </p>
    </div>
  );
}

export default AllStats;
