import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("facetoface");

  const [name, setName] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = () => {
      setName(name);
    };
    axios.post("http://localhost:3000/bookings", { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeTwo = (event) => {
    setName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Reservez un Rendez-Vous
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Prenez Rendez-Vous</DialogTitle>
        <DialogContent>
          {/* <UserForm /> */}

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Prénom"
            type="name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom"
            type="name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Message"
            type="name"
            fullWidth
            onChange={handleChange}
          />
          <DialogContentText>
            Que préférez-vous comme rendez-vous?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <FormControl component="fieldset">
            <FormControlLabel
              value="facetoface"
              control={<Radio />}
              label="Face à Face au Pigeon"
            />
            <FormControlLabel
              value="videoconf"
              control={<Radio />}
              label="Par Vidéo Conférence"
            />

            <Button onClick={handleSubmit} color="primary" type="submit">
              Envoyer
            </Button>
          </FormControl>
        </DialogActions>
      </Dialog>
    </div>
  );
}
