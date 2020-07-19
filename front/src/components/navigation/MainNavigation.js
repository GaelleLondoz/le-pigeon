import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
import AvatarDefault from "../../assets/images/avatar_default.png";

//NAVIGATION WITHOUT RESPONSIVE

const MainNavigation = ({ history }) => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
    isCallOnGoing,
  } = useContext(AuthContext);
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
      setCurrentUser({});
      history.replace("/");
    } catch (error) {
      throw error.response;
    }
  };
  console.log(currentUser);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
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
            {!currentUser.isAgent && (
              <MenuItem className={classes.menuItem}>
                {/* <Button color="secondary" variant="contained">
                  Devenez agent !
                </Button> */}
                <ButtonBecomeAgent
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                />
              </MenuItem>
            )}

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
                      currentUser.avatar
                        ? "http://localhost:5000/avatar/" + currentUser.avatar
                        : AvatarDefault
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
              {currentUser.isAgent && (
                <MenuItem
                  component={Link}
                  to={"/profile/agent/" + currentUser.id}
                  onClick={handleAvatarClose}
                >
                  Mon tableau de bord
                </MenuItem>
              )}
              {currentUser.isAgent && (
                <MenuItem
                  component={Link}
                  to={"/profile/agent/" + currentUser.id}
                  onClick={handleAvatarClose}
                >
                  Mes demandes de voyage
                </MenuItem>
              )}
              {currentUser.isAgent && (
                <MenuItem
                  component={Link}
                  to={"/profile/agent/" + currentUser.id}
                  onClick={handleAvatarClose}
                >
                  Mes destinations
                </MenuItem>
              )}
              {!currentUser.isAgent && (
                <MenuItem
                  component={Link}
                  to={"/profile/user/" + currentUser.id}
                  onClick={handleAvatarClose}
                >
                  Mon profil
                </MenuItem>
              )}
              {currentUser.isAgent && (
                <MenuItem
                  component={Link}
                  to={"/profile/agent/" + currentUser.id}
                  onClick={handleAvatarClose}
                >
                  Ajouter un voyage
                </MenuItem>
              )}
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </MenuList>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "transparent",
      opacity: ".8",
    },
  },
  appBar: {
    backgroundColor: "#009fb7",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "13px",
      paddingBottom: "13px",
    },
  },
}));

export default MainNavigation;
