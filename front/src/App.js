import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Nav from "./components/navigation/Nav";
import Head from "./components/Head";
import Footer from "./components/Footer";
import ChatBox from "./components/chatbox/ChatBox";
import AuthAPI from "./components/services/authAPI";
import AuthContext from "./contexts/AuthContext";

import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Help from "./pages/Help";
import Messages from "./pages/Messages";
import BecomeAgent from "./pages/BecomeAgent";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import "./assets/sass/body.scss";
import PrivateRoute from "./components/redirections/PrivateRoutes";
import LoginNotAllowedRoutes from "./components/redirections/LoginNotAllowedRoutes";
import ProfileAgent from "./pages/profileAgent";
import ShowTravelDetails from "./pages/profileAgent/ShowTravelDetails";

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const [currentUser, setCurrentUser] = useState({});

  const NavBarWithRouter = withRouter(Nav);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <Router>
        <Head />
        <NavBarWithRouter />
        <main>
          <Switch>
            {/*<Route exact path="/" component={Home} />*/}
            <Route exact path="/chat" component={ChatBox} />
            <Route exact path="/" component={Home} />
            <Route exact path="/connect" component={Connect} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/message" component={Messages} />
            <Route exact path="/become-agent" component={BecomeAgent} />
            <LoginNotAllowedRoutes exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/profile/agent/:id/destination/:destinationId"
              component={ShowTravelDetails}
            />
            <PrivateRoute
              exact
              path="/profile/agent/:id"
              component={ProfileAgent}
            />
          </Switch>
        </main>
        {/*<Footer />*/}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
