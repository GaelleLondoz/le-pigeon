import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import bookingAPI from "../services/bookingAPI";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Bookings() {
  const classes = useStyles();
  const array = [];
  const [bookingsList, setBookingsList] = useState(array);
  const [load, setLoad] = useState(true);

  const initBookings = async () => {
    let data = [];
    const bookings = await bookingAPI.getBookings();
    const entries = bookings.entries();
    for (const [i, item] of entries) {
      //Check if the booking is already existing within the list
      const result = data.find((row) => row.id == item.id);
      //If booking do not exist then add it
      if (!result) {
        let row = {
          id: item.id,
          date: new Date(item.date).toDateString(),
          status: item.status,
          username: item.firstName + " " + item.lastName,
          agentname: "",
        };
        data.push(row);
      }
      //otherwise search the row and update agent name
      else {
        var foundIndex = data.findIndex((row) => row.id == item.id);
        data[foundIndex].agentname = item.firstName + " " + item.lastName;
      }
    }
    setBookingsList(data);
  };

  useEffect(() => {
    if (load) {
      initBookings();
      setLoad(false);
    }
  });

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>Bookings</Title>
            </TableCell>
            <TableCell>
              <Button variant="contained" color="primary" component="span">
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Agent Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingsList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.agentname}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" component="span">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more users
        </Link>
      </div>
    </React.Fragment>
  );
}
