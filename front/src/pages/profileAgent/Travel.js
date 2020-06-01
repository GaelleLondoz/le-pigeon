import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Select,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserDestinationsAPI from "../../components/services/userDestinationsAPI";
import CardDestination from "../../components/agent/CardDestination";
import LoaderButton from "../../components/loaders/LoaderButton";
import Places from "../../components/Places";

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
  // loaderButton: {
  //   color: "#fff",
  // },
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

  const [sendDestinationLoading, setSendDestinationLoading] = useState(false);

  const handleDestinationFormClick = () => {
    setOpenForm(!openForm);
  };

  const handleNewDestinationChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setNewDestination({ ...newDestination, [name]: value });
  };

  const createImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewDestination({ ...newDestination, coverImage: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const files = event.target.files || event.dataTransfer.files;
    createImage(files[0]);
  };

  const handleNewDestinationSubmit = async (e) => {
    e.preventDefault();
    setSendDestinationLoading(true);
    try {
      await UserDestinationsAPI.create(newDestination);
      setSendDestinationLoading(false);
      fetchDestinations(id);
    } catch (error) {
      setSendDestinationLoading(false);
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
              {/* <Grid item xs={12} className={classes.gridInput}>
                <Places country="country" />
              </Grid> */}
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
                  //value={newDestination.coverImage}
                  onChange={handleFileChange}
                  name="coverImage"
                  fullWidth
                  type="file"
                  variant="outlined"
                  //label="Image de couverture"
                />
              </Grid>
              <Grid item className={classes.gridInput}>
                <Button
                  type="button"
                  onClick={handleDestinationFormClick}
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "10px" }}
                >
                  Annuler
                </Button>
                {/* <Button type="submit" variant="contained" color="primary">
                  {sendDestinationLoading ? (
                    <CircularProgress color={classes.loaderButton} size={25} />
                  ) : (
                    "Créer"
                  )}
                </Button> */}
                <LoaderButton
                  colorButton="primary"
                  loadingButton={sendDestinationLoading}
                  size={25}
                  text="Créer"
                />
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
