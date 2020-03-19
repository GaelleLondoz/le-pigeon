import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import RoutesNav from './RoutesNav';

function Nav() {
  return (
    <Router>
    <nav className="container">
      <ul>
        <li>
          <Link to="/">LE PIGEON</Link>
        </li>
        <li>
          <Link to="/connect">Se connecter</Link>
        </li>
        <li>
          <Link to="/help">Aide</Link>
        </li>
        <li>
          <Link to="/become-agent">Devenez agent!</Link>
        </li>
      </ul>
    </nav>
    <RoutesNav />
    </Router>
  );
}

export default Nav


