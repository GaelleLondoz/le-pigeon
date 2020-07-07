import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useParams,
} from "react-router-dom";
import Nav from "./components/navigation/Nav";
import Head from "./components/Head";
import Footer from "./components/Footer";
import ChatBox from "./components/chatbox/ChatBox";
import AdminDashboard from "./components/admin/AdminDashboard";
import AuthAPI from "./components/services/authAPI";
import userAPI from "./components/services/userAPI";
import AuthContext from "./contexts/AuthContext";
import SearchAgentsContext from "./contexts/SearchAgentsContext";

import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Help from "./pages/Help";
import Messages from "./pages/Messages";
import BecomeAgent from "./pages/BecomeAgent";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import "./assets/sass/body.scss";
import PrivateRoute from "./components/redirections/PrivateRoutes";
import AdminRoute from "./components/redirections/AdminRoutes";
import LoginNotAllowedRoutes from "./components/redirections/LoginNotAllowedRoutes";
import ProfileAgent from "./pages/profileAgent";
import ShowTravelDetails from "./pages/profileAgent/ShowTravelDetails";
import ShowAgent from "./pages/ShowAgent";
//import MainNavigation from "./components/navigation/MainNavigation";
import MainNav from "./components/navigation/MainNav";
import UserAccount from "./pages/profileUser/UserAccount";
import UserMessage from "./pages/profileUser/UserMessage";
import UserBooking from "./pages/profileUser/UserBooking";
import Agents from "./pages/Agents";

AuthAPI.setup();
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );
  const [isAdmin, setIsAdmin] = useState(
    userAPI.isAdmin().then((status) => {
      setIsAdmin(status);
    })
  );

  const [searchAgents, setSearchAgents] = useState([]);
  const [searchDisplay, setSearchDisplay] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  // fetch user
  const fetchUser = async () => {
    try {
      const { user } = await userAPI.getUser();
      setCurrentUser(user);
    } catch (error) {
      throw error.response;
    }
  };

  useEffect(() => {
    isAuthenticated && fetchUser();
    //setSearchAgents([]);
  }, []);

  // const NavBarWithRouter = withRouter(Nav);
  // const MainNavigationWithRouter = withRouter(MainNavigation);
  const MainNavWithRouter = withRouter(MainNav);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
  };
  const contextSearchAgentsValue = {
    searchAgents,
    setSearchAgents,
    searchDisplay,
    setSearchDisplay,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <SearchAgentsContext.Provider value={contextSearchAgentsValue}>
        <Router>
          <Head />
          {/* <NavBarWithRouter /> */}
          {/* <MainNavigationWithRouter /> */}
          <MainNavWithRouter />
          <main>
            <Switch>
              {/*<Route exact path="/" component={Home} />*/}
              <Route exact path="/chat" component={ChatBox} />
              <AdminRoute exact path="/admin" component={AdminDashboard} />
              <Route exact path="/" component={Home} />
              <Route exact path="/connect" component={Connect} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/message" component={Messages} />
              <Route exact path="/become-agent" component={BecomeAgent} />
              <Route exact path="/agent/:id" component={ShowAgent} />

              <Route exact path="/agents" component={Agents} />
              <LoginNotAllowedRoutes exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Home} />
              <Route
                exact
                path="/agent/:id/destination/:destinationId"
                component={ShowTravelDetails}
              />
              <PrivateRoute
                exact
                path="/profile/agent/:id"
                component={ProfileAgent}
              />
              <PrivateRoute
                exact
                path="/profile/user/:id/account"
                component={UserAccount}
              />
              <PrivateRoute
                exact
                path="/profile/user/:id/message"
                component={UserMessage}
              />
              <PrivateRoute
                exact
                path="/profile/user/:id/booking"
                component={UserBooking}
              />

              {/* <Route exact path="/users/:id" component={Profile} /> */}
            </Switch>
          </main>
          <Footer />
        </Router>
      </SearchAgentsContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
