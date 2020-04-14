import React from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Connect from "../../pages/Connect";
import Help from "../../pages/Help";
import BecomeAgent from "../../pages/BecomeAgent";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Messages from "../../pages/Messages";
import requireAuth from "../../middlewares/requireAuth";
import requireLocation from "../../middlewares/requireLocation";
//import { Component } from "react";

// 1 //after created each pages, create paths:
// export to Nav.js

// this function is called only once, before application initially starts to render react-route and any of its related DOM elements
// it can be used to add init config settings to the application

/* const checkAuth = {
  isAuthenticated: false,
  check(store) {
    console.log({ store });
    headers.Authorization = store.token;
    // const { data, status } = axios.get("/me", {
    //   headers
    // });
    // if (status === 200) {
    //   store.setAuth({
    //     payload: data.user,
    //     token: store.token
    //   });
    //   this.isAuthenticated = true;
    // }
    axios
      .get("/me", {
        headers,
      })
      .then((res) => {
        console.log({ res });
        if (res.status === 200) {
          console.log({ "res.status": res.status });
          this.isAuthenticated = true;
        }
      })
      .catch((e) => console.log(e));
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const { value: label } = this
  checkAuth.check(rest.store);
  console.log({ "rest.store": rest.store.token });
  if (checkAuth.isAuthenticated === false) {
    console.log({
      "quandcetfauxcheckAuth.isAuthenticated": checkAuth.isAuthenticated,
    });
    return <Redirect to="/login" />;
  } else {
    console.log({ "checkAuth.isAuthenticated": checkAuth.isAuthenticated });
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
}; */

let RoutesNav = (props) => {
  console.log({ requireAuth: requireAuth });
  return (
    <>
      <Route exact path="/connect" component={Connect} />
      <Route exact path="/help">
        <Help />
      </Route>
      <Route exact path="/message">
        <Messages />
      </Route>
      <Route exact path="/become-agent" component={BecomeAgent} />
      <Route exact path="/login" component={requireLocation(Login)} />
      <Route exact path="/" component={requireAuth(Home)} />

      {/* <PrivateRoute exact path="/" store={props} component={Home} /> */}
      {/* <Route exact path="/" component={Home} /> */}
    </>
  );
};

export default RoutesNav;
