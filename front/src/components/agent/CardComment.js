import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Typography, Avatar, Grid } from "@material-ui/core";

const CardComment = ({ comment }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <div className="card-comments-agent">
          <Avatar alt="Remy Sharp" src={comment.author.avatar} />
          <Rating
            name="rating"
            value={comment.rating}
            readOnly
            precision={0.5}
          />
          <Typography component="p">{comment.comment}</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default CardComment;
