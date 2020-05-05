import React from "react";
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
        <Typography variant="h5" component="h2">
          {destination.Destination.Continent.name}
        </Typography>
        <Typography className="" color="textSecondary">
          {destination.Destination.Country.name}
        </Typography>
        <Typography variant="body2" component="p">
          {destination.remarks}
        </Typography>
        <Typography component="small">
          Parti le {formatDate(destination.date)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardDestination;
