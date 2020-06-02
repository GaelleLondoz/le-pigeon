import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Select,
  TextField,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserDestinationsAPI from "../../components/services/userDestinationsAPI";
import CardDestination from "../../components/agent/CardDestination";
import LoaderButton from "../../components/loaders/LoaderButton";
import Places from "../../components/algolia/Places";
import Paginator from "../../components/Pagination";

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
  const ITEMSBYPAGE = 6;

  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    continent: "",
    country: "",
    name: "",
    coverImage: "",
    remarks: "",
  });
  const [pictures, setPictures] = useState([]);
  const [continents, setContinents] = useState([]);

  const [openForm, setOpenForm] = useState(false);

  const [sendDestinationLoading, setSendDestinationLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const handleDestinationFormClick = () => {
    setOpenForm(!openForm);
  };

  const handleNewDestinationChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setNewDestination({ ...newDestination, [name]: value });
  };

  const handlePlacesCountryChange = (suggestion) => {
    console.log(suggestion);
    const name = suggestion.type;
    setNewDestination({ ...newDestination, [name]: suggestion.value });
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

  //gestion du changement de page
  const handlePaginationChange = (e, page) => {
    setCurrentPage(page);
    //window.scrollTo(0, 0);
  };

  const paginatedDestinations = Paginator.getData(
    destinations,
    currentPage,
    ITEMSBYPAGE
  );

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

  const addInputPicture = () => {
    setPictures([...pictures, { id: Math.random(), picture: "" }]);
  };

  const handlePicturesChange = (e, index) => {
    pictures[index].picture = e.target.files;
    setPictures(pictures);
  };

  const handlePictureRemove = (e, id) => {
    setPictures(pictures.filter((picture) => picture.id !== id));
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
              {/* <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  value={newDestination.country}
                  onChange={handleNewDestinationChange}
                  name="country"
                  fullWidth
                  variant="outlined"
                  label="Pays"
                />
              </Grid> */}
              <Grid item xs={12} className={classes.gridInput}>
                <Places
                  type="country"
                  name="country"
                  placeholder="Insérer le pays"
                  handleChange={(suggestion) =>
                    handlePlacesCountryChange(suggestion)
                  }
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <Places
                  type="city"
                  name="city"
                  placeholder="Insérer la ville"
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
                  //value={newDestination.coverImage}
                  onChange={handleFileChange}
                  name="coverImage"
                  fullWidth
                  type="file"
                  variant="outlined"
                  //label="Image de couverture"
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <Button
                  onClick={addInputPicture}
                  variant="contained"
                  color="primary"
                >
                  + Ajouter des images
                </Button>
                {pictures.map((picture, index) => {
                  return (
                    <div key={picture.id}>
                      <Grid container alignItems="center">
                        <Grid item xs={10}>
                          <TextField
                            style={{ marginTop: "20px" }}
                            //value={picture}
                            onChange={(e) => handlePicturesChange(e, index)}
                            name="pictures"
                            fullWidth
                            type="file"
                            variant="outlined"
                            //label="Image de couverture"
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            onClick={(e) => handlePictureRemove(e, picture.id)}
                            type="button"
                            variant="contained"
                            color="secondary"
                            style={{
                              marginTop: "20px",
                              marginLeft: "10px",
                              padding: "16px 16px",
                            }}
                          >
                            X
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
              <Grid item className={classes.gridInput}>
                <Button
                  type="button"
                  onClick={(e) => handleDestinationFormClick(e)}
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "10px" }}
                >
                  Annuler
                </Button>
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
          {paginatedDestinations.map((destination) => (
            <Grid item key={destination.id} m={4} xs={12} md={4}>
              <CardDestination destination={destination} />
            </Grid>
          ))}
        </Grid>
        <Paginator
          currentPage={currentPage}
          itemsByPage={ITEMSBYPAGE}
          length={destinations.length}
          onPageChanged={handlePaginationChange}
        />
      </Container>
    </section>
  );
};

export default Travel;
