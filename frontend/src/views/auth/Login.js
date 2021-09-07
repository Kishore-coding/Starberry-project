import Axios from "axios";
import React, { useState, useContext, Fragment } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorHandling from "../../error/ErrorHandling";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  let history = useHistory();
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:3000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/appartments");
    } catch (err) {
      err.response?.data.msg && setError(err.response.data.msg);
    }
  };
  document.title = "login";
  return (
    <Fragment>
      <div className="login">
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        {error && (
          <ErrorHandling
            message={error}
            clearError={() => setError(undefined)}
          />
        )}
        <form className="form" onSubmit={submitHandler}>
          <label>Email</label>
          <input
            className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <br></br>
          <label>Password</label>
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>

          <div className="login_button">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
        <div className="new-user">
          <p>New to this site?</p>
          <Link to="/register">Create your account</Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
