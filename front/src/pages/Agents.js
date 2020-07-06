import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import Header from "./homepage/Header";
import SearchAgentsContext from "../contexts/SearchAgentsContext";
import CardAgent from "../components/agent/CardAgent";
import { Container, Grid, Typography } from "@material-ui/core";
import Paginator from "../components/Pagination";

let Agents = (props) => {
  const ITEMSBYPAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePaginationChange = (e, page) => {
    setCurrentPage(page);
    //window.scrollTo(0, 0);
  };
  const paginatedSearchAgents = Paginator.getData(
    props.agents,
    currentPage,
    ITEMSBYPAGE
  );
  //const { searchAgents, searchDisplay } = useContext(SearchAgentsContext);
  // const [searchDisplay, setSearchDisplay] = useState(
  //   props.location.state.searchDisplay
  // );
  console.log({ agents: props.agents });
  //console.log({ search: searchAgents });
  // console.log({ display: searchDisplay });
  // console.log({ state: props.location.state });
  return (
    <>
      {/* {searchDisplay && ( */}
      <div>
        <Header />
        <section id="agents">
          <Container>
            {props.agents.length > 0 && (
              <Typography
                variant="h5"
                style={{
                  marginTop: "50px",
                  fontWeight: "bold",
                  marginBottom: "50px",
                }}
              >
                {props.agents.length} agents prêts à vous aider. 🙂
              </Typography>
            )}
            <Grid container spacing={7}>
              {props.agents.length ? (
                paginatedSearchAgents.map((agent) => {
                  return (
                    <Grid key={agent.id} item xs={12} md={4}>
                      <CardAgent
                        agent={agent}
                        avgRatings={agent.avgRatings}
                        key={agent.id}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Typography
                  variant="h5"
                  style={{ marginTop: "50px", fontWeight: "bold" }}
                >
                  Aucun agent n'a été trouvé. 😞
                </Typography>
              )}
              {/* {props.agents.map((agent) => {
              return (
                <Grid key={agent.id} item xs={12} md={3}>
                  <CardAgent
                    agent={agent}
                    avgRatings={agent.avgRatings}
                    key={agent.id}
                  />
                </Grid>
              );
            })} */}
            </Grid>
            {props.agents.length > 12 && (
              <div style={{ marginTop: "30px" }}>
                <Paginator
                  currentPage={currentPage}
                  itemsByPage={ITEMSBYPAGE}
                  length={props.agents.length}
                  onPageChanged={handlePaginationChange}
                />
              </div>
            )}
          </Container>
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
