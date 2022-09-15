import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import "./Logout.css";

function Logout() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/");
  };

  return (
    <div>
      <div className="logoutBtn">
        <p className="logoutTag">Hello {authState.username}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Logout;
