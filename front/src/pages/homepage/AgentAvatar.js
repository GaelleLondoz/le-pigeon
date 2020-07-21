import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Avatar, Link } from "@material-ui/core";
import CardAgent from "../../components/agent/CardAgent";
import UserAPI from "../../components/services/userAPI";

const AgentAvatar = () => {
  const [bestAgents, setBestAgents] = useState([]);

  const fetchBestAgents = async () => {
    try {
      const data = await UserAPI.getBestAgents();
      setBestAgents(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchBestAgents();
  }, []);

  return (
    <section id="agent-avatar">
      <Container>
        <Typography variant="h2">Des agents à l'écoute</Typography>
        <Grid container spacing={7} justify="center">
          {bestAgents.map((agent) => {
            return (
              <Grid key={agent.id} item xs={12} md={3}>
                <CardAgent agent={agent} avgRatings={agent.avgRatings} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </section>
  );
};

export default AgentAvatar;
