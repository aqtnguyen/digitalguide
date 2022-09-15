import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Logout from "../../../components/Logout/Logout";
import BarChart from "../../../components/BarChart/BarChart";
import axios from "axios";

function RatingStats() {
  let { id } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/rev/${id}`)
      .then((response) => {
        setReview(response.data);
        //console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const one = review.filter((value) => {
    return value.reviewRating === 1;
  });
  const two = review.filter((value) => {
    return value.reviewRating === 2;
  });
  const three = review.filter((value) => {
    return value.reviewRating === 3;
  });
  const four = review.filter((value) => {
    return value.reviewRating === 4;
  });
  const five = review.filter((value) => {
    return value.reviewRating === 5;
  });

  const chartData = {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: "Rating ratio",
        data: [one.length, two.length, three.length, four.length, five.length],
        backgroundColor: "#fd9727",
        borderColor: "#fd9727",
      },
    ],
  };

  return (
    <div className="generalStatsContainer">
      <Logout />
      <h1>Tour rating stats</h1>
      <div style={{ width: "90%" }}>
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
}

export default RatingStats;
