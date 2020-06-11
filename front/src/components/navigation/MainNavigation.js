import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  MenuList,
  MenuItem,
  Menu,
  Avatar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import AuthContext from "../../contexts/AuthContext";
import AuthAPI from "../services/authAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: "1.6rem",
    textTransform: "uppercase",
  },
  titleLink: {
    textDecoration: "none",
    color: "#fff",
  },
  menuList: {
    display: "flex",
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "transparent",
      opacity: ".8",
    },
  },
  appBar: {
    backgroundColor: "#009fb7",
  },
}));

const MainNavigation = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated, currentUser } = useContext(
    AuthContext
  );
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    try {
      await AuthAPI.logout();
      setIsAuthenticated(false);
      history.replace("/");
    } catch (error) {
      throw error.response;
    }
  };
  //console.log(currentUser);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Le Pigeon
            </Link>
          </Typography>
          <MenuList className={classes.menuList}>
            {!isAuthenticated && (
              <MenuItem
                component={Link}
                to="/login"
                className={classes.menuItem}
              >
                Se connecter
              </MenuItem>
            )}
            {isAuthenticated && (
              <MenuItem
                component={Link}
                to={"/profile/agent/" + currentUser.id}
                className={classes.menuItem}
              >
                Message
              </MenuItem>
            )}
            <MenuItem component={Link} to="/help" className={classes.menuItem}>
              Aide
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <Button color="secondary" variant="contained">
                Devenez agent !
              </Button>
            </MenuItem>
            {isAuthenticated && (
              <MenuItem className={classes.menuItem}>
                <Button
                  className={classes.menuItem}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleAvatarClick}
                >
                  <Avatar
                    alt={"Le Pigeon | Avatar de " + currentUser.firstName}
                    src={
                      currentUser.avatar !== undefined
                        ? "http://localhost:5000/avatar/" + currentUser.avatar
                        : null
                    }
                  />
                </Button>
              </MenuItem>
            )}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAvatarClose}
            >
              <MenuItem
                component={Link}
                to={"/profile/agent/" + currentUser.id}
                onClick={handleAvatarClose}
              >
                Mon tableau de bord
              </MenuItem>
              <MenuItem
                component={Link}
                to={"/profile/agent/" + currentUser.id}
                onClick={handleAvatarClose}
              >
                Mes demandes de voyage
              </MenuItem>
              <MenuItem
                component={Link}
                to={"/profile/agent/" + currentUser.id}
                onClick={handleAvatarClose}
              >
                Mes destinations
              </MenuItem>
              <MenuItem
                component={Link}
                to="/tralala"
                onClick={handleAvatarClose}
              >
                Mon profil
              </MenuItem>
              <MenuItem
                component={Link}
                to={"/profile/agent/" + currentUser.id}
                onClick={handleAvatarClose}
              >
                Ajouter un voyage
              </MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </MenuList>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNavigation;
