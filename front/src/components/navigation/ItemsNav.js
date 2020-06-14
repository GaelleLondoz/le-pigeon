import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MenuList, MenuItem, Button, Avatar, Menu } from "@material-ui/core";

const ItemsNav = ({
  isAuthenticated,
  currentUser,
  handleAvatarClick,
  anchorEl,
  handleAvatarClose,
  handleLogOut,
}) => {
  const classes = useStyles();
  return (
    <MenuList className={classes.menuList}>
      {!isAuthenticated && (
        <MenuItem component={Link} to="/login" className={classes.menuItem}>
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
          <Button color="secondary" variant="contained">
            Devenez agent !
          </Button>
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
            to={"/profile/user/" + currentUser.id + "/account"}
            onClick={handleAvatarClose}
          >
            Mon profil
          </MenuItem>
        )}
        {!currentUser.isAgent && (
          <MenuItem
            component={Link}
            to={"/profile/user/" + currentUser.id + "/message"}
            onClick={handleAvatarClose}
          >
            Mes messages
          </MenuItem>
        )}
        {!currentUser.isAgent && (
          <MenuItem
            component={Link}
            to={"/profile/user/" + currentUser.id + "/booking"}
            onClick={handleAvatarClose}
          >
            Mes réservations
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

export default ItemsNav;
