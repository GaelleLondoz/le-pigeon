import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import userAPI from "../services/userAPI";
import ReviewsAPI from "../services/reviewsAPI";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import ReadMoreReact from 'read-more-react';






// externe libraries
// moment
import moment from "moment";
import 'moment/locale/fr'

// material-ui 
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Rating } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// custom style
import "../../assets/sass/components/review.scss";


const useStyles = makeStyles((theme) => ({
    form: {
        width: "50%", // Fix IE 11 issue.
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

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        props.onUpdate(false)
    };
    const handleClose = () => {
        setOpen(false);
        props.onUpdate(true)
    };

    const classes = useStyles();





    // reviews
    const [review, setReview] = useState(props.review);
    const [reviewUp, setReviewUp] = useState(review);

    // let [readMoreParams, setReadMoreParams] = useState({
    //     text: review.comment,
    //     minimumLength: 5,
    //     idealLength: 10,
    //     maxLength: 15,
    //     readMoreText: "... Plus"
    // })
    const handleChange = (event) => {
        let value = event.currentTarget.value;
        const name = event.currentTarget.name;
        if (name === "rating") { value = parseInt(value) }
        console.log({ name })
        console.log({ value })
        setReviewUp({ ...reviewUp, [name]: value });


    };

    const handleUpdate = async (event) => {
        console.log(reviewUp)
        event.preventDefault()
        setReview(reviewUp);
        await ReviewsAPI.updateReview(review.id, reviewUp)
        // .then(response => {


        props.handleRefreshList();
        // setReadMoreParams({ text: reviewUp.comment })


        setOpen(false);
        props.onUpdate(true)

        // })
        // .catch(e => {
        //     console.log(e);
        // });
    };


    // check if user authenticated
    const { isAuthenticated } = useContext(AuthContext);

    // init state for alert notification
    const [displayFlash, setDisplayFlash] = useState(false);


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


    window.onclick = function (event) {
        if (event.target.className == 'more') {
            event.preventDefault();
            event.target.parentElement.parentElement.classList.toggle('showAll');

        }
    }


    // action delete item
    const handleDelete = async () => {

        try {
            props.reviews.reverse().indexOf(review) + 1 === (props.reviews.length) ? props.onDelete(true, true) : props.onDelete(true, false)
            await ReviewsAPI.deleteReview(review.id);
            props.handleRefreshList()
        } catch (error) {
            console.log(error.response)
        }
    };



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
                        name="hover-feedback"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                    />
                </div>
            </div>
            <div className="review-item__bottom">

                {/* <p className="toggledText" id={"shrinkMe" + props.reviews.reverse().indexOf(review)}>{review.comment} </p> */}

                <p>{review.comment.substr(0, 60)}</p>
                <p>{review.comment.substr(61)}</p>

            </div>
            {isAuthenticated && review.author.id === user.id ? <div><DeleteIcon onClick={handleDelete} /><EditIcon onClick={handleOpen} /></div> : ""}



            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>

                    <form className={classes.form} onSubmit={handleUpdate}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="review"
                            label="Review"
                            name="comment"
                            autoComplete="review"
                            value={reviewUp.comment}
                            onChange={handleChange}

                            multiline
                            rows={4}
                            autoFocus

                        />
                        <Rating
                            name="rating"
                            value={parseInt(reviewUp.rating)}
                            onChange={handleChange}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                            className={classes.submit}
                        >
                            Update
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
            </Button>

                </DialogActions>
            </Dialog>

        </li>

    )
}