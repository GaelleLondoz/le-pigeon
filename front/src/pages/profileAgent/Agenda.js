import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import TabPanel from "../../components/agent/TabPanel";
import BookingsAPI from "../../components/services/bookingAPI";
import CardAgendaBooking from "../../components/agent/CardAgendaBooking";
import { compareCurrentDate } from "../../helpers/compareCurrentDate";

const Agenda = () => {
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [valueTab, setValueTab] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [notBookings, setNotBookings] = useState("");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const fetchBookings = async (id) => {
    try {
      const data = await BookingsAPI.getBookingsByAgent(id);
      setBookings(data);
    } catch (error) {
      if (error.response.status === 404) {
        setNotBookings("Vous n'avez aucune réservation...");
      }
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchBookings(id);
  }, [id]);
  //console.log(bookings);
  return (
    <section className="profile-agent-agenda">
      <AppBar
        position="static"
        style={{
          maxWidth: "500px",
          backgroundColor: "lightGray",
          color: "black",
        }}
      >
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="tabs profile agent"
        >
          <Tab label="A venir" />
          <Tab label="Passée" />
        </Tabs>
      </AppBar>
      <TabPanel value={valueTab} index={0}>
        <Container>
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
                      <CardAgendaBooking booking={booking} />
                    </Grid>
                  )
                );
              })
            )}
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <Container>
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
                      <CardAgendaBooking booking={booking} />
                    </Grid>
                  )
                );
              })
            )}
          </Grid>
        </Container>
      </TabPanel>
    </section>
  );
};

export default Agenda;
