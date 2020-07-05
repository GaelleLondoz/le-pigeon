import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import Header from "./homepage/Header";
import SearchAgentsContext from "../contexts/SearchAgentsContext";
import CardAgent from "../components/agent/CardAgent";
import { Container, Grid, Typography, Avatar, Link } from "@material-ui/core";

let Agents = (props) => {
  //const { searchAgents, searchDisplay } = useContext(SearchAgentsContext);
  // const [searchDisplay, setSearchDisplay] = useState(
  //   props.location.state.searchDisplay
  // );
  console.log({ agents: props.agents })
  //console.log({ search: searchAgents });
  // console.log({ display: searchDisplay });
  // console.log({ state: props.location.state });
  return (
    <>
      {/* {searchDisplay && ( */}
      <div>
        <Header />
        <section id="agents">
          <Grid container spacing={7} justify="center">
            {props.agents.map(agent => {
              return (
                <Grid key={agent.id} item xs={12} md={3}>
                  <CardAgent agent={agent} avgRatings={agent.avgRatings} key={agent.id} />
                </Grid>
              )
            })}
          </Grid>
        </section>
      </div>
      {/* )} */}
    </>
  );
};

const mapStateToSearchAgents = (state) => {
  return {
    agents: state.agents,
  };
};

// const mapDispatchToSearchAgents = (dispatch) => {
//   return {
//     // login: () => {
//     //   //Dispatch => role: call a action of type ...(SET_AUTH)
//     //   // dispatch({ type: "SET_AUTH" });
//     // },
//     search: () => {
//       //Dispatch => role: call a action of type ...(SET_AUTH)
//       dispatch({ type: "SET_SEARCH_AGENTS" });
//     },
//   };
// };

// Agents = connect(mapStateToSearchAgents, mapDispatchToSearchAgents)(Agents);
Agents = connect(mapStateToSearchAgents)(Agents);
export default Agents;
