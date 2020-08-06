import React from "react";

export default React.createContext({
  searchAgents: [],
  setSearchAgents: (value) => {},
  searchDisplay: false,
  setSearchDisplay: (value) => {},
});
