import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import reviewAPI from "../services/reviewAPI";
import reviewsAPI from "../services/reviewsAPI";

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
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});

  const initRatings = async () => {
    let data = [];
    const ratings = await reviewAPI.getRatings();
    const entries = ratings.entries();
    for (const [i, item] of entries) {
      const result = data.find((row) => row.id == item.id);
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

  const alertBox = (event, row) => {
    setOpen(true);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePublish = async () => {
    console.log({ ROW: currentRow });
    try {
      await reviewAPI.updateReviewStatus(currentRow.id, "PUBLISHED");
    } catch (error) {
      throw error.response;
    }

    setLoad(true);
    setOpen(false);
  };

  useEffect(() => {
    if (load) {
      initRatings();
      setLoad(false);
    }
  });

  return (
    <React.Fragment>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to publish rewiew from " +
              currentRow.authorname +
              "?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handlePublish} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>Reviews</Title>
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
                {row.status === "PUBLISHED" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    disabled={true}
                  >
                    Published
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={(event) => alertBox(event, row)}
                  >
                    Publish
                  </Button>
                )}
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
