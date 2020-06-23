import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";
import userAPI from "../services/userAPI";
const AdminRoutes = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isAdmin } = useContext(AuthContext);

  return isAuthenticated && isAdmin ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AdminRoutes;
