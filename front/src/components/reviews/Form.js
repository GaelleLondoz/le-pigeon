import React, { useState, useContext } from "react";

import ReviewsAPI from "../services/reviewsAPI";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import TextField from '@material-ui/core/TextField';


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

const ReviewForm = ({ history }) => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [user, setUser] = useState({
        firstName: null,
        lastName: null,
        userName: null,
        email: null,
        password: null,
        avatar: null,
    });

    // const handleChange = (event) => {
    //     const value = event.currentTarget.value;
    //     const name = event.currentTarget.name;
    //     setCredentials({ ...credentials, [name]: value });
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ReviewsAPI.createReview({ user: user });
        } catch (error) {
            throw error.response;
        }
    };

    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="review"
                        label="Review"
                        name="review"
                        autoComplete="review"
                        value={credentials.email}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        validators={["required", "isEmail"]}
                        errorMessages={["Champ obligatoire*", "Email non valide"]}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
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