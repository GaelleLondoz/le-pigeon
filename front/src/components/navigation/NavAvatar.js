import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

///////////////// Icons /////////////////////////////////////

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

///////////////// css /////////////////////////////////////

import '../../assets/sass/nav_avatar.scss'




export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon className="avatarIcon" />
      </Button>
      <Menu
      class
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem  onClick={handleClose}>
          <Link to="/login">Se connecter</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/subscribe">S'inscrire</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/board">Mon tableau de bord</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/ask-travel">Mes demandes de voyage</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/destinations">Mes destinations</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/profile">Mon profil</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/add-travel">Ajouter un voyage</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/profile">Revenir au profil voyageur</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/">Se déconnecter</Link>
        </MenuItem>
      </Menu>
    </div>
  
  );
}
