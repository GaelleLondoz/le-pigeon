import axios from "axios";
import { USER_URL, USERS_URL } from "../../config";

function getUser() {
  return axios.get(USER_URL).then((response) => response.data);
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

export default {
  getUser,
  getProfileAgent,
  getDestinationByUser,
  getRoleUser,
};
