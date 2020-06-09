import axios from "axios";
import { USERS_URL } from "../../config";

function getUsers() {
    return axios.get(USERS_URL).then((response) => response.data);
}

export default {
    getUsers
};