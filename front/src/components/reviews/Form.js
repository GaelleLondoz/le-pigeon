import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import ReviewsAPI from "../services/reviewsAPI";
import userAPI from "../services/userAPI";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

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

const ReviewForm = (props) => {

    useEffect(() => {
        fetchUser(props.id);
    }, []);

    const { isAuthenticated } = useContext(AuthContext);

    const [review, setReview] = useState({
        agentID: 0,
        authorID: 0,
        comment: "",
        rating: 0
    });

    const fetchUser = async (id) => {
        try {
            const { user } = await userAPI.getUser();

            setReview({ ...review, authorID: user.id, agentID: parseInt(id) });
        } catch (error) {
            throw error.response;
        }
    };

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ReviewsAPI.createReview({ review: review });
            props.onSubmit()
        } catch (error) {
            throw error.response;
        }
    };


    const classes = useStyles();
    return (
        <div>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div>
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
                        value={parseInt(review.rating)}
                        onChange={handleChange}

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"

                        className={classes.submit}
                    >
                        Envoyer
                        </Button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;