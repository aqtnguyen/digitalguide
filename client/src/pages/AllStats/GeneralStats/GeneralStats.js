import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../helpers/AuthContext";
import Logout from "../../../components/Logout/Logout";
import BarChart from "../../../components/BarChart/BarChart";
import axios from "axios";
import "./GeneralStats.css";

function GeneralStats() {
  const [listOfTours, setListOfTours] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:4000/tour/${authState.id}`).then((response) => {
      setListOfTours(response.data);
    });
  }, []);

  const chartData = {
    labels: listOfTours.map((data) => data.title),
    datasets: [
      {
        label: "Total walks",
        data: listOfTours.map((data) => data.counter),
        backgroundColor: "#fd9727",
        borderColor: "#fd9727",
      },
    ],
  };

  console.log(chartData);

  return (
    <div className="generalStatsContainer">
      <Logout />
      <h1>General stats</h1>
      <div style={{ width: "90%" }}>
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
}

export default GeneralStats;
