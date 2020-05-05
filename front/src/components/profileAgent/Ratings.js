import React from "react";
import Rating from "@material-ui/lab/Rating";

const Ratings = ({ value }) => {
  return <Rating name="simple-controlled" value={value} />;
};

export default Ratings;
