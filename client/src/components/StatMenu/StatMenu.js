import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import Logout from "../Logout/Logout";
import axios from "axios";
import "./StatMenu.css";

function StatMenu(props) {
  const [listOfTours, setListOfTours] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/tour/${authState.id}`).then((response) => {
      setListOfTours(response.data);
    });
  }, []);

  return (
    <div className="singleStatMenuContainer">
      <Logout />
      <h1>{props.title}</h1>

      {listOfTours.map((value, index) => {
        return (
          <div
            className="statsMenuEntityContainer"
            key={index}
            onClick={() => {
              navigate(`/${props.link}/${value.id}`);
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
  );
}

export default StatMenu;
