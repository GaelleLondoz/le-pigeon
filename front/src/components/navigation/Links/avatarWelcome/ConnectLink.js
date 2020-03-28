import React from "react";
import { Link } from "react-router-dom";

export default function MessageLink() {
  return (
    <Link to="/connect" className="navElement">
      Se connecter
    </Link>
  );
}
