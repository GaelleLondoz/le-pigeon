import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Badge,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { formatDate } from "../../helpers/formatDate";
import AvatarDefault from "../../assets/images/avatar_default.png";

const useStyles = makeStyles({
  containerCoverImage: {
    margin: "60px 0",
  },
  picture: {
    width: "100%",
    maxHeight: "500px",
  },
  locationTitle: {
    display: "flex",
    marginTop: "30px",
    justifyContent: "center",
  },
  dateStart: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
    fontStyle: "italic",
  },
});

const ShowDestination = ({ destination, pictures }) => {
  const [destinationDetails, setDestinationDetails] = useState({
    results: [
      {
        components: {},
      },
    ],
  });

  const classes = useStyles();
  const params = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  const fetchInfoLocation = () => {
    if (destination.Destination.lat === undefined) return;
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${destination.Destination.lat}%2C+${destination.Destination.lng}&key=${process.env.REACT_APP_API_KEY_OPENCAGE}`
    )
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response.json().then(function (data) {
          setDestinationDetails(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  };

  useEffect(() => {
    fetchInfoLocation();
  }, [destination]);

  return (
    <section className="travel-details">
      <Container>
        <div className="travel-detail-location-title">
          <Grid container justify="center">
            <Grid item xs={12} className={classes.locationTitle}>
              <Typography variant="h5">
                {/* {destinationDetails.results[0].components.continent} |{" "}
                {destinationDetails.results[0].components.country} |{" "} */}
                Mon voyage à{" "}
                {destinationDetails.results[0].components.city ||
                  destinationDetails.results[0].components.city_district}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div
          className="travel-detail-coverImage"
          className={classes.containerCoverImage}
        >
          <Grid container justify="center">
            <Grid item xs={12}>
              <Swiper {...params} shouldSwiperUpdate>
                <img
                  alt={destination.Destination.name}
                  src={
                    destination.Destination.coverImage &&
                    "http://localhost:5000/destination/" +
                      destination.Destination.coverImage
                  }
                  className={classes.picture}
                />
                {pictures.map((picture) => (
                  <div key={picture.id}>
                    <img
                      alt={picture.alt}
                      src={"http://localhost:5000/destination/" + picture.path}
                      className={classes.picture}
                    />
                  </div>
                ))}
              </Swiper>
              {/* <Typography component="p" className={classes.dateStart}>
                - Parti le {formatDate(destination.date)} -
              </Typography> */}
            </Grid>
          </Grid>
        </div>
        <div className="travel-detail-info">
          <Typography variant="h5">Agent de voyage</Typography>
          <div className="travel-detail-info-agent-container">
            <div className="travel-detail-info-agent">
              <Avatar
                alt={"Le Pigeon | Avatar de " + destination.User.firstName}
                src={
                  destination.User.avatar
                    ? "http://localhost:5000/avatar/" + destination.User.avatar
                    : AvatarDefault
                }
              />
              <Typography component="p">
                {destination.User.firstName} {destination.User.lastName}
                <br />
                Mon voyage à{" "}
                {destinationDetails.results[0].components.city ||
                  destinationDetails.results[0].components.city_district}{" "}
                en date du {formatDate(destination.date)}
              </Typography>
            </div>
            <Link to={"/agent/" + destination.User.id}>En savoir plus</Link>
          </div>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Information complémentaire sur le voyage de{" "}
                <strong>
                  {destination.User.firstName} {destination.User.lastName}
                </strong>
              </Typography>
              <Typography
                component="p"
                style={{ marginBottom: "15px", fontWeight: "bold" }}
              >
                Type de voyage :{" "}
              </Typography>
              <Chip color="secondary" label={destination.Destination.type} />
              <Typography
                component="p"
                style={{
                  marginTop: "20px",
                  marginBottom: "15px",
                  fontWeight: "bold",
                }}
              >
                Description :
              </Typography>
              <Typography component="p">{destination.remarks}</Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default ShowDestination;
