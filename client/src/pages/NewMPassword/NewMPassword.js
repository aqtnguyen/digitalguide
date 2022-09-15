import React, { useState } from "react";
import axios from "axios";
import "./NewMPassword.css";
import { useParams } from "react-router-dom";
import { Navbar } from "../Start/components";

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {
    stateUpdate("");
  }, 2500);
};

function NewMPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  let { id } = useParams();

  const isValidForm = () => {
    if (password.length < 6)
      return updateError("Password must contain at least 6 chars!", setError);

    return true;
  };

  const newPassword = () => {
    if (isValidForm()) {
      const data = { password: password };
      axios
        .put(`http://192.168.0.2:4000/tourist/newpassword/${id}`, data)
        .then((response) => {
          if (response.data.error) {
            alert("Something went wrong, try again!");
          } else {
            setConfirm(true);
          }
        });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="mobilePassContainer">
        <div className="mobilePassContentContainer">
          <p>
            Enter your new password here. We will never ask about your password.
          </p>
          <input
            type="password"
            placeholder=" Enter new password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={newPassword}>Confirm</button>
          {confirm && (
            <p style={{ color: "green" }}>
              Your password has been successfully reset.
            </p>
          )}
          {error ? (
            <p style={{ color: "red" }}>Your password is too short!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default NewMPassword;
