import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "../../components/agent/TabPanel";
import BookingsAPI from "../../components/services/bookingAPI";
import CardAgendaBooking from "../../components/agent/CardAgendaBooking";
import { compareCurrentDate } from "../../helpers/compareCurrentDate";
import ChatBox from "../../components/chatbox/ChatBox";

const UserBooking = ({ match }) => {
  const { id } = match.params;
  const classes = useStyles();

  const [valueTab, setValueTab] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [notBookings, setNotBookings] = useState("");
  const [enableCall, setEnableCall] = useState(false);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleConferenceCall = () => {
    setEnableCall(true);
  };

  const fetchBookings = async (id) => {
    try {
      const data = await BookingsAPI.getBookingsByUser(id);
      setBookings(data);
    } catch (error) {
      if (error.response.status === 404) {
        setNotBookings("Vous n'avez aucune réservation...");
      }
      console.log(error.response);
    }
  };
  //Callback to child CardAgendaBooking
  const fetchUserBookingsCallBack = async (id) => {
    await fetchBookings(id);
  };

  useEffect(() => {
    fetchBookings(id);
  }, [id]);

  return (
    <section id="profile-user-agenda">
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          //variant="scrollable"
          value={valueTab}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="A venir" />
          <Tab label="Passée" />
        </Tabs>
        <TabPanel value={valueTab} index={0}>
          <Typography variant="h5">
            Liste de vos prochaines réservations
          </Typography>
          <Grid container>
            {notBookings ? (
              <Grid item xs={12}>
                <p>{notBookings}</p>
              </Grid>
            ) : (
              bookings.map((booking) => {
                return (
                  compareCurrentDate(booking.date) && (
                    <Grid item xs={12} key={booking.id}>
                      <CardAgendaBooking
                        booking={booking}
                        onFetchBookings={() => fetchUserBookingsCallBack(id)}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => handleConferenceCall()}
                      >
                        Rejoindre
                      </Button>
                      {enableCall && <ChatBox></ChatBox>}
                    </Grid>
                  )
                );
              })
            )}
          </Grid>
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <Typography variant="h5">
            Liste de vos réservations passées
          </Typography>
          <Grid container>
            {notBookings ? (
              <Grid item xs={12}>
                <p>{notBookings}</p>
              </Grid>
            ) : (
              bookings.map((booking) => {
                return (
                  !compareCurrentDate(booking.date) && (
                    <Grid item xs={12} key={booking.id}>
                      <CardAgendaBooking
                        booking={booking}
                        onFetchBookings={() => fetchUserBookingsCallBack(id)}
                      />
                    </Grid>
                  )
                );
              })
            )}
          </Grid>
        </TabPanel>
      </div>
    </section>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default UserBooking;
