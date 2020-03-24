import React from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import { Tooltip } from "@material-ui/core/";

export default function MessageLink() {
  return (
    <Link to="/message" className="navElement">
      <Tooltip title="Messages" placement="bottom">
        <EmailIcon className="icon" />
      </Tooltip>
    </Link>
  );
}
