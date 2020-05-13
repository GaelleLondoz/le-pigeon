import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";

// sass
import "../../assets/sass/_nav_private.scss";

// component



class OnMatchedUrl extends Component {
  constructor(props) {
    super(props);
  }//

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
  const test666 = console.log("grey grey grey")
  const test777 = console.log("grey2 grey2 grey2")
  return (
    <BrowserRouter>
      <div>
        <nav>
              <Link to="/profil">Profil</Link>
              <Link to="/message" >MessagesSSSSS</Link>
              <Link to="/agenda" >Agenda</Link>
              <Link to="/evaluation">Evaluations</Link>
              <Link to="/travel">Voyages</Link>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default NavPrivate;
