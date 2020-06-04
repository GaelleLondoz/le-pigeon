
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import ReviewsAPI from "../services/reviewsAPI";
import userAPI from "../services/userAPI";

// externe libraries
// moment
import 'moment/locale/fr'

// material-ui 
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { Rating } from '@material-ui/lab';

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

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

const EditReviewForm = (props) => {
    // use style from material-ui
    const classes = useStyles();

    useEffect(() => {
        fetchUser(props.id);
        setReviews(props.reviews)
    }, []);

    // check if user authenticated
    const { isAuthenticated } = useContext(AuthContext);

    // reviews
    const [review, setReview] = useState({
        agentID: 0,
        authorID: 0,
        comment: "",
        rating: 0
    });

    const [reviews, setReviews] = useState(
        []
    )

    const handleUpdate = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (isAuthenticated) {
            try {
                await ReviewsAPI.createReview({ review: review });
                props.handleRefreshList()
                props.onCreate(true)
            } catch (error) {
                throw error.response;
            }
        } else {
            alert("Connectez-vous")
        }
    };

    // user info for review
    const fetchUser = async (id) => {
        try {
            const { user } = await userAPI.getUser();
            setReview({ ...review, authorID: user.id, agentID: parseInt(id) });
        } catch (error) {
            throw error.response;
        }
    };

    return (
        <div>
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
                            value={review.comment}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            autoFocus

                        />
                        <Rating
                            name="rating"
                            value={review.rating}
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


        </div>
    );
};

export default EditReviewForm;