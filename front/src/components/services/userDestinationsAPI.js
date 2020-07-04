import axios from "axios";
import { USER_DESTINATIONS_URL, API_URL } from "../../config";

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
function getAllPicturesByDestination(id, destinationId) {
  return axios
    .get(
      USER_DESTINATIONS_URL +
      "/users/" +
      id +
      "/destination/" +
      destinationId +
      "/pictures"
    )
    .then((response) => response.data);
}

function getAllDestinationsByUsers() {
  return axios.get(USER_DESTINATIONS_URL).then((response) => response.data);
}

<<<<<<< HEAD
=======
function getProxyDestinations(lat, lng) {
  return axios.get(API_URL + "/proxy-destinations/" + lat + "/" + lng).then((response) => response.data);
}

>>>>>>> 45c2cb6618fa1971dfa88ae89fff64139a330b92
export default {
  getAllDestinationsByUser,
  create,
  getAllPicturesByDestination,
  getAllDestinationsByUsers,
<<<<<<< HEAD
=======
  getProxyDestinations
>>>>>>> 45c2cb6618fa1971dfa88ae89fff64139a330b92
};
