import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import ReviewsAPI from "../services/reviewsAPI";
import userAPI from "../services/userAPI";

// externe libraries
// moment
import 'moment/locale/fr'

// material-ui 
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { Rating } from '@material-ui/lab';
import { Grid, Box, DialogActions, DialogContent, DialogTitle, Dialog, Button } from "@material-ui/core";
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


const ReviewForm = (props) => {
    // use style from material-ui
    const classes = useStyles();

    // fetch user and reviews
    useEffect(() => {
        fetchUser(props.id);
        setReviews(props.reviews)
    }, []);

    // check if user authenticated
    const { isAuthenticated } = useContext(AuthContext);

    // reviews
    const [reviews, setReviews] = useState(
        []
    )

    // review
    const [review, setReview] = useState({
        agentID: 0,
        authorID: 0,
        comment: "",
        rating: 0
    });

    // user info for review
    const fetchUser = async (id) => {
        try {
            const { user } = await userAPI.getUser();
            setReview({ ...review, authorID: user.id, agentID: parseInt(id) });
        } catch (error) {
            throw error.response;
        }
    };

    // config dialog state open / close
    const { open } = props
    const handleOpenFormCreate = (status) => {
        props.onOpen(status)
    }

    const handleClose = () => {
        // close dialog
        handleOpenFormCreate(false)
    };

    // action update item
    const handleUpdate = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setReview({ ...review, [name]: value });
    };

    // action submit item
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (isAuthenticated) {
            try {
                await ReviewsAPI.createReview({ review: review });
                props.handleRefreshList()
                props.onCreate(true)
                setReview({
                    agentID: review.agentID,
                    authorID: review.authorID,
                    comment: "",
                    rating: 0
                })
                handleClose()
            } catch (error) {
                throw error.response;
            }
        } else {
            alert("Connectez-vous")
        }
    };



    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Donner votre avis</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>

                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Rating
                                name="rating"
                                value={parseInt(review.rating)}
                                onChange={handleUpdate}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="review"
                                label="Partagez votre opinion"
                                name="comment"
                                autoComplete="review"
                                value={review.comment}
                                onChange={handleUpdate}
                                multiline
                                rows={4}
                                autoFocus
                            />

                            <Box alignSelf="flex-end">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}

                                >
                                    Partager
                        </Button>
                            </Box>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Annuler</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReviewForm;