import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserDestinationsAPI from "../../components/services/userDestinationsAPI";
import CardDestination from "../../components/agent/CardDestination";
import LoaderButton from "../../components/loaders/LoaderButton";
import Places from "../../components/algolia/Places";
import Paginator from "../../components/Pagination";
import { getBase64 } from "../../helpers/getBase64";

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
    lat: "",
    lng: "",
    date: "",
    pictures: [],
  });

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

  const handlePlacesLatLngChange = (suggestion) => {
    setNewDestination({
      ...newDestination,
      lat: suggestion.latlng.lat,
      lng: suggestion.latlng.lng,
    });
  };

  // const createImage = (file) => {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setNewDestination({ ...newDestination, coverImage: e.target.result });
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleFileChange = async (event) => {
    const files = event.target.files || event.dataTransfer.files;
    //createImage(files[0]);
    await getBase64(files[0]).then((result) =>
      setNewDestination({ ...newDestination, coverImage: result })
    );
  };

  const handlePicturesChange = (e) => {
    let files = Array.from(e.target.files);
    files = files.map(async (file) => ({
      content: await getBase64(file),
      // fileName: file.name,
      // contentType: file.type,
      // length: file.size,
    }));
    Promise.all(files).then((result) =>
      setNewDestination({ ...newDestination, pictures: result })
    );
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

  useEffect(() => {
    fetchDestinations(id);
  }, [id]);
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
                <Places
                  type="city"
                  name="latlng"
                  placeholder="Insérer la ville de votre destination"
                  handleChange={(suggestion) =>
                    handlePlacesLatLngChange(suggestion)
                  }
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  value={newDestination.name}
                  onChange={handleNewDestinationChange}
                  name="name"
                  variant="outlined"
                  fullWidth
                  label="Donnez un titre à votre voyage"
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  value={newDestination.date}
                  onChange={handleNewDestinationChange}
                  name="date"
                  variant="outlined"
                  fullWidth
                  //label="Date de votre destination"
                  type="date"
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
                  type="textarea"
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
                <TextField
                  //value={newDestination.coverImage}
                  onChange={handlePicturesChange}
                  name="pictures"
                  fullWidth
                  type="file"
                  variant="outlined"
                  inputProps={{ multiple: true }}
                  //label="Image de couverture"
                />
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
        {destinations.length > 6 && (
          <Paginator
            currentPage={currentPage}
            itemsByPage={ITEMSBYPAGE}
            length={destinations.length}
            onPageChanged={handlePaginationChange}
          />
        )}
      </Container>
    </section>
  );
};

export default Travel;
