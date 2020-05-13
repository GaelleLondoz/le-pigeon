import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";

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

const ShowDestination = () => {
  const classes = useStyles();
  return (
    <section className="travel-details">
      <Container>
        <div className="travel-detail-location-title">
          <Grid container justify="center">
            <Grid item xs={12} className={classes.locationTitle}>
              <Typography variant="h4">Amérique du Nord | Bulgarie</Typography>
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
                src="https://cdn.pixabay.com/photo/2020/05/07/09/33/flaming-5140842__340.jpg"
                alt=""
                className={classes.coverImage}
              />
              <Typography component="p" className={classes.dateStart}>
                - Parti le 22/04/2019 -
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className="travel-detail-info">
          <Grid container>
            <Grid item xs={12} md={8}>
              <Typography component="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem, aut nobis veritatis voluptas beatae quos!
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default ShowDestination;
