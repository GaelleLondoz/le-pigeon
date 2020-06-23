import React, { useState, useEffect } from "react";
import UserDestinationsAPI from "./../../components/services/userDestinationsAPI";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import userDestinationsAPI from "../../components/services/userDestinationsAPI";

const Header = () => {
  const [destinations, setDestinations] = useState([]);
  const initDestinations = async () => {
    let data = [];
    const destinations = await UserDestinationsAPI.getAllDestinationsByUsers();
    // const ratings = await reviewAPI.getRatings();
    const entries = destinations.entries();
    for (const [i, item] of entries) {
      // const result = data.find((row) => row.id === item.id);
      let row = {
        name: item.Destination.name,
      };
      data.push(row);
    }
    setDestinations(data);
  };


  useEffect(() => {
    initDestinations();
  }, []);

  return (
    <section id="header-homepage">
      <Container>
        <Typography variant="h1">Trouvez votre agent de voyage</Typography>
        <div className="form-search">
          <form className="" noValidate autoComplete="off">
            <Grid container justify="center" spacing={4}>
              <Grid item>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={destinations.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField {...params} id="outlined-basic" label="Quelle région du monde ?" margin="normal" variant="outlined" />
                  )}
                />

              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Quel type de voyage ?"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" size="large">
                  Rechercher
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Header;
