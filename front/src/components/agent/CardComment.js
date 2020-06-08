import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Typography, Avatar, Grid } from "@material-ui/core";

const CardComment = ({ comment }) => {
  console.log(comment);
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <div className="card-comments-agent">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Remy Sharp"
              src={comment.author.avatar}
              style={{ marginRight: "10px" }}
            />
            <Typography component="p" style={{ fontWeight: "bold" }}>
              {comment.author.firstName} {comment.author.lastName}
            </Typography>
          </div>
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
