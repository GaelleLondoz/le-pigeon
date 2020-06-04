import axios from "axios";
import { API_URL } from "../../config";

function getReviews(id) {
    return axios.get(API_URL + `/reviews/agent/${id}`).then((response) => response.data);
}

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

function deleteReview(id) {
    return axios
        .delete(`/reviews/${id}`)
        .then((response) => response.status)
        .catch(e => {
            console.log(e)
        })
        // .then((status) => {
        //     if (status === 200) {
        //         return true;
        //     }
        // });
}

export default {
    getReviews,
    createReview,
    deleteReview
};