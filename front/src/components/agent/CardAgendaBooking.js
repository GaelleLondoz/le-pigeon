import React, { useState, useContext } from "react";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import InfoIcon from "@material-ui/icons/Info";
import Alert from "@material-ui/lab/Alert";
import {
  formatDateWithHour,
  formatEnglishDateWithHour,
} from "../../helpers/formatDate";
import { compareCurrentDate } from "../../helpers/compareCurrentDate";
import { changeColorIconStatus } from "../../helpers/changeColorIconStatus";
import { changeStatusBookingToFrench } from "../../helpers/changeStatusToFrench";
import BookingAPI from "../../components/services/bookingAPI";
import AuthContext from "../../contexts/AuthContext";

const CardAgendaBooking = ({ booking, onFetchBookings }) => {
  const [status, setStatus] = useState(booking.status);
  const [showFlash, setShowFlash] = useState(false);
  const [messageFlash, setMessageFlash] = useState("");
  const [showFormUpdateBooking, setShowFormUpdateBooking] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [bookingDate, setBookingDate] = useState(booking.date);
  const [errors, setErrors] = useState({
    date: "",
  });

  const handleAcceptBookingClick = async () => {
    try {
      await BookingAPI.acceptBooking(booking.id);
      setStatus("ACCEPTED");
      setMessageFlash("La réservation a bien été acceptée");
      setShowFlash(true);
      onFetchBookings();
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCancelBookingClick = async () => {
    try {
      await BookingAPI.cancelBooking(booking.id);
      setStatus("CANCELLED");
      setMessageFlash("La réservation a bien été annulée");
      setShowFlash(true);
      onFetchBookings();
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUpdateBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await BookingAPI.updateBookingDate(booking.id, { date: bookingDate });
      setErrors({});
      setShowFormUpdateBooking(false);
      setMessageFlash("La réservation a bien été modifiée");
      setShowFlash(true);
      onFetchBookings();
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    } catch (error) {
      const { errors } = error.response.data;
      if (errors) {
        const apiErrors = {};
        errors.forEach((error) => {
          apiErrors[error.target] = error.msg;
        });
        setErrors(apiErrors);
      }
      console.log(error.response);
    }
  };

  const handleUpdateBookingClick = () => {
    setShowFormUpdateBooking(!showFormUpdateBooking);
  };

  const handleDateChange = (e) => {
    setBookingDate(e.target.value);
  };
  //console.log(booking);
  console.log(bookingDate);
  return (
    <div className="profile-agent-agenda-card">
      {showFlash && (
        <Alert variant="filled" severity="success">
          {messageFlash}
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
          Status : <strong>{changeStatusBookingToFrench(status)}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <AccountBoxIcon style={{ fill: "#750D37" }} />
        {currentUser.isAgent ? (
          <Typography component="p">
            Auteur de la réservation :{" "}
            <strong>
              {booking.booker.firstName} {booking.booker.lastName}
            </strong>
          </Typography>
        ) : (
          <Typography component="p">
            Réservation avec l'agent :{" "}
            <strong>
              {booking.agent.firstName} {booking.agent.lastName}
            </strong>
          </Typography>
        )}
      </div>
      <div className="profile-agent-agenda-card-info">
        <LocationOnIcon style={{ fill: "#750D37" }} />
        <Typography component="p">
          Pour la destination :{" "}
          <strong>{booking.BookingLocations[0].Location.name}</strong>
        </Typography>
      </div>
      {status === "PENDING" &&
        compareCurrentDate(booking.date) &&
        currentUser.isAgent && (
          <div className="profile-agent-agenda-actions">
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "10px" }}
              onClick={handleCancelBookingClick}
            >
              Refuser
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAcceptBookingClick}
            >
              Accepter
            </Button>
          </div>
        )}
      {status === "ACCEPTED" &&
        currentUser.isAgent &&
        compareCurrentDate(booking.date) && (
          <div className="profile-agent-agenda-actions">
            <Button
              variant="contained"
              color={showFormUpdateBooking ? "secondary" : "primary"}
              onClick={handleUpdateBookingClick}
            >
              {showFormUpdateBooking
                ? "Fermer la modification"
                : "Modifier la réservation"}
            </Button>
          </div>
        )}
      {showFormUpdateBooking && (
        <form
          style={{ marginTop: "20px" }}
          onSubmit={handleUpdateBookingSubmit}
        >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                type="datetime-local"
                defaultValue={formatEnglishDateWithHour(bookingDate)}
                variant="outlined"
                name="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleDateChange}
                error={errors.date ? true : false}
                helperText={errors.date && errors.date}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "15px" }}>
              <Button variant="contained" color="primary" type="submit">
                Confirmer la modification
              </Button>
            </Grid>
          </Grid>
        </form>
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
