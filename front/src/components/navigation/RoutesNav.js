import React from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Connect from "../../pages/Connect";
import Help from "../../pages/Help";
import BecomeAgent from "../../pages/BecomeAgent";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Messages from "../../pages/Messages";

// 1 //after created each pages, create paths:
// export to Nav.js

// this function is called only once, before application initially starts to render react-route and any of its related DOM elements
// it can be used to add init config settings to the application

let headers = {
  "Content-Type": "application/json",
  Authorization: "",
};

async function onAppInit({ token }) {
  try {
    headers.Authorization = token;
    const checkAuth = await axios.get("/me", {
      headers: headers,
    });
    console.log({ checkAuth: checkAuth });
    if (checkAuth.status === "200") {
      console.log("REDIRECT ON GOING");
      return <Redirect to="/" />;
    }
  } catch (error) {
    console.log(error.response);
  }
}

let RoutesNav = (props) => {
  return (
    <Switch>
      <Route path="/connect">
        <Connect />
      </Route>{" "}
      <Route path="/help">
        <Help />
      </Route>{" "}
      <Route path="/message">
        <Messages />
      </Route>{" "}
      <Route path="/become-agent">
        <BecomeAgent />
      </Route>{" "}
      <Route path="/login" onEnter={onAppInit(props)}>
        <Login />
      </Route>{" "}
      <Route path="/">
        <Home />
      </Route>{" "}
    </Switch>
  );
};

const mapStateToAuth = (state) => {
  return {
    token: state.token,
  };
};

RoutesNav = connect(mapStateToAuth)(RoutesNav);

export default RoutesNav;
