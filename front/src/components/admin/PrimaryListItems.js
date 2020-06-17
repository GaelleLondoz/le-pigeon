import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PaymentIcon from "@material-ui/icons/Payment";
import PersonIcon from "@material-ui/icons/Person";

export default function PrimaryListItems(props) {
  return (
    <div>
      <ListItem
        button
        onClick={(event) => props.handleClick({ selection: "dashboard" })}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        onClick={(event) => props.handleClick({ selection: "users" })}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem
        button
        onClick={(event) => props.handleClick({ selection: "bookings" })}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings" />
      </ListItem>
      <ListItem
        button
        onClick={(event) => props.handleClick({ selection: "reviews" })}
      >
        <ListItemIcon>
          <RateReviewIcon />
        </ListItemIcon>
        <ListItemText primary="Reviews" />
      </ListItem>
      <ListItem
        button
        onClick={(event) => props.handleClick({ selection: "roles" })}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItem>
      <ListItem
        button
        onClick={(event) => props.handleClick({ selection: "paiements" })}
      >
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary="Payments" />
      </ListItem>
      <ListItem
        button
        onClick={(event) => props.handleClick({ selection: "rapports" })}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reporting" />
      </ListItem>
    </div>
  );
}
