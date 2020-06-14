import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import userAPI from "../services/userAPI";

const rows = [];
//Retrieve users
async function initUsers() {
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
    rows.push(row);
  }
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

//Retrieve users from database
initUsers();
//End Retrieve
export default function Users() {
  const classes = useStyles();

  console.log({ rows: rows });
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>Users</Title>
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
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Agent</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.isAgent ? "Y" : "N"}</TableCell>
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
