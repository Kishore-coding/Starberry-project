import React, { useState, useEffect } from "react";
import Appartments from "./views/Appartments";
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewPage from "./views/ViewPage";
import axios from "axios";
import UserContext from "./context/UserContext";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:3000/users/tokenIsValid",
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:3000/users/", {
          headers: {
            "x-auth-token": token,
          },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/appartments" exact component={Appartments} />
          <Route path="/register" component={Register} />
          <Route path="/appartments/:id" component={ViewPage} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
