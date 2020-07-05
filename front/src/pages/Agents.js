import React, { useState, useEffect, useContext } from "react";
import Header from "./homepage/Header";
import SearchAgentsContext from "../contexts/SearchAgentsContext";

const Agents = (props) => {
  //const { searchAgents, searchDisplay } = useContext(SearchAgentsContext);
  const [searchDisplay, setSearchDisplay] = useState(
    props.location.state.searchDisplay
  );

  //console.log({ search: searchAgents });
  console.log({ display: searchDisplay });
  console.log({ state: props.location.state });
  return (
    <>
      {searchDisplay && (
        <div>
          <Header />
        </div>
      )}
    </>
  );
};

export default Agents;
