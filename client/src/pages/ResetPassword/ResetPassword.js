import React, { useState } from "react";
import axios from "axios";
import "./ResetPassword.css";
import { Navbar } from "../Start/components";

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {
    stateUpdate("");
  }, 2500);
};

const validEmail = (value) => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(value);
};

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  const isValidForm = () => {
    if (!validEmail(email))
      return updateError("Please enter a valid email!!", setError);

    return true;
  };

  const sentEmail = () => {
    if (isValidForm()) {
      const data = { email: email };
      axios
        .post("http://localhost:4000/auth/resetpassword", data)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
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
          <p>Enter your user account's verified email address</p>
          <p>and we will send you a password reset link.</p>
          <input
            type="email"
            placeholder=" Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button onClick={sentEmail}>Confirm</button>
          {confirm && (
            <p style={{ color: "green" }}>
              We sent you an email to change your password
            </p>
          )}
          {error ? (
            <p style={{ color: "red" }}>This is not a valid email!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
