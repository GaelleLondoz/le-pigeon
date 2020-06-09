import axios from "axios";

function createReview(review) {

    return axios
        .post("/reviews", review)
        .then((response) => response.status)
        .then((status) => {
            if (status === 200) {
                return true;
            }
        });
}

export default {
    createReview
};