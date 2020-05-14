import axios from "axios";
import { USERS_URL } from "../../config";


function getReviews(id) {
    return axios.get(USERS_URL + `/${id}/reviews`).then((response) => response.data);
}

function createReview(review) {
    return axios
        .post(USERS_URL, review)
        .then((response) => response.status)
        .then((status) => {
            if (status === 200) {
                return true;
            }
        });
}




export default {
    getReviews,
    createReview
};