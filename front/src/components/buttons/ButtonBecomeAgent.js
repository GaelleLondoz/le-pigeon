import React from "react";
import { Link } from "react-router-dom";

const ButtonBecomeAgent = ({ isAuthenticated, currentUser }) => {
  return (
    <Link
      to={
        isAuthenticated && !currentUser.isAgent
          ? "/profile/user/" + currentUser.id + "/account?become-agent=true"
          : "/login"
      }
      color="secondary"
      variant="contained"
      style={{
        textDecoration: "none",
        color: "#fff",
        backgroundColor: "#f50057",
        padding: "8px 15px",
        borderRadius: "50px",
      }}
    >
      Devenez agent !
    </Link>
  );
};

export default ButtonBecomeAgent;
