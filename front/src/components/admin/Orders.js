import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import userAPI from "../services/userAPI";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const array = [];
  const [ordersList, setOrdersList] = useState(array);
  const [load, setLoad] = useState(true);

  const initOrders = async () => {
    let data = [];
    const orders = await userAPI.getRecentOrders();
    const entries = orders.entries();
    for (const [i, item] of entries) {
      let row = {
        id: i,
        date: item.date,
        name: item.firstname + " " + item.lastname,
        amount: item.amount,
      };
      const dateAsString = new Date(row.date).toDateString();
      row.date = dateAsString;
      data.push(row);
    }
    setOrdersList(data);
  };

  useEffect(() => {
    if (load) {
      initOrders();
      setLoad(false);
    }
  });
  return (
    <React.Fragment>
      <Title>Monthly Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>VISA</TableCell>
              <TableCell align="right">€ {row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
