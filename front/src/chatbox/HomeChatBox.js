import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2)
    }
  }
}));

export default function HomeChatBox() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <Box display="flex" justifyContent="center" bgcolor="background.paper">
          <img
            alt=""
            src="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-512.png"
          />
        </Box>
      </React.Fragment>
    </div>
  );
}
