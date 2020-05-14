import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { formatDate } from "../../helpers/formatDate";

const useStyles = makeStyles({
  containerCoverImage: {
    margin: "60px 0",
  },
  coverImage: {
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

const ShowDestination = ({ destination }) => {
  const classes = useStyles();
  return (
    <section className="travel-details">
      <Container>
        <div className="travel-detail-location-title">
          <Grid container justify="center">
            <Grid item xs={12} className={classes.locationTitle}>
              <Typography variant="h4">
                {destination.Destination.Continent.name} |{" "}
                {destination.Destination.Country.name}
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
              <img
                src={destination.Destination.coverImage}
                alt=""
                className={classes.coverImage}
              />
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
