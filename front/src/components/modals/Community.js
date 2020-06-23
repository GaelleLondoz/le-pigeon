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
import communityAPI from "../services/communityAPI";
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
  const defaultName = "";
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

  const [user, setUser] = useState({
    firstName: defaultName,
    lastName: defaultName,
    userName: defaultName,
    email: defaultName,
    password: defaultName,
    avatar: defaultName,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await communityAPI.createCommunity({ user });
      console.log("Ok, in DB User");
      return setshowFlash(true), console.log("Show me the alert");
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleChange = (event) => {
    //Nom du champ
    const firstName = event.currentTarget.firstName;
    const value = event.currentTarget.value;
    // setValue(event.target.value);
    // setBooking({ ...booking, [name]: value });
    setUser({ ...user, [firstName]: value });
    // console.log({ value });
    // console.log(booking);
    console.log({ "First Name": firstName });
    // console.log({ User: user });
    console.log({ "C Value": value });
  };

  // const handledDateChange = (date) => {
  //   setBooking({ date: date });
  //   setUser{ date: date });
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // console.log(booking);
  // console.log("Date", booking.date);
  console.log("My Name", user);

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
          <DialogTitle id="form-dialog-title">
            Rejoignez notre superbe communauté
          </DialogTitle>

          <DialogContent>
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
            <TextField
              id="outlined-basic"
              label="Nom"
              variant="outlined"
              mx="auto"
              // defaultValue=""
              value={user.firstName}
              onChange={handleChange}
            />
            <TextField id="outlined-basic" label="Prénom" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Pays Visités"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />

            {/* <DateTimePicker
                label="DateTimePicker"
                inputVariant="outlined"
                name="date"
                value={booking.date}
                // defaultValue={defaultDate}
                // ampm={false}
                disablePast
                onChange={handledDateChange}
                format="dd-MM-yyyy hh:mm"
              /> */}
            {/* </MuiPickersUtilsProvider> */}

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
                // onChange={handleChange}
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
                <FormControlLabel
                  value="Par Vidéo Conf"
                  control={<Radio />}
                  label="Travailler chez Le Pigeon"
                />
              </RadioGroup>

              {showFlash && (
                <div className={classes.root}>
                  <Alert variant="filled" severity="success">
                    Vous faîtes partie de la Pigeon Community
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
                Envoyer !
              </Button>
            </FormControl>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
