import React from "react";
import { Typography } from "@material-ui/core";
import { formatDate } from "../../helpers/formatDate";

const CardAgendaBooking = ({ booking }) => {
  return (
    <div className="profile-agent-agenda-card">
      <Typography component="p">
        Réservation prévu le {formatDate(booking.date)}
      </Typography>
      <Typography component="p">
        Status : <strong>{booking.status}</strong>
      </Typography>
      <Typography component="p">
        Pour la destination :{" "}
        <strong>{booking.BookingLocations[0].Location.name}</strong>
      </Typography>
    </div>
  );
};

export default CardAgendaBooking;
