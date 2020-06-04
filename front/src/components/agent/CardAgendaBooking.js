import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import InfoIcon from "@material-ui/icons/Info";
import Alert from "@material-ui/lab/Alert";
import { formatDateWithHour } from "../../helpers/formatDate";
import { compareCurrentDate } from "../../helpers/compareCurrentDate";
import { changeColorIconStatus } from "../../helpers/changeColorIconStatus";
import { changeStatusToFrench } from "../../helpers/changeStatusToFrench";
import BookingAPI from "../../components/services/bookingAPI";

const CardAgendaBooking = ({ booking }) => {
  const [status, setStatus] = useState(booking.status);
  const [showFlash, setShowFlash] = useState(false);

  const handleAcceptBooking = async () => {
    try {
      await BookingAPI.acceptBooking(booking.id);
      setStatus("Acceptée");
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="profile-agent-agenda-card">
      {showFlash && (
        <Alert variant="filled" severity="success">
          Réservation acceptée
        </Alert>
      )}
      <div className="profile-agent-agenda-card-info">
        <EventIcon style={{ fill: "#750D37" }} />
        <Typography component="p">
          Réservation prévu le{" "}
          <strong>{formatDateWithHour(booking.date)}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <CheckBoxIcon style={{ fill: changeColorIconStatus(status) }} />
        <Typography component="p">
          Status : <strong>{changeStatusToFrench(status)}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <AccountBoxIcon style={{ fill: "#750D37" }} />
        <Typography component="p">
          Auteur de la réservation :{" "}
          <strong>
            {booking.booker.firstName} {booking.booker.lastName}
          </strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <LocationOnIcon style={{ fill: "#750D37" }} />
        <Typography component="p">
          Pour la destination :{" "}
          <strong>{booking.BookingLocations[0].Location.name}</strong>
        </Typography>
      </div>
      {status === "En cours" && (
        <div className="profile-agent-agenda-actions">
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "10px" }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptBooking}
          >
            Accepter
          </Button>
        </div>
      )}
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
