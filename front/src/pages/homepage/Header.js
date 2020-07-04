import React, { useState, useEffect } from "react";
import UserDestinationsAPI from "./../../components/services/userDestinationsAPI";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Places from "../../components/algolia/Places";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import userDestinationsAPI from "../../components/services/userDestinationsAPI";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const Header = () => {
  const [cities, setCities] = useState({
    citiesAPI: [],
  });
  const [mounted, setMounted] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [searchType, setSearchType] = useState("");
  const [types, setTypes] = useState([]);
  const [checked, setChecked] = useState({
    // Hotel: true,
    // Backpacking: true,
  });
  //const [checked, setChecked] = useState(true);
  let data = [];
  //const destinationSearch = React.createRef();
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

  // const initDestinations = async () => {
  //   let data = [];
  //   const destinations = await UserDestinationsAPI.getAllDestinationsByUsers();
  //   // const ratings = await reviewAPI.getRatings();
  //   const entries = destinations.entries();
  //   for (const [i, item] of entries) {
  //     const result = data.find((row) => row.type === item.Destination.type);
  //     let row = {
  //       name: item.Destination.name,
  //       type: item.Destination.type,
  //       lat: item.Destination.lat,
  //       lng: item.Destination.lng,
  //     };
  //     if (!result) {
  //       row.type = item.Destination.type;
  //     } else {
  //       row.type = "";
  //     }
  //     data.push(row);
  //   }
  //   setDestinations(data);
  // };
  const fetchLatLng = async () => {
    let dataCities = [];
    try {
      const dest = await UserDestinationsAPI.getAllDestinationsByUsers();
      setDestinations(dest);
      dest.map(async (data) => {
        let response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${data.Destination.lat}%2C+${data.Destination.lng}&language=en&key=${process.env.REACT_APP_API_KEY_OPENCAGE}`
        );
        const { results } = await response.json();
        if (results[0] !== undefined) dataCities.push(results[0]);
        setCities({ ...cities, citiesAPI: dataCities });
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSearchCityChange = (event, value) => {
    setSearchCity(value);
  };
  const handleSearchTypeChange = (event, value) => {
    setSearchType(value);
  };

  const handlePlacesLatLngChange = async (suggestion) => {
    console.log({
      lat: suggestion.latlng.lat,
      lng: suggestion.latlng.lng,
    });
    const { lat, lng } = suggestion.latlng;

    // const proxyDestinations = await UserDestinationsAPI.getProxyDestinations(
    //   lat,
    //   lng
    // );

    //   // proxyDestinations.map((destination) => {
    //   //   let row = {
    //   //     type: destination.type,
    //   //   };
    //   //   const result = data.find((row) => row.type === destination.type);
    //   //   if (!result) data.push(row);
    //   // });
    //   //setTypes(data);
    //   //console.log(types);

    //   //console.log({ proxyDestinations });
  };
  useEffect(() => {
    if (mounted) {
      //initDestinations();
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

  // useEffect(() => {
  //   //Change focus
  //   destinationSearch.focus();
  // }, [searchType]);
  console.log({ destinations });
  console.log({ searchType });
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
                  //value={searchType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      label="Quel type de voyage ?"
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                />
                {/* {types.map(({ type }) => {
                  console.log({ type });
                  return (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          checked={checked[type]}
                          //checked={checked}
                          onChange={handleSearchTypeChange}
                          name={type}
                          color="primary"
                        />
                      }
                      label={type}
                    />
                  );
                })} */}
              </Grid>
              <Grid item sm={12} md={4}>
                {/* <Autocomplete
                  id="free-solo-demo-2"
                  freeSolo
                  options={cities.citiesAPI.map((data) => {
                    console.log(data);
                    if (data.components.city !== undefined)
                      return data.components.city;
                    if (data.components.state !== undefined)
                      return data.components.state;
                    if (data.components.city_district !== undefined)
                      return data.components.city_district;
                    return data.formatted;
                    // return data.components.city === undefined
                    //   ? data.components.city_district
                    //   : data.components.city;
                  })}
                  onChange={handleSearchCityChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic-2"
                      label="Quelle région du monde ?"
                      margin="normal"
                      variant="outlined"
                    />
                  )} */}
                <Places
                  type="city"
                  name="latlng"
                  placeholder="Insérer la ville de votre destination"
                  handleChange={(suggestion) =>
                    handlePlacesLatLngChange(suggestion)
                  }
                  // ref={(input) => {
                  //   destinationSearch = input;
                  // }}
                />
                {/* <Autocomplete
                  id="free-solo-demo-2"
                  freeSolo
                  options={cities.citiesAPI.map((data) => {
                    // console.log(data);
                    if (data.components.city !== undefined)
                      return data.components.city;
                    if (data.components.state !== undefined)
                      return data.components.state;
                    if (data.components.city_district !== undefined)
                      return data.components.city_district;
                    return data.formatted;
                    // return data.components.city === undefined
                    //   ? data.components.city_district
                    //   : data.components.city;
                  })}
                  onChange={handleSearchCityChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic-2"
                      label="Quelle région du monde ?"
                      margin="normal"
                      variant="outlined"
                    />
                  // )} */}
                {/* /> */}
              </Grid>
              <Grid item sm={12} md={4}>
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
