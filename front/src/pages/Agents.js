import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import Header from "./homepage/Header";
import SearchAgentsContext from "../contexts/SearchAgentsContext";
import CardAgent from "../components/agent/CardAgent";
import { Container, Grid, Typography } from "@material-ui/core";
import Paginator from "../components/Pagination";
import { withRouter } from "react-router-dom";

let Agents = (props) => {
  const HeaderWithRouter = withRouter(Header);
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

  return (
    <>
      {/* {searchDisplay && ( */}
      <div>
        <HeaderWithRouter />
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
                <div style={{ minHeight: "400px" }}>
                  <Typography
                    variant="h4"
                    style={{ marginTop: "150px", fontWeight: "bold" }}
                  >
                    Aucun agent n'a été trouvé. 😞
                  </Typography>
                </div>
              )}
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
    </>
  );
};

const mapStateToSearchAgents = (state) => {
  return {
    agents: state.agents,
  };
};

Agents = connect(mapStateToSearchAgents)(Agents);
export default Agents;
