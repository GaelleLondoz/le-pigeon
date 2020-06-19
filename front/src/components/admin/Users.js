import React, { useState, useEffect, useContext } from "react";
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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import userAPI from "../services/userAPI";
import AuthContext from "../../contexts/AuthContext";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
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

export default function Users() {
  const classes = useStyles();
  const array = [];
  const [usersList, setUsersList] = useState(array);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const initUsers = async () => {
    let data = [];
    const users = await userAPI.getUsers();
    const entries = users.entries();
    for (const [i, item] of entries) {
      let row = {
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        username: item.userName,
        email: item.email,
        isAgent: item.isAgent,
      };
      try {
        const { Role } = await userAPI.getRoleByUserID(row.id);
        row.role = Role.name;
      } catch (error) {
        throw error.response;
      }
      data.push(row);
    }
    setUsersList(data);
  };
  const alertBox = (event, row, status) => {
    switch (status) {
      case "DELETE":
        setOpen(true);
        break;
      case "ADMIN":
        setAdmin(true);
    }
    setCurrentRow(row);
  };
  const addDialog = (event) => {
    setAdd(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAdd(false);
    setAdmin(false);
  };
  const handleDelete = async () => {
    await userAPI.deleteUser(currentRow.id);
    setLoad(true);
    setOpen(false);
  };

  const handleUser = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setUser({ ...user, [name]: value });
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    try {
      await userAPI.createUser({ user: user });
    } catch (error) {
      throw error.response;
    }
    setLoad(true);
    setAdd(false);
  };

  const handleAdmin = async (event) => {
    try {
      await userAPI.setRoleAdminByUserID(currentRow.id);
    } catch (error) {
      throw error.response;
    }
    setLoad(true);
    setAdmin(false);
  };
  useEffect(() => {
    if (load) {
      initUsers();
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
            {"Do you want to permanently delete user " +
              currentRow.username +
              "?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {admin && (
        <Dialog
          open={admin}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to permanently set " +
              currentRow.username +
              " as ADMINISTRATOR?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAdmin} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {add && (
        <Dialog
          open={add}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          scroll="body"
        >
          <DialogTitle id="form-dialog-title">Add new user</DialogTitle>
          <DialogContent>
            <ValidatorForm className={classes.form} onSubmit={handleSubscribe}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firtName"
                value={user.firstName}
                onChange={handleUser}
                validators={["required"]}
                errorMessages={["Required field*"]}
                autoFocus
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={user.lastName}
                onChange={handleUser}
                validators={["required"]}
                errorMessages={["Required field*"]}
                autoFocus
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                value={user.userName}
                onChange={handleUser}
                validators={["required"]}
                errorMessages={["Required field*"]}
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
                errorMessages={["Required field*", "No valid email"]}
                autoFocus
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={user.password}
                onChange={handleUser}
                validators={["required"]}
                errorMessages={["Required field*"]}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      )}

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>Users</Title>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={(event) => addDialog(event)}
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Agent</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.isAgent ? "Y" : "N"}</TableCell>
              <TableCell align="right">
                {currentUser.id === row.id ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    disabled={true}
                  >
                    Connect
                  </Button>
                ) : row.role === "ROLE_ADMIN" ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    disabled={true}
                  >
                    Admin
                  </Button>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      onClick={(event) => alertBox(event, row, "DELETE")}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      component="span"
                      onClick={(event) => alertBox(event, row, "ADMIN")}
                    >
                      Admin
                    </Button>
                  </div>
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
