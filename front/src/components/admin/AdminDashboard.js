import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SecondaryListItems from "./SecondaryListItems";
import PrimaryListItems from "./PrimaryListItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Users from "./Users";
import Bookings from "./Bookings";
import Reviews from "./Reviews";
import Roles from "./Roles";
import Main from "./Main";
import Faqs from "./faq/Faqs";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    display: "none",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function AdminDashboard() {
  const [open, setOpen] = React.useState(true);
  const [isUSer, setUsers] = React.useState(false);
  const [isReview, setReviews] = React.useState(false);
  const [isBooking, setBookings] = React.useState(false);
  const [isPaiement, setPaiements] = React.useState(false);
  const [isRapport, setRapports] = React.useState(false);
  const [isRole, setRoles] = React.useState(false);
  const [isDashboard, setDashboard] = React.useState(true);
  const [isFaq, setFaqs] = React.useState(false);
  const [dashboardText, setdashboardText] = React.useState("Dashboard");

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = (data) => {
    switch (data.selection) {
      case "users":
        setUsers(true);
        setRoles(false);
        setBookings(false);
        setReviews(false);
        setPaiements(false);
        setRapports(false);
        setDashboard(false);
        setFaqs(false);
        setdashboardText("Users");
        break;
      case "roles":
        setRoles(true);
        setUsers(false);
        setBookings(false);
        setReviews(false);
        setPaiements(false);
        setRapports(false);
        setDashboard(false);
        setFaqs(false);
        setdashboardText("Roles");
        break;
      case "bookings":
        setBookings(true);
        setUsers(false);
        setRoles(false);
        setReviews(false);
        setPaiements(false);
        setRapports(false);
        setDashboard(false);
        setFaqs(false);
        setdashboardText("Bookings");
        break;
      case "reviews":
        setReviews(true);
        setUsers(false);
        setRoles(false);
        setBookings(false);
        setPaiements(false);
        setRapports(false);
        setDashboard(false);
        setFaqs(false);
        setdashboardText("Reviews");
        break;
      case "payments":
        setPaiements(true);
        setUsers(false);
        setRoles(false);
        setBookings(false);
        setReviews(false);
        setRapports(false);
        setDashboard(false);
        setFaqs(false);
        setdashboardText("Payments");
        break;
      case "faqs":
        setFaqs(true);
        setDashboard(false);
        setUsers(false);
        setRoles(false);
        setBookings(false);
        setReviews(false);
        setPaiements(false);
        setRapports(false);
        setdashboardText("Faqs");
        break;
      case "dashboard":
        setDashboard(true);
        setUsers(false);
        setRoles(false);
        setBookings(false);
        setReviews(false);
        setPaiements(false);
        setRapports(false);
        setFaqs(false);
        setdashboardText("Dashboard");
    }
  };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {dashboardText}
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <PrimaryListItems handleClick={handleClick} />
        </List>
        <Divider />
        <List>
          <SecondaryListItems handleClick={handleClick} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {isBooking && <Bookings />}
            {isUSer && <Users />}
            {isRole && <Roles />}
            {isPaiement && <div></div>}
            {isReview && <Reviews />}
            {isFaq && <Faqs />}
            {isDashboard && <Main />}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
