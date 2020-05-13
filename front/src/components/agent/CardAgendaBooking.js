import React from "react";
import { Typography } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InfoIcon from "@material-ui/icons/Info";
import { formatDate } from "../../helpers/formatDate";
import { compareCurrentDate } from "../../helpers/compareCurrentDate";
import { changeColorIconStatus } from "../../helpers/changeColorIconStatus";

const CardAgendaBooking = ({ booking }) => {
  return (
    <div className="profile-agent-agenda-card">
      <div className="profile-agent-agenda-card-info">
        <EventIcon />
        <Typography component="p">
          Réservation prévu le <strong>{formatDate(booking.date)}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <CheckBoxIcon style={{ fill: changeColorIconStatus(booking.status) }} />
        <Typography component="p">
          Status : <strong>{booking.status}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <LocationOnIcon />
        <Typography component="p">
          Pour la destination :{" "}
          <strong>{booking.BookingLocations[0].Location.name}</strong>
        </Typography>
      </div>
      {!compareCurrentDate(booking.date) && (
        <div className="profile-agent-agenda-card-info">
          <InfoIcon />
          <Typography
            component="p"
            style={{ color: "red", fontWeight: "bold" }}
          >
            La date de la réservation est déjà passée
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CardAgendaBooking;
