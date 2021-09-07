import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  let history = useHistory();

  const loginHandler = () => history.push("/login");

  const registerHandler = () => history.push("/register");

  const logoutHandler = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <div className="auth-buttons">
      {userData.user ? (
        <div>
          <button onClick={logoutHandler}>Log out</button>
        </div>
      ) : (
        <div>
          <button onClick={loginHandler}>Login</button>
          <button onClick={registerHandler}>Register</button>
        </div>
      )}
    </div>
  );
}

export default AuthOptions;
