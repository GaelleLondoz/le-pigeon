import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
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
  formControl: {
    //margin: theme.spacing(1),
    width: "100%",
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
    //continent: "",
    //country: "",
    name: "",
    coverImage: "",
    remarks: "",
    lat: "",
    lng: "",
    date: "",
    type: "",
    pictures: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    coverImage: "",
    remarks: "",
    latlng: "",
    date: "",
    type: "",
  });

  const [openForm, setOpenForm] = useState(false);

  const [sendDestinationLoading, setSendDestinationLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [showFlash, setShowFlash] = useState(false);

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
      setErrors({});
      setNewDestination({});
      setOpenForm(false);
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
      }, 5000);
      fetchDestinations(id);
    } catch (error) {
      setSendDestinationLoading(false);
      const { errors } = error.response.data;
      if (errors) {
        const apiErrors = {};
        errors.forEach((error) => {
          apiErrors[error.target] = error.msg;
        });
        setErrors(apiErrors);
      }
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
          + Nouvelle destination
        </Button>
        {showFlash && (
          <Slide direction="down" in={showFlash} mountOnEnter unmountOnExit>
            <Alert
              variant="filled"
              severity="success"
              style={{ marginTop: "20px" }}
            >
              Nouvelle destination ajoutée
            </Alert>
          </Slide>
        )}
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
                {errors.latlng && (
                  <p
                    style={{
                      marginLeft: "14px",
                      marginRight: "14px",
                      fontSize: "0.75rem",
                      color: "#f44336",
                      marginTop: "3px",
                    }}
                  >
                    {errors.latlng}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  error={errors.name ? true : false}
                  value={newDestination.name}
                  onChange={handleNewDestinationChange}
                  name="name"
                  variant="outlined"
                  fullWidth
                  label="Donnez un titre à votre voyage"
                  helperText={errors.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <FormControl
                  required
                  className={classes.formControl}
                  variant="outlined"
                >
                  <InputLabel id="type">Type de voyage</InputLabel>
                  <Select
                    error={errors.type ? true : false}
                    labelId="type"
                    value={newDestination.type}
                    name="type"
                    onChange={(e) =>
                      setNewDestination({
                        ...newDestination,
                        type: e.target.value,
                      })
                    }
                    label="Type de voyage"
                    fullWidth
                  >
                    <MenuItem value="Backpacking">Backpacking</MenuItem>
                    <MenuItem value="Hotel">Hotel</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#f44336" }}>
                    {errors.type && errors.type}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  error={errors.date ? true : false}
                  value={newDestination.date}
                  onChange={handleNewDestinationChange}
                  name="date"
                  variant="outlined"
                  fullWidth
                  //label="Date de votre destination"
                  type="date"
                  helperText={errors.date && errors.date}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  error={errors.remarks ? true : false}
                  value={newDestination.remarks}
                  onChange={handleNewDestinationChange}
                  multiline
                  rows="4"
                  name="remarks"
                  fullWidth
                  variant="outlined"
                  label="Remarque"
                  type="textarea"
                  helperText={errors.remarks && errors.remarks}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridInput}>
                <TextField
                  //value={newDestination.coverImage}
                  error={errors.coverImage ? true : false}
                  onChange={handleFileChange}
                  name="coverImage"
                  fullWidth
                  type="file"
                  variant="outlined"
                  helperText={errors.coverImage && errors.coverImage}
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
