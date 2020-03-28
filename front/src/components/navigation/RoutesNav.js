import React from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Connect from '../../pages/Connect';
import Help from '../../pages/Help';
import BecomeAgent from '../../pages/BecomeAgent';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Messages from '../../pages/Messages';

// 1 //after created each pages, create paths:
// export to Nav.js

export default function RoutesNav() {
  return (
        <Switch>
        <Route path="/connect">
            <Connect />
          </Route>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/message">
            <Messages />
          </Route>
          <Route path="/become-agent">
            <BecomeAgent />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
  );
}
