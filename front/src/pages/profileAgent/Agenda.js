import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import BookingsAPI from "../../components/services/bookingAPI";
import CardAgendaBooking from "../../components/agent/CardAgendaBooking";

const Agenda = () => {
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [bookings, setBookings] = useState([]);
  const [notBookings, setNotBookings] = useState("");

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
  console.log(bookings);
  return (
    <section className="profile-agent-agenda">
      <Container>
        <Typography variant="h4">
          Liste de vos prochaines réservations
        </Typography>
        <Grid container>
          {notBookings ? (
            <Grid item xs={12}>
              <p>{notBookings}</p>
            </Grid>
          ) : (
            bookings.map((booking) => (
              <Grid item xs={12} key={booking.id}>
                <CardAgendaBooking booking={booking} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </section>
  );
};

export default Agenda;
