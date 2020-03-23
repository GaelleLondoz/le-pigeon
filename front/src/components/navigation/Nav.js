import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import RoutesNav from "./RoutesNav";
/////////////////////////////////////////////
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
              LE PIGEON
            </Typography>

          </Toolbar>
        </AppBar>
      </div>
      <RoutesNav />
    </Router>
  );
}

export default Nav;
