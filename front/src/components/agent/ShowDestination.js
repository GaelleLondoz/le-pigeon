import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { formatDate } from "../../helpers/formatDate";

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
              <Typography variant="h4">
                {destinationDetails.results[0].components.continent} |{" "}
                {destinationDetails.results[0].components.country} |{" "}
                {destinationDetails.results[0].components.city}
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
              {/* <img
                src={destination.Destination.coverImage}
                alt=""
                className={classes.coverImage}
              /> */}
              <Swiper {...params} shouldSwiperUpdate>
                <img
                  alt={destination.Destination.name}
                  src={
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
              <Typography component="p" className={classes.dateStart}>
                - Parti le {formatDate(destination.date)} -
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className="travel-detail-info">
          <Grid container>
            <Grid item xs={12} md={8}>
              <Typography component="p">{destination.remarks}</Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default ShowDestination;
