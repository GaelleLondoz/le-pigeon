import axios from "axios";
import { USERS_URL } from "../../config";


function getReviews(id) {
    console.log(USERS_URL + `/${id}/reviews`)
    return axios.get(USERS_URL + `/${id}/reviews`).then((response) => response.data);
}


getReviews()
