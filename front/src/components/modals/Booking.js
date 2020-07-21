import React, { useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import bookingAPI from "../services/bookingAPI";

import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AuthContext from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FormDialog({ agentID }) {
  console.log({ AGENTID: agentID });
  const { isAuthenticated, currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const defaultDate = new Date();
  const classes = useStyles();
  const status = "Accepted";

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
    agentID: null,
    comment: "",
    hours: null,
  });
  const [errors, setErrors] = useState({
    date: "",
    type: "",
    hours: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // await bookingAPI.createBooking({
      //   booking,
      //   date: toMysql(booking.date),
      //   agentID: 1,
      // });
      setErrors({});
      console.log({
        TOSENDPOINT: {
          ...booking,
          date: toMysql(booking.date),
        },
      });
      console.log({
        TOSEND: {
          booking,
          date: toMysql(booking.date),
        },
      });
      await bookingAPI.createBooking(agentID, {
        booking,
        date: toMysql(booking.date),
      });
      //console.log("Ok, in the DB");
      // await bookingAPI.createBooking({ booking, date: booking.date });
      setshowFlash(!showFlash);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      const { errors } = error.response.data;
      if (errors) {
        const apiErrors = {};
        errors.forEach((error) => {
          apiErrors[error.target] = error.msg;
        });
        setErrors(apiErrors);
      }
      console.log(error.response);
    }
  };

  const handleChange = (event) => {
    //Nom du champ
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setBooking({ ...booking, [name]: value });
  };

  const handledDateChange = (date) => {
    setBooking({ ...booking, date: date });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log({ NEWBOOKING: booking });
  return (
    <div>
      {isAuthenticated && parseInt(currentUser.id) !== parseInt(agentID) ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
          onClick={handleClick}
        >
          Reservez un Rendez-Vous
        </Button>
      ) : isAuthenticated && parseInt(currentUser.id) === parseInt(agentID) ? (
        <>
          <Button variant="contained" color="secondary" disabled>
            Reservez un Rendez-Vous
          </Button>
          <p style={{ fontSize: "1.1rem" }}>
            Impossible de réserver un rendez-vous avec vous même !
          </p>
        </>
      ) : (
        <p style={{ color: "#009fb7" }}>
          Vous souhaitez réserver ?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#f72564" }}
          >
            Connectez-vous !
          </Link>
        </p>
      )}
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
                style={{ marginBottom: "15px" }}
                fullWidth
                label="DateTimePicker"
                inputVariant="outlined"
                name="date"
                value={booking.date}
                // defaultValue={defaultDate}
                // ampm={false}
                disablePast
                onChange={handledDateChange}
                format="dd-MM-yyyy hh:mm"
                error={errors.date ? true : false}
                helperText={errors.date && errors.date}
              />
            </MuiPickersUtilsProvider>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Nombre d'heure(s)
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                value={booking.hours}
                onChange={handleChange}
                label="Nombre d'heure(s)"
                name="hours"
                error={errors.hours ? true : false}
                onChange={(e) =>
                  setBooking({
                    ...booking,
                    hours: e.target.value,
                  })
                }
              >
                {Array.from(Array(24), (e, i) => {
                  return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                })}
              </Select>
              <FormHelperText>{errors.hours && errors.hours}</FormHelperText>
            </FormControl>
            <TextField
              label="Votre commentaire"
              style={{ margin: 8 }}
              placeholder="Vous souhaitez ajouter une remarque ?"
              helperText=""
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="comment"
              multiline
              onChange={handleChange}
            />

            <DialogContentText>
              Que préférez-vous comme rendez-vous?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <FormControl
              component="fieldset"
              error={errors.type ? true : false}
              he
            >
              <RadioGroup
                aria-label="Communication"
                name="type"
                defaultValue=""
                // value={booking.type}
                //onChange={handleChange}
                onChange={(e) => {
                  setBooking({ ...booking, type: e.target.value });
                }}
              >
                <FormControlLabel
                  value="Face à Face"
                  control={<Radio />}
                  label="Face à Face"
                />
                <FormControlLabel
                  value="Par Vidéo Conférence"
                  control={<Radio />}
                  label="Par Vidéo Conférence"
                />
              </RadioGroup>
              {errors.type && <FormHelperText>{errors.type}</FormHelperText>}

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
