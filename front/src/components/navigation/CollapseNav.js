import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuList, MenuItem, Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarDefault from "../../assets/images/avatar_default.png";
import ButtonBecomeAgent from "../buttons/ButtonBecomeAgent";

const CollapseNav = ({
  anchorEl,
  anchorElMobile,
  handleMenuBurgerClose,
  currentUser,
  isAuthenticated,
  handleAvatarClick,
  handleAvatarClose,
  handleLogOut,
}) => {
  const classes = useStyles();
  return (
    <Menu
      id="simple-menu-mobile"
      anchorEl={anchorElMobile}
      keepMounted
      open={Boolean(anchorElMobile)}
      onClose={handleMenuBurgerClose}
    >
      <MenuList>
        {!isAuthenticated && (
          <MenuItem
            component={Link}
            to="/login"
            className={classes.menuItem}
            onClick={handleMenuBurgerClose}
          >
            Se connecter
          </MenuItem>
        )}
        {isAuthenticated && (
          <MenuItem
            component={Link}
            to={"/profile/agent/" + currentUser.id}
            className={classes.menuItem}
            onClick={handleMenuBurgerClose}
          >
            Vos Messages
          </MenuItem>
        )}
        <MenuItem
          component={Link}
          to="/help"
          className={classes.menuItem}
          onClick={handleMenuBurgerClose}
        >
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
    </Menu>
  );
};

const useStyles = makeStyles((theme) => ({
  menuItem: {
    "&:hover": {
      backgroundColor: "transparent",
      opacity: ".8",
    },
  },
}));

export default CollapseNav;
