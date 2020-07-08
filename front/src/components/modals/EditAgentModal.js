import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Avatar,
} from "@material-ui/core";
import LoaderButton from "../../components/loaders/LoaderButton";

const EditAgentModal = ({
  agent,
  onChange,
  onChangeUser,
  onSubmit,
  sendEditAgentLoading,
  onHandleFileChange,
  errors,
}) => {
  const [open, setOpen] = useState(false);

  const handleModalOpenToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={{ margin: "30px 0" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleModalOpenToggle}
      >
        Editer mon profil
      </Button>
      <Dialog
        className="edit-agent-modal"
        open={open}
        onClose={handleModalOpenToggle}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Vous souhaitez éditer votre profil {agent.User.firstName} ?
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              error={errors.firstName ? true : false}
              autoFocus
              margin="dense"
              name="firstName"
              label="Prénom"
              type="text"
              fullWidth
              value={agent.User.firstName}
              onChange={onChangeUser}
              helperText={errors.firstName && errors.firstName}
            />
            <TextField
              error={errors.lastName ? true : false}
              margin="dense"
              name="lastName"
              label="Nom"
              type="text"
              fullWidth
              value={agent.User.lastName}
              onChange={onChangeUser}
              helperText={errors.lastName && errors.lastName}
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
              error={errors.email ? true : false}
              margin="dense"
              name="email"
              label="Adresse email"
              type="email"
              fullWidth
              value={agent.User.email}
              onChange={onChangeUser}
              helperText={errors.email && errors.email}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              multiline
              rowsMax={4}
              value={agent.User.description}
              onChange={onChangeUser}
              fullWidth
            />
            <TextField
              error={errors.language ? true : false}
              margin="dense"
              name="language"
              label="Votre langue"
              type="text"
              fullWidth
              value={agent.language}
              onChange={onChange}
              helperText={errors.language && errors.language}
            />
            <TextField
              error={errors.price ? true : false}
              margin="dense"
              name="price"
              label="Votre prix"
              type="text"
              fullWidth
              value={agent.price}
              onChange={onChange}
              helperText={errors.price && errors.price}
            />
            <Grid container alignItems="center">
              <Grid item xs={11}>
                <TextField
                  margin="dense"
                  name="avatar"
                  label="Avatar"
                  type="file"
                  fullWidth
                  onChange={onHandleFileChange}
                />
              </Grid>
              <Grid item xs={1}>
                <Avatar
                  alt={"Pigeon | Avatar de " + agent.User.firstName}
                  src={"http://localhost:5000/avatar/" + agent.User.avatar}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModalOpenToggle}
            color="secondary"
            variant="contained"
          >
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
    </div>
  );
};

export default EditAgentModal;
