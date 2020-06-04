import axios from "axios";
import { USER_URL, USERS_URL } from "../../config";

async function getUser() {
    const token = window.localStorage.getItem("authToken");
    return await axios.get(USER_URL).then((response) => response.data);
}
function getProfileAgent(id) {
  return axios
    .get(USERS_URL + "/profile/agent/" + id)
    .then((response) => response.data);
}
function getDestinationByUser(id, destinationId) {
  return axios
    .get(USERS_URL + "/" + id + "/destination/" + destinationId)
    .then((response) => response.data);
}
function getRoleUser() {
  return axios.get(USERS_URL + "/me/roles").then((response) => response.data);
}
function editProfileAgent(id, data) {
  return axios
    .put(USERS_URL + "/agent/" + id, data)
    .then((response) => response.data);
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
    getProfileAgent,
    getDestinationByUser,
    getRoleUser,
    editProfileAgent,
};
