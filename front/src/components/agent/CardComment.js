import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import ReviewsAPI from "../services/reviewsAPI";
import Rating from "@material-ui/lab/Rating";
import { Typography, Avatar, Grid, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const CardComment = ({ comment, onDelete }) => {
  const { isAuthenticated, currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await ReviewsAPI.deleteReview(comment.id);
      onDelete(true)
    } catch (error) {
      console.log(error.response)
    }
  };

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

          {comment.comment.length > 200 ? <div className="review-item"><p className="review__comment">{comment.comment.substr(0, 200)}<span id="dots">...</span><span id="more">{comment.comment.substr(61)}</span></p><Button color="primary" onClick={handleReadMore} id="read-more">Lire plus</Button></div> : <div className="review-item"><p className="review__comment">{comment.comment}</p></div>}

          {isAuthenticated && comment.authorID === currentUser.id ? <div><DeleteIcon onClick={handleDelete} /></div> : ""}
        </div>
      </Grid>
    </Grid>
  );
};

export default CardComment;
