import axios from "axios";
import { USER_URL, USERS_URL } from "../../config";

async function getUser() {
    const token = window.localStorage.getItem("authToken");
    return await axios.get(USER_URL).then((response) => response.data);
}

function getUsers() {
    return axios.get(USERS_URL).then((response) => response.data);
}

function createUser(user) {
    return axios
        .post(USERS_URL, user)
        .then((response) => response.status)
        .then((status) => {
            if (status === 200) {
                return true;
            }
        });
}

/**
 * Every times refresh page, verify if a token, if a token => set request header
 */
export default {
    getUser,
    getUsers,
    createUser,
};