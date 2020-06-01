import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import LoaderButton from "../../components/loaders/LoaderButton";

const EditAgentModal = ({
  agent,
  onChange,
  onChangeUser,
  onSubmit,
  sendEditAgentLoading,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ margin: "30px 0" }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Editer mon profil
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Vous souhaitez éditer votre profil {agent.User.firstName} ?
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstName"
              label="Prénom"
              type="text"
              fullWidth
              value={agent.User.firstName}
              onChange={onChangeUser}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Nom"
              type="text"
              fullWidth
              value={agent.User.lastName}
              onChange={onChangeUser}
            />
            <TextField
              margin="dense"
              name="userName"
              label="Pseudo"
              type="text"
              fullWidth
              value={agent.User.userName}
              onChange={onChangeUser}
            />
            <TextField
              margin="dense"
              name="email"
              label="Adresse email"
              type="email"
              fullWidth
              value={agent.User.email}
              onChange={onChangeUser}
            />
            <TextField
              margin="dense"
              name="language"
              label="Votre langue"
              type="text"
              fullWidth
              value={agent.language}
              onChange={onChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Votre prix"
              type="text"
              fullWidth
              value={agent.price}
              onChange={onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="contained">
              Annuler
            </Button>
            <LoaderButton
              text="Editer mon profil"
              onClick={onSubmit}
              loadingButton={sendEditAgentLoading}
            />
            {/* <Button
              onClick={onSubmit}
              type="submit"
              color="primary"
              variant="contained"
            >
              {sendEditAgentLoading ? (
                <CircularProgress color="#fff" size={25} />
              ) : (
                "Editer mon profil"
              )}
            </Button> */}
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default EditAgentModal;
