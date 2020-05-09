import React, { Component } from "react";
import { BrowserRouter, Link, useParams } from "react-router-dom";

// jquery
import $ from "jquery"

// sass
import "../../assets/sass/_nav_private.scss";
import { checkPropTypes } from "prop-types";

// component
import BecomeAgent from "../../pages/BecomeAgent"

//  let url = useParams();

// class OnMatchedUrl extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       handleClass: false
//     }
//     this.handleClass = this.handleClass.bind(this)
//   }

//   handleClass() {
//     if(url == {pathname}) {
//       this.setState({ handleClass: true})
//     }
    
//   }
// }


// function OnMatchedUrl() {
//   if(path == {this.location.pathname}) {
//      var MatchedUrl = isActive ? 'active' : '';
//   }
// }



// function OnMatchedUrl() {
//   let { url } = useParams();
//   if(to= url) {
//     let element = document.getElementById("test");
//     element.classList.add("MatchedUrl");
//   }
// }
// OnMatchedUrl()



class OnMatchedUrl extends Component {
  constructor(props) {
    super(props);

    // this.AddClass = this.AddClass.bind(this)
  }

  componentDidMount(props) {
    this.AddClass(props)
  }

  AddClass(props) {
    console.log('preclass')
    if(window.location.pathname == this.props.pathname) {
      console.log('class')
      $(this.props.className).addClass("MatchedUrl")
    } else {
      $(this.props.className).removeClass("MatchedUrl")
    }
  }

}


function NavPrivate(props) {
  // let url = useParams();
  console.log('avant props')
   console.log(props)
  // console.log(JSON.stringify({url}))
  //console.log(window.location.pathname) //ok!!
  const test666 = console.log("grey grey grey")
  const test777 = console.log("grey2 grey2 grey2")
  return (
    <BrowserRouter>
      <div>
        <nav>
              <Link to="/profil">Profil</Link>
              {/* <Link to="/message" className={className}>Messages</Link> */}
              {/* onload ???????? */}
              <Link to="/message" onClick={test666}>MessagesSSSSS</Link>
              <Link to="/agenda" onClick={test777}>Agenda</Link>
              <Link to="/evaluation">Evaluations</Link>
              <Link to="/travel">Voyages</Link>
        </nav>
      </div>
    </BrowserRouter>
  );
}























// import React, { useRef, useState, useEffect, useContext } from "react";
// import RootRef from "@material-ui/core/RootRef";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import authAPI from "../services/authAPI";

// // Material-ui
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
// import AuthContext from "../../contexts/AuthContext";

// // icons
// import MailIcon from "@material-ui/icons/Mail";
// import MoreIcon from "@material-ui/icons/MoreVert";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import Agenda from '@material-ui/icons/DateRange';
// import Evaluations from '@material-ui/icons/Grade';
// import Voyages from '@material-ui/icons/LocalAirport';

// // sass
// import "../../assets/sass/_nav_private.scss";
// import userAPI from "../services/userAPI";

// const useStyles = makeStyles(theme => ({
//   grow: {
//     flexGrow: 1
//   },
//   title: {
//     display: "block",
//     [theme.breakpoints.up("sm")]: {
//       display: "block"
//     }
//   },

//   sectionDesktop: {
//     display: "none",
//     alignItems: "center",
//     [theme.breakpoints.up("md")]: {
//       display: "flex"
//     }
//   },
//   sectionMobile: {
//     display: "flex",
//     [theme.breakpoints.up("md")]: {
//       display: "none"
//     }
//   },
//   orange: {
//     color: "white",
//     backgroundColor: "orange"
//   }
// }));

// let NavPrivate = ({ history }) => {
//   const domRef = useRef();

//   useEffect(() => {
//     fetchUser();
//     console.log(domRef.current); // DOM node
//   }, []);
//   // const observed = useRef(null);

//   // useEffect(() => {
//   //   fetchUser();
//   //   console.log(observed.current);
//   // }, [observed]);

//   // useEffect(() => {

//   // }, []);
//   const classes = useStyles();
//   // const handleLogin = () => {
//   //   props.login();
//   // };
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = event => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = event => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const handleLogOut = async () => {
//     try {
//       await authAPI.logout();
//       history.replace("/login");
//     } catch (error) {
//       throw error.response;
//     }
//   };

//   // menu mobile //////

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <RootRef rootRef={domRef}>
//       <Menu
//         anchorEl={mobileMoreAnchorEl}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         id={mobileMenuId}
//         keepMounted
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         open={isMobileMenuOpen}
//         onClose={handleMobileMenuClose}
//       >
//         <MenuItem onClick={handleProfileMenuOpen}>
//           <IconButton
//             aria-label="account of current user"
//             aria-controls="primary-search-account-menu"
//             aria-haspopup="true"
//             color="inherit"
//           >
//             <AccountCircle />
//           </IconButton>
//           <p>Profil</p>
//         </MenuItem>
//         <MenuItem>
//           <IconButton aria-label="show 4 new mails" color="inherit">
//             <Badge badgeContent={4} color="secondary">
//               <MailIcon />
//             </Badge>
//           </IconButton>
//           <p>Messages</p>
//         </MenuItem>
//         <MenuItem>
//           <IconButton aria-label="agenda" color="inherit">
//             <Agenda />
//           </IconButton>
//           <p>Agenda</p>
//         </MenuItem>
//         <MenuItem>
//           <IconButton aria-label="aide" color="inherit">
//             <Evaluations />
//           </IconButton>
//           <p>Evaluations</p>
//         </MenuItem>
//         <MenuItem>
//           <IconButton aria-label="devenir agent" color="inherit">
//             <Voyages />
//           </IconButton>
//           <p>Voyages</p>
//         </MenuItem>
//       </Menu>
//     </RootRef>
//   );

//   const { isAuthenticated } = useContext(AuthContext);

//   const [currentUser, setCurrentUser] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     avatar: ""
//   });

//   const fetchUser = async () => {
//     try {
//       const { user } = await userAPI.getUser();
//       setCurrentUser(user);
//     } catch (error) {
//       throw error.response;
//     }
//   };

//   // menu principal //////

//   return (
//     <div className={classes.grow}>
//       <AppBar position="static">
//         <Toolbar>
//           <div className={classes.grow} />
//           <div className={classes.sectionDesktop}>
//                 <Link to="/login">Profil</Link>
//                 <Badge badgeContent={4} color="secondary">
//                     <Link to="/message">Messages</Link>
//                 </Badge>
//                 <Link to="/agenda">Agenda</Link>
//                 <Link to="/evaluations">Evaluations</Link>
//                 <Link to="/voyages">Voyage</Link>
//           </div>
//           <div className={classes.sectionMobile}>
//             <IconButton
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//     </div>
//   );
// };

// const mapStateToAuth = state => {
//   return {
//     auth: state.auth
//   };
// };

// const mapDispatchToAuth = dispatch => {
//   return {
//     login: () => {
//       //Dispatch => role: call a action of type ...(SET_AUTH)
//       dispatch({ type: "SET_AUTH" });
//     }
//   };
// };

// NavPrivate = connect(
//   mapStateToAuth,
//   mapDispatchToAuth
// )(NavPrivate);
export default NavPrivate;
