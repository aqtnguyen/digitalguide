import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../helpers/AuthContext";
import Logout from "../../../../components/Logout/Logout";
import axios from "axios";

function QuizMenu() {
  const [listOfPois, setListOfPois] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/poi/${authState.id}`).then((response) => {
      setListOfPois(response.data);
    });
  }, []);

  return (
    <div className="singleStatMenuContainer">
      <Logout />
      <h1>Quiz Menu</h1>

      {listOfPois.map((value, index) => {
        return (
          <div
            className="statsMenuEntityContainer"
            key={index}
            onClick={() => {
              navigate(`/quiz/${value.id}`);
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

export default QuizMenu;
