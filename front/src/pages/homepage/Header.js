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

  // const {
  //   searchAgents,
  //   setSearchAgents,
  //   setSearchDisplay,
  //   searchDisplay,
  // } = useContext(SearchAgentsContext);

  const fetchLatLng = async () => {
    let dataCities = [];
    try {
      const dest = await UserDestinationsAPI.getAllDestinationsByUsers();
      setDestinations(dest);
      // dest.map(async (data) => {
      //   let response = await fetch(
      //     `https://api.opencagedata.com/geocode/v1/json?q=${data.Destination.lat}%2C+${data.Destination.lng}&language=en&key=${process.env.REACT_APP_API_KEY_OPENCAGE}`
      //   );
      //   const { results } = await response.json();
      //   if (results[0] !== undefined) dataCities.push(results[0]);
      //   setCities({ ...cities, citiesAPI: dataCities });
      // });
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
    try {
      setErrors({});
      const data = await UserDestinationsAPI.getAgentsByDestAndType(
        searchType,
        searchDestination.lat,
        searchDestination.lng
      );
      setSearchAgents(data);
      console.log({ store: props });
      // setSearchDisplay(true);
      props.dispatch({ type: "SET_SEARCH_AGENTS", agents: data });
      // this.props.dispatch(registerStep1Success())

      props.history.push(
        `/agents?type=${searchType}&lat=${searchDestination.lat}&lng=${searchDestination.lng}`
      );

      // setRedirect(true);
    } catch (error) {
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

  //console.log({ search: searchAgents });

  if (redirect) {
    return (
      <Redirect
        // exact
        from="/"
        to={{
          pathname: `/agents?type=${searchType}&lat=${searchDestination.lat}&lng=${searchDestination.lng}`,
          // state: { searchAgents, searchDisplay },
        }}
      />
    );
  }
  // console.log({ headerSearch: searchAgents, searchDisplay });
  return (
    <section id="header-homepage">
      <Container>
        <Typography variant="h1">Trouvez votre agent de voyage</Typography>
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

// const mapDispatchToSearchAgents = (dispatch) => {
//   return {
//     // login: () => {
//     //   //Dispatch => role: call a action of type ...(SET_AUTH)
//     //   dispatch({ type: "SET_AUTH" });
//     // },
//     search: () => {
//       //Dispatch => role: call a action of type ...(SET_AUTH)
//       dispatch({ type: "SET_SEARCH_AGENTS" });
//     }
//   };
//   // return bindActionCreators({ setLight: setLight }, dispatch);
// };

// Header = connect(mapStateToSearchAgents, mapDispatchToSearchAgents)(Header);
Header = connect(mapStateToSearchAgents)(Header);

export default Header;
