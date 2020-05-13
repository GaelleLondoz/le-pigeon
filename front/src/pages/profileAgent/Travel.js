import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserDestinationsAPI from "../../components/services/userDestinationsAPI";
import CardDestination from "../../components/agent/CardDestination";

const useStyles = makeStyles((theme) => ({
  buttonAddDestination: {
    backgroundColor: "green",
    color: "#fff",
    "&:hover": {
      backgroundColor: "green",
      opacity: 0.8,
    },
  },
}));

const Travel = () => {
  const classes = useStyles();
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async (id) => {
    try {
      const data = await UserDestinationsAPI.getAllDestinationsByUser(id);
      setDestinations(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDestinations(id);
  }, [id]);

  //console.log(destinations);

  return (
    <section className="profile-agent-destinations">
      <Container>
        <Typography variant="h5">Liste de vos voyages</Typography>
        <p>
          Vous avez effectué actuellement <strong>{destinations.length}</strong>{" "}
          voyage(s)
        </p>
        <Button size="large" className={classes.buttonAddDestination}>
          Nouvelle destination
        </Button>
        <Grid container>
          {destinations.map((destination) => (
            <Grid key={destination.id} item m={4} xs={12} md={4}>
              <CardDestination destination={destination} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Travel;
