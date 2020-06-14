import React from "react";
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

const rows = [];
//Retrieve Bookings
async function initBookings() {
  const bookings = await bookingAPI.getBookings();
  const entries = bookings.entries();
  for (const [i, item] of entries) {
    var __FOUND = rows.find(function (post, index) {
      if (post.id == item.id) {
        console.log("FOUND!!!!");
        return true;
      }
    });
    if (!__FOUND) {
      let row = {
        id: item.id,
        date: item.date,
        status: item.status,
        username: item.firstNameName + " " + item.lastName,
        agentname: item.agentName,
      };
      rows.push(row);
    }
  }
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

//Retrieve Bookings from database
initBookings();
//End Retrieve
export default function Bookings() {
  const classes = useStyles();
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
          {rows.map((row) => (
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
