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
import reviewAPI from "../services/reviewAPI";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Reviews() {
  const classes = useStyles();
  const array = [];
  const [ratingsList, setRatingsList] = useState(array);

  const initRatings = async () => {
    let data = [];
    const ratings = await reviewAPI.getRatings();
    const entries = ratings.entries();
    for (const [i, item] of entries) {
      //Check if the booking is already existing within the list
      const result = data.find((row) => row.id == item.id);
      //If booking do not exist then add it
      if (!result) {
        let row = {
          id: item.id,
          comment: item.comment,
          rating: item.rating,
          status: item.status,
          authorname: item.firstName + " " + item.lastName,
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
    setRatingsList(data);
  };

  useEffect(() => {
    initRatings();
  });

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>Reviews</Title>
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
            <TableCell>Comment</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Author Name</TableCell>
            <TableCell>Agent Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ratingsList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.comment}</TableCell>
              <TableCell>{row.rating}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.authorname}</TableCell>
              <TableCell>{row.agentname}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" component="span">
                  Publish
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
