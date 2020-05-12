import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// components
import Map2 from "../components/Map2"
import UserInfo from "../components/UserInfo"

//scss
import "../assets/sass/_profile.scss"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// test
// function Profile() {
//   return (
//   <div>    
//       <h2>Mon Profil</h2>
//       <Map2 />
//   </div>
//   );
// }
///////////////


function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <UserInfo className="test"/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <Map2 />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}



export default Profile
