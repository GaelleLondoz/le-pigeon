import React, { useState, Fragment } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import bookingAPI from "../services/bookingAPI";

import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const defaultDate = new Date();
  const classes = useStyles();

  const handleClick = () => {
    setOpen(true);
  };

  const [showFlash, setshowFlash] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //Solution: Retirer date de (date)
  const toMysql = () => {
    return moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  };

  const [booking, setBooking] = useState({
    date: defaultDate,
    type: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await bookingAPI.createBooking({ booking, date: toMysql(booking.date) });
      console.log("Ok, in the DB");
      // await bookingAPI.createBooking({ booking, date: booking.date });
      return setshowFlash(true), console.log("Show me the alert");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (event) => {
    //Nom du champ
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    // setValue(event.target.value);
    setBooking({ ...booking, [name]: value });
    // console.log({ value });
    // console.log(booking);
  };

  const handledDateChange = (date) => {
    setBooking({ date: date });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // console.log(booking);
  console.log("Date", booking.date);

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        onClick={handleClick}
      >
        Rejoignez la Communauté
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Prenez Rendez-Vous</DialogTitle>

          <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="DateTimePicker"
                inputVariant="outlined"
                name="date"
                value={booking.date}
                // defaultValue={defaultDate}
                // ampm={false}
                disablePast
                onChange={handledDateChange}
                format="dd-MM-yyyy hh:mm"
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="standard-full-width"
              label="Message"
              style={{ margin: 8 }}
              placeholder="Dites nous tout"
              helperText=""
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <DialogContentText>
              Que préférez-vous comme rendez-vous?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Communication"
                name="type"
                defaultValue=""
                // value={booking.type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Face à Face"
                  control={<Radio />}
                  label="Face à Face"
                />
                <FormControlLabel
                  value="Par Vidéo Conf"
                  control={<Radio />}
                  label="Par Vidéo Conf"
                />
              </RadioGroup>

              {showFlash && (
                <div className={classes.root}>
                  <Alert variant="filled" severity="success">
                    Votre Rendez-Vous est booké !
                  </Alert>
                </div>
              )}

              {/* Retirer Boutton après le flash */}
              <Button
                color="primary"
                type="submit"
                variant="outlined"
                onClick={handleSubmit}
              >
                Book now !
              </Button>
            </FormControl>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
