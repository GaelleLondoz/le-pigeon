import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventIcon from "@material-ui/icons/Event";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Button,
  CardActions,
} from "@material-ui/core";
import { formatDate } from "../../helpers/formatDate";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "50px 0px",
  },
  media: {
    height: 140,
  },
  h4: {
    color: "#2E4052",
  },
  date: {
    marginTop: "15px",
    fontStyle: "italic",
  },
  linkShowMore: {
    padding: "8px",
    textDecoration: "none",
    color: "#3f51b5",
  },
});

const CardDestination = ({ destination }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* TODO => VERIFY IF DESTINATION HAS PICTURE, IF NOT MAKE A COVER IMAGE DEFAULT ?? */}
        <CardMedia
          component="img"
          alt={destination.name}
          className={classes.media}
          image={
            "http://localhost:5000/destination/" +
            destination.Destination.coverImage
          }
          title={destination.Destination.name}
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="h3">
            {destination.Destination.name}
          </Typography> */}
          <Typography
            gutterBottom
            variant="h5"
            component="h4"
            className={classes.h4}
          >
            {destination.Destination.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {destination.remarks.substr(0, 60)}...
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.date}
          >
            Parti le {formatDate(destination.date)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={
            "/profile/agent/" +
            destination.UserId +
            "/destination/" +
            destination.Destination.id
          }
          className={classes.linkShowMore}
        >
          En savoir plus
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardDestination;
