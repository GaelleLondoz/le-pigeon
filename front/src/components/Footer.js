import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "../assets/sass/footer.scss";

function Footer() {
  return (
    <div>
      <div className="Footer_container">
        <div className="Footer_info">
          <Router>
            <Link to="/help">FAQ</Link>
            <Link to="/conditions">Terms & Conditions</Link>
          </Router>
          <p>Copyright 2020 - LE PIGEON</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
