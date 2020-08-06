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
  formatDateWithHourToEnglish,
} from "../../helpers/formatDate";
import {
  compareCurrentDate,
  compareDateForUpdateBooking,
  displayCallButton,
} from "../../helpers/compareCurrentDate";
import { changeColorIconStatus } from "../../helpers/changeColorIconStatus";
import { changeStatusBookingToFrench } from "../../helpers/changeStatusToFrench";
import BookingAPI from "../../components/services/bookingAPI";
import AuthContext from "../../contexts/AuthContext";
import LoaderButton from "../loaders/LoaderButton";
import CategoryIcon from "@material-ui/icons/Category";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ChatBox from "../chatbox/ChatBox";

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
  const [loadingUpdateBooking, setLoadingUpdateBooking] = useState(false);
  const [enableCall, setEnableCall] = useState(false);
  const [userToCall, setUserToCall] = useState({});
  const [agentToCall, setAgentToCall] = useState({});

  const handleConferenceCallAgent = (booker) => {
    const userToCall = {
      id: booker.id,
      firstName: booker.firstName,
      lastName: booker.lastName,
      email: booker.email,
      avatar: booker.avatar,
      userName: booker.userName,
    };
    setUserToCall(userToCall);
    setEnableCall(true);
  };
  const handleConferenceCallUser = (user) => {
    const agentToCall = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
    };
    setAgentToCall(agentToCall);
    setEnableCall(true);
  };
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
    setLoadingUpdateBooking(true);
    try {
      await BookingAPI.updateBookingDate(booking.id, { date: bookingDate });
      setLoadingUpdateBooking(false);
      setErrors({});
      setShowFormUpdateBooking(false);
      setMessageFlash("La réservation a bien été modifiée");
      setShowFlash(true);
      onFetchBookings();
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    } catch (error) {
      setLoadingUpdateBooking(false);
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
          <strong>{formatDateWithHour(bookingDate)}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <CheckBoxIcon style={{ fill: changeColorIconStatus(status) }} />
        <Typography component="p">
          Status : <strong>{changeStatusBookingToFrench(status)}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <EventIcon style={{ fill: "#750D37" }} />
        <Typography component="p">
          Nombre d'heure(s): <strong>{booking.hours}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <AccountBoxIcon style={{ fill: "#750D37" }} />
        {currentUser.isAgent ? (
          <Typography component="p">
            Auteur de la réservation :{" "}
            <strong>
              {booking.booker.firstName} {booking.booker.lastName}{" "}
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
      {/* <div className="profile-agent-agenda-card-info">
        <LocationOnIcon style={{ fill: "#750D37" }} />
        <Typography component="p">
          Pour la destination :{" "}
          <strong>{booking.BookingLocations[0].Location.name}</strong>
        </Typography>
      </div> */}
      <div className="profile-agent-agenda-card-info">
        <CategoryIcon style={{ fill: "#750D37" }} />
        <Typography component="p">
          Type de réservation : <strong>{booking.type}</strong>
        </Typography>
      </div>
      <div className="profile-agent-agenda-card-info">
        <ModeCommentIcon style={{ fill: "#750D37" }} />
        <Typography component="p">Commentaire : {booking.comment}</Typography>
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
        compareDateForUpdateBooking(booking.date) && (
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
      {currentUser.isAgent &&
        status === "ACCEPTED" &&
        displayCallButton(booking.date) &&
        compareCurrentDate(booking.date) && (
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleConferenceCallAgent(booking.booker)}
          >
            Appeler
          </Button>
        )}
      {!currentUser.isAgent &&
        status === "ACCEPTED" &&
        displayCallButton(booking.date) &&
        compareCurrentDate(booking.date) && (
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleConferenceCallUser(booking.agent)}
          >
            Rejoindre
          </Button>
        )}
      {enableCall && currentUser.isAgent && (
        <ChatBox user={userToCall}></ChatBox>
      )}

      {enableCall && !currentUser.isAgent && (
        <ChatBox receiver={agentToCall}></ChatBox>
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
                defaultValue={formatDateWithHourToEnglish(bookingDate)}
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
              {/* <Button variant="contained" color="primary" type="submit">
                Confirmer la modification
              </Button> */}
              <LoaderButton
                loadingButton={loadingUpdateBooking}
                text="Confirmer la modification"
              />
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
