import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Flash({ status = "", text = "" }) {

  const classes = useStyles();
  console.log({ status })
  return (
    <div className={classes.root}>
      <Alert variant="filled" severity={status}>
        {text}
      </Alert>
    </div>
  );
}