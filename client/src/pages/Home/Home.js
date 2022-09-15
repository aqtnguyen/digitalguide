import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import Logout from "../../components/Logout/Logout";
import axios from "axios";
import "./Home.css";

function Home() {
  const [listOfTours, setListOfTours] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/tour/${authState.id}`).then((response) => {
      setListOfTours(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <Logout />
        <h1>Welcome</h1>
      </div>
      <h2>Still in progress</h2>
      <div className="tourListView">
        {listOfTours.map((value, index) => {
          return (
            <div key={index}>
              {!value.distance && (
                <div
                  className="tourBody"
                  onClick={() => {
                    navigate(`/tourcontent/${value.id}`);
                  }}
                >
                  <img src={"http://localhost:4000/Images/" + value.tourImg} />
                  <div className="tourTitle">{value.title}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <h2>Finished tours</h2>
      <div className="tourListView">
        {listOfTours.map((value, index) => {
          return (
            <div key={index}>
              {/[1-9]/.test(value.distance) && (
                <div
                  className="tourBody"
                  onClick={() => {
                    navigate(`/tourcontent/${value.id}`);
                  }}
                >
                  <img src={"http://localhost:4000/Images/" + value.tourImg} />
                  <div className="tourTitle">{value.title}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
