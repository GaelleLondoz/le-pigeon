import React from "react";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Card, CardContent, Typography } from "@material-ui/core";
import { formatDate } from "../../helpers/formatDate";

const CardDestination = ({ destination }) => {
  return (
    <Card className="card-destination" variant="outlined">
      <CardContent>
        <Typography
          className="card-destination-title"
          color="textSecondary"
          gutterBottom
        >
          {destination.Destination.name}
        </Typography>
        <div className="card-destination-info">
          <LocationOnIcon />
          <Typography variant="h5" component="h2">
            {destination.Destination.Continent.name}
          </Typography>
        </div>
        <div className="card-destination-info">
          <LocationCityIcon />
          <Typography
            className="card-destination-country"
            color="textSecondary"
          >
            {destination.Destination.Country.name}
          </Typography>
        </div>
        <div className="card-destination-desc">
          <Typography variant="body2" component="p">
            {destination.remarks}
          </Typography>
          <Typography component="small">
            Parti le {formatDate(destination.date)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDestination;
