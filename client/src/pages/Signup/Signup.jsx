import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [error, setError] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required("You must enter a valid email!"),
    password: Yup.string().min(6).max(20).required(),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:4000/auth", data).then((response) => {
      if (response.data.error) {
        setError(response.data.error);
      } else {
        axios
          .post("http://localhost:4000/auth/login", {
            username: data.username,
            password: data.password,
          })
          .then((response) => {
            alert("Welcome to Digital Guide");
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
            navigate("/home");
          });
      }
    });
  };

  return (
    <div className="signupContainer">
      <h1>Digital Guide</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="signupForm">
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            className="signupInput"
            name="username"
            placeholder="Enter your username"
          />

          <ErrorMessage name="email" component="span" />
          <Field
            autoComplete="off"
            type="email"
            className="signupInput"
            name="email"
            placeholder="Enter your email"
          />

          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            className="signupInput"
            name="password"
            placeholder="Enter your password"
          />

          <ErrorMessage name="passwordConfirmation" component="span" />
          <Field
            autoComplete="off"
            type="password"
            className="signupInput"
            name="passwordConfirmation"
            placeholder="Confirm your Password..."
          />

          <button type="submit"> Register</button>
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </Form>
      </Formik>

      <p className="signupFont">
        Already have an Accont?{" "}
        <a className="linkFont" href="/login">
          Sign In
        </a>
      </p>

      <div className="signupTerm">
        <p>
          By creating an account, you agree to the <br />
          <a href="/login">Terms of Service</a>
          . For more information about <br />
          Digital Guide's privacy practise, see the <br />
          <a href="/login">Digital Guide Privacy Statement</a>
          . <br />
        </p>
      </div>
    </div>
  );
}

export default Signup;
