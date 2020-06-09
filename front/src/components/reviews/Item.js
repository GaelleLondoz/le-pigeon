import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import userAPI from "../services/userAPI";
import ReviewsAPI from "../services/reviewsAPI";

// external libraries
// moment
import moment from "moment";
import 'moment/locale/fr'

// material-ui 
import { Rating } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, Avatar, Grid, Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

// custom style
import "../../assets/sass/components/review.scss";

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }, root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

export default (props) => {
    // config dialog state open / close
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        // open Dialog
        setOpen(true);
    };
    const handleClose = () => {
        // close dialog
        setOpen(false);
    };

    // style from material-ui
    const classes = useStyles();

    // reviews
    const [review, setReview] = useState(props.review);
    const [reviewUpdated, setReviewUpdated] = useState(review);

    const handleChange = (event) => {
        let value = event.currentTarget.value;
        const name = event.currentTarget.name;
        // transform rating to int
        if (name === "rating") {
            value = parseInt(value)
        }
        // set review updated
        setReviewUpdated({ ...reviewUpdated, [name]: value });
    };

    // action update item
    const handleUpdate = async (event) => {
        event.preventDefault()
        // update review from reviewUpdated
        setReview(reviewUpdated);
        await ReviewsAPI.updateReview(review.id, reviewUpdated)

        // refresh list
        props.handleRefreshList();

        // close dialog
        setOpen(false);
    };


    // check if user authenticated
    const { isAuthenticated } = useContext(AuthContext);

    // user
    useEffect(() => {
        fetchUser(props.id);
    }, []);

    const [user, setUser] = useState({
        id: null
    });

    const fetchUser = async (id) => {
        try {
            const { user } = await userAPI.getUser();
            setUser({ ...user, id: user.id });
        } catch (error) {
            throw error.response;
        }
    };

    // action delete item
    const handleDelete = async () => {
        try {
            // check if last review and last of page from pagination -- go back to preview page
            let indexReview = props.reviews.reverse().indexOf(review) + 1
            let reviewsLength = props.reviews.length

            if ((indexReview === reviewsLength) || ((indexReview === 0) && (indexReview < reviewsLength))) {
                props.onDelete(true, true)
            } else {
                props.onDelete(true, false)
            }

            // delete from database
            await ReviewsAPI.deleteReview(review.id);

            // refresh list
            props.handleRefreshList()
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

        <li className="review-item">

            <div className="review-item__top">
                <div className="review-item__top-left">
                    <Avatar
                        alt={`${review.author.firstName} | agent le pigeon`}
                        src={review.author.avatar}
                    />

                    <div className="review-item__top-text">
                        <div className="review-item__user-info">
                            <p>{review.author.firstName} {review.author.lastName}</p>
                        </div>
                        <p>{moment(review.createdAt).local('fr').format('LL')}</p>
                    </div>
                </div>
                <div className="review__rating">
                    <Rating
                        name="rating"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                    />
                </div>
            </div>
            {review.comment.length > 200 ? <div className="review-item__bottom"><p className="review__comment">{review.comment.substr(0, 200)}<span id="dots">...</span><span id="more">{review.comment.substr(61)}</span></p><Button color="primary" onClick={handleReadMore} id="read-more">Lire plus</Button></div> : <div className="review-item__bottom"><p className="review__comment">{review.comment}</p></div>}

            {isAuthenticated && review.author.id === user.id ? <div><DeleteIcon onClick={handleDelete} /><EditIcon onClick={handleOpen} /></div> : ""}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Éditer</DialogTitle>
                <DialogContent>
                    <form className={classes.form} onSubmit={handleUpdate}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="review"
                                label="Review"
                                name="comment"
                                autoComplete="review"
                                value={reviewUpdated.comment}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                autoFocus
                            />
                            <Rating
                                name="rating"
                                value={parseInt(reviewUpdated.rating)}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"

                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >Mettre à jour</Button>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Annuler</Button>
                </DialogActions>
            </Dialog>

        </li >

    )
}