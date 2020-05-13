import React from "react";
import { BrowserRouter, Link, useLocation } from "react-router-dom";
// sass
import "../../assets/sass/_nav_private.scss";

// component



// class OnMatchedUrl extends Component {
//   constructor(props) {
//     super(props);
//   }//

//   componentDidMount(props) {
//     this.AddClass(props)
//   }

//   AddClass(props) {
//     console.log('preclass')
//     if(window.location.pathname == this.props.pathname) {
//       console.log('class')
//       $(this.props.className).addClass("MatchedUrl")
//     } else {
//       $(this.props.className).removeClass("MatchedUrl")
//     }
//   }

// }
// function MatchUrl() {
//   if (location.pathname === this.pathname) {
//     className="MatchedUrl"
//   } else {
//     className=""

//   }
// }


function NavPrivate(props) {
  const location = useLocation()
  return (
    <BrowserRouter>
      <div>
        <nav>
              <Link to="/profil">Profil</Link>
              <Link to="/message"  className={location.pathname === "/message" ? "MatchedUrl" : ""} >Messages</Link>
              <Link to="/agenda" >Agenda</Link>
              <Link to="/evaluation">Evaluations</Link>
              <Link to="/travel">Voyages</Link>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default NavPrivate;
