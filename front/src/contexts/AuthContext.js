import React from "react";

export default React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {},
  currentUser: {},
  setCurrentUser: (value) => {},
  isAdmin: false,
  setIsAdmin: (value) => {},
  isCallOnGoing: false,
  setIsCallOnGoing: (value) => {},
});
