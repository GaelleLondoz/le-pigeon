import React from "react";
import { Container, Grid, Typography, Avatar, Link } from "@material-ui/core";
import CardAgent from "../../components/agent/CardAgent";

const AgentAvatar = () => {
  return (
    <section id="agent-avatar">
      <Container>
        <Typography variant="h2">Des agents à l'écoute</Typography>
        <Grid container spacing={7} justify="center">
          <Grid item xs={12} md={3}>
            {/* <div className="container-avatar">
              <Link href="#">
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/men/36.jpg"
                />
              </Link>
              <Typography paragraph={true}>Pierre</Typography>
              <Typography variant="h6">Australie</Typography>
            </div> */}
            <CardAgent />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <div className="container-avatar">
              <Link href="#">
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                />
              </Link>
              <Typography paragraph={true}>Justine</Typography>
              <Typography variant="h6">Usa</Typography>
            </div> */}
            <CardAgent />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <div className="container-avatar">
              <Link href="#">
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                />
              </Link>
              <Typography paragraph={true}>Paul</Typography>
              <Typography variant="h6">Thaïlande</Typography>
            </div> */}
            <CardAgent />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <div className="container-avatar">
              <Link href="#">
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/women/67.jpg"
                />
              </Link>
              <Typography paragraph={true}>Marie</Typography>
              <Typography variant="h6">Brézil</Typography>
            </div> */}
            <CardAgent />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default AgentAvatar;
