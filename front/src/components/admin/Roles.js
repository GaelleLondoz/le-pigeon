import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
}));

export default function Roles() {
  const classes = useStyles();
  const array = [];
  const [rolesList, setRolesList] = useState(array);
  const [load, setLoad] = useState(true);

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

  useEffect(() => {
    if (load) {
      initRoles();
      setLoad(false);
    }
  });
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>Roles</Title>
            </TableCell>
            <TableCell>
              <Button variant="contained" color="primary" component="span">
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
                <Button variant="contained" color="primary" component="span">
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
