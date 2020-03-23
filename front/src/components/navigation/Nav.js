import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import RoutesNav from "./RoutesNav";
//////////////// Material-ui /////////////////////////////
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
/////////////////////////////////////////////////////////
import "../../assets/sass/Nav.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// 2 // created navigation
// export to App.js
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Nav() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              <Link to="/" className="navElement">
                LE PIGEON
              </Link>
            </Typography>
            <Link to="/message" className="navElement">
              Message
            </Link>
            <Link to="/connect" className="navElement">
              Se connecter
            </Link>
            <Link to="/help" className="navElement">
              Aide
            </Link>
            <Link to="/become-agent" className="navElement">
              Devenez agent!
            </Link>
            <Link to="/login" className="navElement">
              <AccountCircleIcon fontSize="large"/>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
      <RoutesNav />
    </Router>
  );
}

export default Nav;
