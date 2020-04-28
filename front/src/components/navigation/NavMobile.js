
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <RootRef rootRef={domRef}>
      <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="se connecter" color="inherit">
          <PowerIcon />
        </IconButton>
        <p>Se connecter</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="aide" color="inherit">
          <HelpIcon />
        </IconButton>
        <p>Aide</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="devenir agent" color="inherit">
          <AgentIcon />
        </IconButton>
        <p>Devenir Agent</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
    </RootRef>
  );

  const { isAuthenticated } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });

  export default renderMobileMenu;
