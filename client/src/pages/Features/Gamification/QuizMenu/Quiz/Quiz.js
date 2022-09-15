import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Logout from "../../../../../components/Logout/Logout";
import axios from "axios";
import "./Quiz.css";
import AlertBar from "../../../../../components/AlertBar/AlertBar";

function Quiz() {
  const [quest, setQuest] = useState("");
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  let { id } = useParams();
  const alertBarRef = useRef(null);

  const sortOptions = ["", "right", "wrong"];

  useEffect(async () => {
    await axios
      .get(`http://localhost:4000/quiz/${id}`)
      .then((response) => {
        if (response.data.status) {
          setQuest(response.data.found.question);
          setAns1(response.data.found.answer1);
          setAns2(response.data.found.answer2);
          setAns3(response.data.found.answer3);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(ans1.substring(0, ans1.length + opt1.length - 5));

    const data = {
      question: quest,
      answer1: ans1 + " " + opt1,
      answer2: ans2 + " " + opt2,
      answer3: ans3 + " " + opt3,
      poiId: id,
    };
    await axios
      .post("http://localhost:4000/quiz", data)
      .then(() => {
        alertBarRef.current.show();
      })
      .catch((error) => console.log(error));
  };

  const alertBarType = {
    success: "success",
    fail: "fail",
  };

  const clearInput = () => {
    setQuest("");
    setAns1("");
    setAns2("");
    setAns3("");
  };

  return (
    <div className="quizContainer">
      <Logout />
      <AlertBar
        ref={alertBarRef}
        message="Task completed successfully!"
        type={alertBarType.success}
      />
      <h1>Create a new quiz</h1>

      <div>
        <div className="questionContainer">
          <p>Question</p>
          <input
            type="text"
            value={quest}
            onChange={(e) => setQuest(e.target.value)}
            required
          />
        </div>

        <div className="questionContainer">
          <p>Answer 1</p>
          <div>
            <input
              type="text"
              value={ans1}
              onChange={(e) => setAns1(e.target.value)}
              required
            />
            <select value={opt1} onChange={(e) => setOpt1(e.target.value)}>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <p>Answer 2</p>
          <div>
            <input
              type="text"
              value={ans2}
              onChange={(e) => setAns2(e.target.value)}
              required
            />
            <select value={opt2} onChange={(e) => setOpt2(e.target.value)}>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <p>Answer 3</p>
          <div>
            <input
              type="text"
              value={ans3}
              onChange={(e) => setAns3(e.target.value)}
              required
            />
            <select value={opt3} onChange={(e) => setOpt3(e.target.value)}>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleSubmit}>Submit</button>
          <button onClick={clearInput} className="questionClearButton">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
