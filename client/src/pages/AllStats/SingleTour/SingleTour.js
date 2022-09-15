import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logout from "../../../components/Logout/Logout";
import BarChart from "../../../components/BarChart/BarChart";
import axios from "axios";

function SingleTour() {
  let { id } = useParams();
  const [listOfPois, setListOfPois] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/poi/list/${id}`)
      .then((response) => {
        setListOfPois(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const chartData = {
    labels: listOfPois.map((data) => data.title),
    datasets: [
      {
        label: "Total walks",
        data: listOfPois.map((data) => data.counter),
        backgroundColor: "#fd9727",
        borderColor: "#fd9727",
      },
    ],
  };

  return (
    <div className="generalStatsContainer">
      <Logout />
      <h1>POI stats</h1>
      <div style={{ width: "90%" }}>
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
}

export default SingleTour;
