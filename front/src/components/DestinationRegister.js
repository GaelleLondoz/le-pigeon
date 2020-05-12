import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// commponents
import Map from "../components/Map";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


class DestinationRegister extends Component {
    
    render() {
        const classes = useStyles();
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Prénom" variant="Prénom" />
                    <TextField id="outlined-basic" label="Nom" variant="Nom" />
                    <TextField id="outlined-basic" label="Adresse email" variant="Adresse email" />
                    <TextField id="outlined-basic" label="Adresse" variant="Adresse" />
                    <TextField id="outlined-basic" label="Langue" variant="Langue" />
                    <TextField id="outlined-basic" label="Tarif" variant="ATarif" />
                    <TextField id="outlined-basic" label="Préférences" variant="Préférences" />
                </form>
                <div className="map">
                    <Map />
                </div>
                <div className="profil">
                </div>
            </div>
        )
    }
}

export default DestinationRegister;