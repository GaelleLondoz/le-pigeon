import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import AuthContext from "../../contexts/AuthContext";
import AuthAPI from "../services/authAPI";
import CollapseNav from "./CollapseNav";
import ItemsNav from "./ItemsNav";
import Logo from "../../assets/images/logo-pigeon.svg";

//NAVIGATION WITH RESPONSIVE

const MainNav = ({ history }) => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
  } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMobile, setAnchorElMobile] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleBurgerMenuClick = (event) => {
    setAnchorElMobile(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
    setAnchorElMobile(null);
  };
  const handleMenuBurgerClose = () => {
    setAnchorElMobile(null);
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <Button
            className={classes.menuButton}
            aria-controls="simple-menu-mobile"
            aria-haspopup="true"
            onClick={handleBurgerMenuClick}
          >
            <MenuIcon />
          </Button>
          <CollapseNav
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
            anchorEl={anchorEl}
            anchorElMobile={anchorElMobile}
            handleMenuBurgerClose={handleMenuBurgerClose}
            handleAvatarClick={handleAvatarClick}
            handleAvatarClose={handleAvatarClose}
            handleLogOut={handleLogOut}
          />
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              {/* Le Pigeon */}
              <img src={Logo} alt="Logo | Le Pigeon" className={classes.logo} />
            </Link>
          </Typography>
          <ItemsNav
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            handleAvatarClick={handleAvatarClick}
            anchorEl={anchorEl}
            handleAvatarClose={handleAvatarClose}
            handleLogOut={handleLogOut}
          />
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
    //fontSize: "1.6rem",
    //textTransform: "uppercase",
  },
  logo: {
    maxWidth: "2.5rem",
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
    /*width: "100vw",*/
    [theme.breakpoints.down("sm")]: {
      paddingTop: "13px",
      paddingBottom: "13px",
    },
  },
}));

export default MainNav;
