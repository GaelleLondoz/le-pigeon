import axios from "axios";
import { REVIEWS_URL } from "../../config";

function getAvgRatings(id) {
    return axios
        .get(REVIEWS_URL + "/avgratings/agent/" + id)
        .then((response) => response.data);
}

function getCommentsByAgent(id) {
    return axios
        .get(REVIEWS_URL + "/comments/agent/" + id)
        .then((response) => response.data);
}

function getRatings() {
    return axios
        .get(REVIEWS_URL)
        .then((response) => response.data);
}

function updateReviewStatus(id, status) {
    return axios
        .put(REVIEWS_URL + "/" + id + "/" + status)
        .then((response) => response.data);
}
export default {
    getAvgRatings,
    getCommentsByAgent,
    getRatings,
    updateReviewStatus,
};