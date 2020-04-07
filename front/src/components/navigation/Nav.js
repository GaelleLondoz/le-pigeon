import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import RoutesNav from "./RoutesNav";
//////////////// Material-ui /////////////////////////////

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

///////////////// SASS /////////////////////////////////////

import "../../assets/sass/_nav.scss";

///////////////// Icons /////////////////////////////////////

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HelpIcon from "@material-ui/icons/Help";
import EmailIcon from "@material-ui/icons/Email";
import Login from "../../pages/Login";

// 2 // created navigation
// export to App.js
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

let Nav = (props) => {
  const classes = useStyles();

  const handleLogin = () => {
    props.login();
  };

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              <Link to="/" className="navElement">
                LE PIGEON{" "}
              </Link>{" "}
            </Typography>{" "}
            {props.auth !== null ? (
              <Link to="/message" className="navElement">
                <EmailIcon className="icon" />
              </Link>
            ) : (
              ""
            )}{" "}
            {props.auth === null ? (
              /* {<Link to="/connect" className="navElement">
                  Se connecter
                </Link> : ""*/
              <button onClick={() => handleLogin()}> Se connecter </button>
            ) : (
              ""
            )}{" "}
            <Link to="/help" className="navElement">
              <HelpIcon className="icon" />
            </Link>{" "}
            <Link to="/become-agent" className="navElement">
              Devenez agent!
            </Link>{" "}
            <Link to="/login" className="navElement">
              <AccountCircleIcon className="icon" />
            </Link>{" "}
          </Toolbar>{" "}
        </AppBar>{" "}
      </div>{" "}
      <RoutesNav />
    </Router>
  );
};

const mapStateToAuth = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToAuth = (dispatch) => {
  return {
    login: () => {
      //Dispatch => role: call a action of type ...(SET_AUTH)
      dispatch({ type: "SET_AUTH" });
    },
  };
};

Nav = connect(mapStateToAuth, mapDispatchToAuth)(Nav);
export default Nav;
