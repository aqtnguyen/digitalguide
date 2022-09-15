import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./AlertBar.css";

const AlertBar = forwardRef((props, ref) => {
  const [showAlertBar, setShowAlertBar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowAlertBar(true);
      setTimeout(() => {
        setShowAlertBar(false);
      }, 2000);
    },
  }));

  return (
    <div
      className="alertBar"
      id={showAlertBar ? "show" : "hide"}
      style={{
        backgroundColor: props.type === "success" ? "#00F593" : "#FF0033",
        color: props.type === "success" ? "black" : "white",
      }}
    >
      <div className="symbol">
        {props.type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className="message">{props.message}</div>
    </div>
  );
});

export default AlertBar;
