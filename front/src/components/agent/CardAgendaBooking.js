import React from "react";
import { Typography } from "@material-ui/core";
import { formatDate } from "../../helpers/formatDate";
import { compareCurrentDate } from "../../helpers/compareCurrentDate";

const CardAgendaBooking = ({ booking }) => {
  return (
    <div className="profile-agent-agenda-card">
      <Typography component="p">
        Réservation prévu le <strong>{formatDate(booking.date)}</strong>
      </Typography>
      <Typography component="p">
        Status : <strong>{booking.status}</strong>
      </Typography>
      <Typography component="p">
        Pour la destination :{" "}
        <strong>{booking.BookingLocations[0].Location.name}</strong>
      </Typography>
      {!compareCurrentDate(booking.date) && (
        <Typography component="p" style={{ color: "red" }}>
          La date de la réservation est déjà passée
        </Typography>
      )}
    </div>
  );
};

export default CardAgendaBooking;
