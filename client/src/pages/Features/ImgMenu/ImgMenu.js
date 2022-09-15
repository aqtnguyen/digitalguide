import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import axios from "axios";
import "./ImgMenu.css";
import Logout from "../../../components/Logout/Logout";

function ImgMenu() {
  const [listOfTours, setListOfTours] = useState([]);
  const [listOfPois, setListOfPois] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/tour/${authState.id}`).then((response) => {
      setListOfTours(response.data);
    });

    axios.get(`http://localhost:4000/poi/${authState.id}`).then((response) => {
      setListOfPois(response.data);
    });
  }, []);

  return (
    <div className="imgMenuContainer">
      <Logout />
      <h1>Image Menu</h1>
      <div className="imgMenuContentContainer">
        <div className="imgMenuLeftSide">
          <h2>Add additional Tour images</h2>
          {listOfTours.map((value, index) => {
            return (
              <div
                className="entityImgTitleContainer"
                key={index}
                onClick={() => {
                  navigate(`/addtourimg/${value.id}`);
                }}
              >
                <p>
                  {" "}
                  {index + 1} {value.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="imgMenuRightSide">
          <h2>Add additional POI images</h2>
          {listOfPois.map((value, index) => {
            return (
              <div
                className="entityImgTitleContainer"
                key={index}
                onClick={() => {
                  navigate(`/addpoiimg/${value.id}`);
                }}
              >
                <p>
                  {" "}
                  {index + 1} {value.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ImgMenu;
