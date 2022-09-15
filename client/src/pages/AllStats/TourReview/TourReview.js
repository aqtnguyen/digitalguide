import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Logout from "../../../components/Logout/Logout";
import axios from "axios";

function TourReview() {
  let { id } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/rev/${id}`)
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="generalStatsContainer">
      <Logout />
      <h1>Tour reviews</h1>
      <div>
        {review.map((value, index) => {
          return (
            <div key={index} className="tourReviewEntityContainer">
              <div className="tourReviewEntity">
                <p>{value.touristName}</p>
                <p>{value.createdAt}</p>
              </div>
              <p>{value.reviewText}</p>
              <p>Rating: {value.reviewRating}/5</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TourReview;
