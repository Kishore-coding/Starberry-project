import Axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import "../../index.css";
import ErrorHandling from "../../error/ErrorHandling";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  let history = useHistory();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const newUser = { email, password, passwordCheck, displayName };
      const Register = await Axios.post(
        "http://localhost:3000/users/register",
        newUser
      );

      setUserData({
        token: Register.data.token,
        user: Register.data.user,
      });
      localStorage.setItem("auth-token", Register.data.token);

      history.push("/");
    } catch (err) {
      err.response?.data.msg && setError(err.response.data.msg);
    }
  };
  document.title = "Register page";
  return (
    <div className="register">
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      {error && (
        <ErrorHandling message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submitHandler}>
        <label>Email</label>
        <input
          className="input"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label>Password</label>
        <input
          className="input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <label>Retype password</label>
        <input
          className="input"
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <br></br>
        <label>Name</label>
        <input
          className="input"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <br></br>
        <div className="register_button">
          <input className="register-button" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}

export default Register;
