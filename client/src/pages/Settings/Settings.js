import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import "./Settings.css";
import Logout from "../../components/Logout/Logout";

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

function Settings() {
  const [userInfo, setUserInfo] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:4000/auth/${authState.id}`).then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  const isValidEmail = () => {
    if (!validEmail(oldEmail))
      return updateError("Please enter a valid email!!", setError);
    if (!validEmail(newEmail))
      return updateError("Please enter a valid email!!", setError);
    return true;
  };

  const isValidPassword = () => {
    if (newPassword.length < 6)
      return updateError("Password must contain at least 6 chars!", setError);
    return true;
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (isValidPassword()) {
      await axios
        .put(
          "http://localhost:4000/auth/changepassword",
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            setConfirm(true);
            setOldPassword("");
            setNewPassword("");
          }
        });
    }
  };

  const changeEmail = async (e) => {
    e.preventDefault();
    if (isValidEmail()) {
      await axios
        .put(
          "http://localhost:4000/auth/changeemail",
          {
            oldEmail: oldEmail,
            newEmail: newEmail,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            setConfirm(true);
            setOldEmail("");
            setNewEmail("");
            setUserInfo(
              userInfo.map((val) => {
                return val.id === authState.id
                  ? { username: val.username, email: newEmail }
                  : val;
              })
            );
          }
        });
    }
  };

  return (
    <div className="accountContainer">
      <Logout />
      <h1>Account information</h1>
      <div className="accountInformationContainer">
        <div className="accountInformation">
          <p>username:</p>
          <p>email:</p>
        </div>

        <div>
          {userInfo.map((value, key) => {
            return (
              <div key={key}>
                <p>{value.username}</p>
                <p>{value.email}</p>
              </div>
            );
          })}
        </div>
      </div>
      <h2>Change credentials</h2>
      <form className="updateAccountFormContainer" onSubmit={changeEmail}>
        <div>
          <p>Current email</p>
          <input
            placeholder="current email"
            onChange={(e) => {
              setOldEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <p>New email</p>
          <input
            placeholder="current email"
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
        </div>
        <div className="updateAccountFormButtonContainer">
          <button className="updateButton1" type="submit">
            Submit
          </button>
        </div>
      </form>

      <form className="updateAccountFormContainer">
        <div>
          <p>Current password</p>
          <input
            type="password"
            placeholder="current password"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <p>New password</p>
          <input
            type="password"
            placeholder="new password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div className="updateAccountFormButtonContainer">
          <button onClick={changePassword}>Submit</button>
        </div>
      </form>
      {confirm && (
        <p style={{ color: "green" }}>
          You successfully changed your credentials
        </p>
      )}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
    </div>
  );
}

export default Settings;
