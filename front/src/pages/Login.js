import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../components/services/authAPI";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    password: null,
    avatar: null,
  });
  const [open, setOpen] = useState(true);

  const [isSignUp, setSignUp] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSignUp = () => {
    setSignUp(true);
  };
  const handleSignIn = () => {
    setSignUp(false);
  };
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleUser = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AuthAPI.login({ login: credentials });
      setIsAuthenticated(true);
      // history.replace("/");
    } catch (error) {
      throw error.response;
    }
    setOpen(false);
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    try {
      await AuthAPI.createUser({ user: user });
    } catch (error) {
      throw error.response;
    }
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div>
      {!isSignUp ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Connectez-vous</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez introduire votre email et mot de passe.
            </DialogContentText>
            <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={credentials.email}
                onChange={handleChange}
                validators={["required", "isEmail"]}
                errorMessages={["Champ obligatoire*", "Email non valide"]}
                autoFocus
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["Champ obligatoire*"]}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Connexion
              </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleSignUp} color="primary">
              Inscrivez-vous
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          scroll="body"
        >
          ><DialogTitle id="form-dialog-title">Inscrivez-vous</DialogTitle>
          <DialogContent>
            <ValidatorForm className={classes.form} onSubmit={handleSubscribe}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="firstName"
                label="Prénom"
                name="firstName"
                autoComplete="firtName"
                value={user.firstName}
                onChange={handleUser}
                validators={["required"]}
                errorMessages={["Champ obligatoire*"]}
                autoFocus
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="lastName"
                value={user.lastName}
                onChange={handleUser}
                validators={["required"]}
                errorMessages={["Champ obligatoire*"]}
                autoFocus
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="userName"
                label="Pseudo"
                name="userName"
                autoComplete="userName"
                value={user.userName}
                onChange={handleUser}
                validators={["required"]}
                errorMessages={["Champ obligatoire*"]}
                autoFocus
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleUser}
                validators={["required", "isEmail"]}
                errorMessages={["Champ obligatoire*", "Email non valide"]}
                autoFocus
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                value={user.password}
                onChange={handleUser}
                validators={["required"]}
                errorMessages={["Champ obligatoire*"]}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Inscription
              </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleSignIn} color="primary">
              Connectez-vous
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Login;
