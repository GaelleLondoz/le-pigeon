import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "../assets/sass/footer.scss";

function Footer() {
  return (
    <div>
      <div className="Footer_container">
        <div className="Footer_info">
        <Router>
        <Link to="/contact" >
                Contact
        </Link>
        <Link to="/faq" >
                FAQ
        </Link>
        <Link to="/conditions" >
                Terms & Conditions
        </Link>
        </Router>
        </div>
      </div>
    </div>
  );
}

export default Footer;
