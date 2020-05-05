import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import UserDestionationsAPI from "../../../components/services/userDestinationsAPI";
import CardDestination from "../../../components/profileAgent/CardDestination";

const Travel = () => {
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async (id) => {
    try {
      const data = await UserDestionationsAPI.getAllDestinationsByUser(id);
      setDestinations(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDestinations(id);
  }, [id]);

  console.log(destinations);
  return (
    <>
      <Container>
        <h1>Liste de vos voyages</h1>
        <p>
          Vous avez effectué actuellement <strong>{destinations.length}</strong>{" "}
          voyage(s)
        </p>
        <Grid container>
          {destinations.map((destination) => (
            <Grid key={destination.id} item m={4}>
              <CardDestination destination={destination} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Travel;
