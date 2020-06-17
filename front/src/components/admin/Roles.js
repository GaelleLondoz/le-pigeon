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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import roleAPI from "../services/roleAPI";

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

export default function Roles() {
  const classes = useStyles();
  const array = [];
  const [rolesList, setRolesList] = useState(array);
  const [load, setLoad] = useState(true);
  const [exist, setExist] = useState(false);
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [role, setRole] = useState("");

  const initRoles = async () => {
    let data = [];
    const roles = await roleAPI.getRoles();
    const entries = roles.entries();
    for (const [i, item] of entries) {
      let row = {
        id: item.id,
        name: item.name,
      };
      data.push(row);
    }
    setRolesList(data);
  };

  const alertBox = (event, row) => {
    setOpen(true);
    setCurrentRow(row);
  };
  const addDialog = (event) => {
    setAdd(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAdd(false);
    setExist(false);
  };
  const handleDelete = async () => {
    await roleAPI.deleteRole(currentRow.id);
    setLoad(true);
    setOpen(false);
  };

  const handleRole = (event) => {
    const value = event.currentTarget.value;
    setRole(value);
  };

  const handleSubmit = async (event) => {
    let data = {
      name: role,
    };

    const result = rolesList.find((row) => row.name == role);
    if (result) {
      setExist(true);
    } else {
      try {
        await roleAPI.addRole(data);
      } catch (error) {
        throw error.response;
      }
      setLoad(true);
      setAdd(false);
    }
  };
  useEffect(() => {
    if (load) {
      initRoles();
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
            {"Do you want to permanently delete " + currentRow.name + "?"}
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
      {add && (
        <Dialog
          open={add}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          scroll="body"
        >
          <DialogTitle id="form-dialog-title">Add new role</DialogTitle>
          <DialogContent>
            <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="role"
                label="Role Name"
                name="role"
                autoComplete="name"
                onChange={handleRole}
                //validators={["required"]}
                errorMessages={["Required field*"]}
                autoFocus
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
      {exist && (
        <Dialog
          open={exist}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {role + " already exists"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>Roles</Title>
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
            <TableCell>ID</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rolesList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>

              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={(event) => alertBox(event, row)}
                >
                  Delete
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
