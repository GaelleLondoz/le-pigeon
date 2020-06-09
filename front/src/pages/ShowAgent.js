import React from "react";
import {
  Container,
  Box,
  Grid,
  Avatar,
  Typography,
  Button,
  Chip,
  Paper,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const ShowAgent = () => {
  return (
    <section id="public-agent-profile">
      <Container>
        <Box className="agent-information" component="div">
          <Grid container spacing={5} justify="center">
            <Grid item xs={12} md={4}>
              <Box component="div" className="container-avatar">
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/men/36.jpg"
                />
                <Rating name="read-only" value={4} readOnly />
                <Typography paragraph={true}>27 commentaires</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} className="container-text">
              <Typography component="p">
                Je m'appelle Pierre, Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Ullam illum laboriosam numquam nesciunt error,
                voluptas cum atque provident veritatis vitae.
              </Typography>
              <Box component="div" className="price">
                <Typography component="p">15 € / heure</Typography>
                <Button size="medium" variant="contained" color="secondary">
                  Réserver un rendez-vous
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="destinations" component="div">
          <Typography variant="h2">Mes destinations</Typography>
          <div className="destinations-label">
            <Chip label="Laos" color="secondary" />
            <Chip label="Vietnam" color="secondary" />
            <Chip label="Australie" color="secondary" />
            <Chip label="Europe" color="secondary" />
          </div>
        </Box>
        <Box component="div" className="container-card-comment">
          <Typography variant="h3">
            Ce que les voyageurs disent de Pierre
          </Typography>
          <Grid container spacing={7}>
            <Grid item xs={12} md={6} className="card-comment">
              <Paper xs={12} md={6}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/men/36.jpg"
                />
                <Typography paragraph={true}>
                  Pierre est un vrai globe-trotteur....
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} className="card-comment">
              <Paper xs={12} md={6}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/men/36.jpg"
                />
                <Typography paragraph={true}>
                  Il m’a aidé à organiser mon voyage en Asie du Suf et...
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default ShowAgent;
