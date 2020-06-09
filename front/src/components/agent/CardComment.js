import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import ReviewsAPI from "../services/reviewsAPI";
import Rating from "@material-ui/lab/Rating";
import { Typography, Avatar, Grid } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const CardComment = ({ comment, handleRefreshList }) => {
  console.log(comment);
  // check if user authenticated
  const { isAuthenticated, currentUser } = useContext(AuthContext);

  // action delete item
  const handleDelete = async () => {
    try {
      // // check if last review and last of page from pagination -- go back to preview page
      // let indexReview = props.reviews.reverse().indexOf(review) + 1
      // let reviewsLength = props.reviews.length

      // if ((indexReview === reviewsLength) || ((indexReview === 0) && (indexReview < reviewsLength))) {
      //   props.onDelete(true, true)
      // } else {
      //   props.onDelete(true, false)
      // }

      // delete from database
      await ReviewsAPI.deleteReview(comment.id);

      // refresh list
      handleRefreshList()
    } catch (error) {
      console.log(error.response)
    }
  };

  // action read more if long review
  const handleReadMore = () => {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("read-more");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = 'Lire plus';
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = 'Lire moins';
      moreText.style.display = "inline";
    }
  }
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
          {console.log({ isAuthenticated })}
          {console.log({ check: comment.authorID === currentUser.id, "comment.authorID": comment.authorID, id: currentUser.id })}
          {isAuthenticated && comment.authorID === currentUser.id ? <div><DeleteIcon onClick={handleDelete} /></div> : ""}
        </div>
      </Grid>
    </Grid>
  );
};

export default CardComment;
