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
    color: "red",
  },
  date: {
    marginTop: "15px",
    fontStyle: "italic",
  },
});

const CardDestination = ({ destination }) => {
  const classes = useStyles();
  return (
    // <Card className="card-destination" variant="outlined">
    //   <CardContent>
    //     <Typography
    //       className="card-destination-title"
    //       color="textSecondary"
    //       gutterBottom
    //     >
    //       {destination.Destination.name}
    //     </Typography>
    //     <div className="card-destination-info">
    //       <LocationOnIcon />
    //       <Typography variant="h5" component="h2">
    //         {destination.Destination.Continent.name}
    //       </Typography>
    //     </div>
    //     <div className="card-destination-info">
    //       <LocationCityIcon />
    //       <Typography
    //         className="card-destination-country"
    //         color="textSecondary"
    //       >
    //         {destination.Destination.Country.name}
    //       </Typography>
    //     </div>
    //     <div className="card-destination-desc">
    //       <Typography variant="body2" component="p">
    //         {destination.remarks}
    //       </Typography>
    //       <div className="card-destination-info" style={{ marginTop: "15px" }}>
    //         <EventIcon />
    //         <Typography component="p">
    //           Parti le {formatDate(destination.date)}
    //         </Typography>
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
    <Card className={classes.root}>
      <CardActionArea>
        {/* TODO => VERIFY IF DESTINATION HAS PICTURE, IF NOT MAKE A COVER IMAGE DEFAULT ?? */}
        <CardMedia
          component="img"
          alt={destination.Destination.Country.name}
          className={classes.media}
          image={destination.Destination.coverImage}
          title={destination.Destination.Country.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {destination.Destination.Continent.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h4"
            className={classes.h4}
          >
            {destination.Destination.Country.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {destination.remarks}
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
            destination.id
          }
        >
          En savoir plus
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardDestination;
