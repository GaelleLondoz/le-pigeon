import React, { useState, useEffect, useContext } from "react";
// import { browserHistory } from 'react-router'
import { connect } from "react-redux";
import UserDestinationsAPI from "./../../components/services/userDestinationsAPI";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Places from "../../components/algolia/Places";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import CardAgent from "../../components/agent/CardAgent";
import { Redirect } from "react-router-dom";
import SearchAgentsContext from "../../contexts/SearchAgentsContext";

let Header = (props) => {
  const [mounted, setMounted] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [searchDestination, setSearchDestination] = useState({
    lat: null,
    lng: null,
  });
  const [searchType, setSearchType] = useState("");
  const [types, setTypes] = useState([]);
  const [searchAgents, setSearchAgents] = useState([]);
  const [redirect, setRedirect] = useState(false);
  let data = [];
  const [errors, setErrors] = useState({
    type: "",
    latlng: "",
  });

  const fetchLatLng = async () => {
    let dataCities = [];
    try {
      const dest = await UserDestinationsAPI.getAllDestinationsByUsers();
      setDestinations(dest);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSearchTypeChange = (event, value) => {
    setSearchType(value);
  };

  const handlePlacesLatLngChange = (suggestion) => {
    console.log({
      lat: suggestion.latlng.lat,
      lng: suggestion.latlng.lng,
    });
    setSearchDestination(suggestion.latlng);
  };

  const handleSearchClick = async () => {
    console.log("clicked search");
    try {
      setErrors({});
      const data = await UserDestinationsAPI.getAgentsByDestAndType(
        searchType,
        searchDestination.lat,
        searchDestination.lng
      );
      if (data.length > 0) {
        setSearchAgents(data);
        props.dispatch({ type: "SET_SEARCH_AGENTS", agents: data });
        //Check if the current location is /agents
        var hrefString = window.location.href;
        var pos = hrefString.indexOf("/agents") > -1;
        if (!pos) {
          props.history.push(
            `/agents?type=${searchType}&lat=${searchDestination.lat}&lng=${searchDestination.lng}`
          );
        } else {
          setRedirect(true);
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        props.dispatch({ type: "SET_SEARCH_AGENTS", agents: [] });
      }
      console.log({ error });
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
  useEffect(() => {
    if (mounted) {
      fetchLatLng();
      setMounted(false);
    }
  }, []);
  useEffect(() => {
    const names = destinations;
    let uniqueType = [];
    names.map((name) => {
      let row = {
        type: name.Destination.type,
      };
      const result = uniqueType.find(
        (row) => row.type === name.Destination.type
      );
      if (!result) uniqueType.push(row);
    });
    setTypes(uniqueType);
  }, [destinations]);

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `/agents`,
        }}
      />
    );
  }

  return (
    <section id="header-homepage">
      <Container>
        {!window.location.href.includes("agents") && (
          <Typography variant="h1">Trouvez votre agent de voyage</Typography>
        )}
        <div className="form-search">
          <form className="" noValidate autoComplete="off">
            <Grid container justify="center" spacing={4}>
              <Grid item sm={12} md={4}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={types.map((option) => option.type)}
                  onChange={handleSearchTypeChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      label="Quel type de voyage ?"
                      margin="normal"
                      variant="outlined"
                      error={errors.type ? true : false}
                      helperText={errors.type && errors.type}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <Places
                  type="city"
                  name="latlng"
                  placeholder="Insérer la ville de votre destination"
                  handleChange={(suggestion) =>
                    handlePlacesLatLngChange(suggestion)
                  }
                />
                {errors.latlng && (
                  <Typography
                    component="p"
                    style={{
                      margin: "3px 14px",
                      fontSize: "0.75rem",
                      color: "#710000",
                    }}
                  >
                    {errors.latlng}
                  </Typography>
                )}
              </Grid>
              <Grid item sm={12} md={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleSearchClick}
                >
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
const mapStateToSearchAgents = (state) => {
  return {
    agents: state.agents,
  };
};

Header = connect(mapStateToSearchAgents)(Header);

export default Header;
