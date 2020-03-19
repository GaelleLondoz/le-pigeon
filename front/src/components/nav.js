import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
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
  );
}

export default Nav


