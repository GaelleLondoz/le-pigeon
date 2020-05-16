import axios from "axios";
import { USER_DESTINATIONS_URL } from "../../config";

function getAllDestinationsByUser(id) {
  return axios
    .get(USER_DESTINATIONS_URL + "/users/" + id)
    .then((response) => response.data);
}
function create(data) {
  return axios
    .post(USER_DESTINATIONS_URL + "/new", data)
    .then((response) => response.data);
}

export default {
  getAllDestinationsByUser,
  create,
};
