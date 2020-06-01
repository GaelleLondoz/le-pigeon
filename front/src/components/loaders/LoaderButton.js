import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loaderButton: {
    color: "#fff",
  },
}));

const LoaderButton = ({
  colorButton = "primary",
  loadingButton,
  size = 25,
  text = "",
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant="contained"
      color={colorButton}
    >
      {loadingButton ? (
        <CircularProgress color={classes.loaderButton} size={size} />
      ) : (
        text
      )}
    </Button>
  );
};

export default LoaderButton;
