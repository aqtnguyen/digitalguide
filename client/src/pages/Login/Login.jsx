import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const signIn = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:4000/auth/login", data).then((response) => {
      if (response.data.error) {
        setError(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/home");
      }
    });
  };

  return (
    <div className="loginContainer">
      <h1>Sign In to Digital Guide</h1>
      <div className="loginFormContainer">
        <p>Username or Email</p>
        <input
          type="text"
          placeholder=" Enter your username or email"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <div className="loginPasswordSection">
          <p>Password</p>
          <a href="/resetpassword">Forgot Password</a>
        </div>
        <input
          type="password"
          placeholder=" Enter your password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={signIn}>Sign In</button>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
      </div>

      <div className="signUpLinkContainer">
        <p>
          New to Digital Guide? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
