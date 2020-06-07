import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
<<<<<<< HEAD
import AssignmentIcon from "@material-ui/icons/Assignment";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PaymentIcon from "@material-ui/icons/Payment";
import PersonIcon from "@material-ui/icons/Person";
=======
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
>>>>>>> Initial commit

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
<<<<<<< HEAD
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Roles" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Bookings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <RateReviewIcon />
      </ListItemIcon>
      <ListItemText primary="Reviews" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="Paiements" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Rapports" />
=======
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
>>>>>>> Initial commit
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
<<<<<<< HEAD
    <ListSubheader inset>Rapports consolidés</ListSubheader>
=======
    <ListSubheader inset>Saved reports</ListSubheader>
>>>>>>> Initial commit
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
<<<<<<< HEAD
      <ListItemText primary="Mois" />
=======
      <ListItemText primary="Current month" />
>>>>>>> Initial commit
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
<<<<<<< HEAD
      <ListItemText primary="Trimestre" />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Vente Annuelle" />
    </ListItem> */}
=======
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
>>>>>>> Initial commit
  </div>
);
