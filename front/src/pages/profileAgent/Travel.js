import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Select,
  TextField,
} from "@material-ui/core";
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
  gridInput: {
    marginBottom: "20px",
  },
}));

const Travel = () => {
  const classes = useStyles();
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    continent: "",
    country: "",
    name: "",
    coverImage: "",
    remarks: "",
  });
  const [continents, setContinents] = useState([]);

  const [openForm, setOpenForm] = useState(false);

  const handleDestinationFormClick = () => {
    setOpenForm(!openForm);
  };

  const handleNewDestinationChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setNewDestination({ ...newDestination, [name]: value });
  };

  const handleNewDestinationSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserDestinationsAPI.create(newDestination);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDestinations = async (id) => {
    try {
      const data = await UserDestinationsAPI.getAllDestinationsByUser(id);
      setDestinations(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchContinents = async () => {
    try {
      const data = await UserDestinationsAPI.getAllContinents();
      setContinents(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDestinations(id);
  }, [id]);
  useEffect(() => {
    fetchContinents();
  }, []);

  //console.log(destinations);
  //console.log(newDestination);
  //console.log(continents);

  return (
    <section className="profile-agent-destinations">
      <Container>
        <Typography variant="h5">Liste de vos voyages</Typography>
        <p>
          Vous avez effectué actuellement <strong>{destinations.length}</strong>{" "}
          voyage(s)
        </p>
        <Button
          size="large"
          className={classes.buttonAddDestination}
          onClick={handleDestinationFormClick}
        >
          Nouvelle destination
        </Button>
        {openForm && (
          <form
            className=""
            autoComplete="off"
            onSubmit={handleNewDestinationSubmit}
          >
            <Grid container>
              <Grid item xs={12} className={classes.gridInput}>
                <Select
                  native
                  name="continent"
                  value={newDestination.continent}
                  onChange={handleNewDestinationChange}
                  fullWidth
                  variant="outlined"
                >
                  {continents.map((continent) => (
                    <option value={continent.name} key={continent.id}>
                      {continent.name}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  value={newDestination.country}
                  onChange={handleNewDestinationChange}
                  name="country"
                  fullWidth
                  variant="outlined"
                  label="Pays"
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  value={newDestination.name}
                  onChange={handleNewDestinationChange}
                  name="name"
                  variant="outlined"
                  fullWidth
                  label="Titre"
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  value={newDestination.remarks}
                  onChange={handleNewDestinationChange}
                  name="remarks"
                  fullWidth
                  variant="outlined"
                  label="Remarque"
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  value={newDestination.coverImage}
                  onChange={handleNewDestinationChange}
                  name="coverImage"
                  fullWidth
                  variant="outlined"
                  label="Image de couverture"
                />
              </Grid>
              <Grid item className={classes.gridInput}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  Créer
                </Button>
                <Button
                  type="button"
                  onClick={handleDestinationFormClick}
                  variant="contained"
                  color="secondary"
                >
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
        <Grid container>
          {destinations.map((destination) => (
            <Grid item key={destination.id} m={4} xs={12} md={4}>
              <CardDestination destination={destination} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Travel;
