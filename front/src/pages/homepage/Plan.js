import React from "react";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EventNoteIcon from "@material-ui/icons/EventNote";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";

const Plan = () => {
  return (
    <section id="plan-homepage">
      <Container>
        <Typography variant="h2">
          Organisez votre voyage en toute confiance
        </Typography>

        <List search-homepageName="progressBar">
          <ListItem>Trouvez</ListItem>
          <ListItem>Planifiez</ListItem>
          <ListItem>Partez</ListItem>
        </List>

        <Grid container justify="center" spacing={10}>
          <Grid item xs={12} md={4}>
            <Card search-homepageName="">
              <CardContent>
                <Box component="div" search-homepageName="icon-container">
                  <SearchIcon />
                </Box>
                <Typography paragraph={true}>
                  Identifiez l’agent de voyage qui vous inspire le plus et
                  réservez un premier rdv
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card search-homepageName="">
              <CardContent>
                <Box component="div" search-homepageName="icon-container">
                  <EventNoteIcon />
                </Box>
                <Typography paragraph={true}>
                  Préparez votre voyage avec votre agent qui se fera un plaisir
                  de vous accompagner
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card search-homepageName="">
              <CardContent>
                <Box component="div" search-homepageName="icon-container">
                  <FlightTakeoffIcon />
                </Box>
                <Typography paragraph={true}>
                  Partez l’esprit libre et profitez de votre voyage grâce à nos
                  nombreux conseils!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Plan;
