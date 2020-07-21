import axios from "axios";
import { USER_DESTINATIONS_URL, API_URL, USERS_URL } from "../../config";

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

function getProxyDestinations(lat, lng) {
  return axios
    .get(API_URL + "/proxy-destinations/" + lat + "/" + lng)
    .then((response) => response.data);
}
function getAgentsByDestAndType(type, lat, lng) {
  return axios
    .get(
      USERS_URL +
        "/search/agents?" +
        "type=" +
        type +
        "&lat=" +
        lat +
        "&lng=" +
        lng
    )
    .then((response) => response.data);
}

function getDestinationTypes() {
  return axios
    .get(USER_DESTINATIONS_URL + "/types/")
    .then((response) => response.data);
}

export default {
  getAllDestinationsByUser,
  create,
  getAllPicturesByDestination,
  getAllDestinationsByUsers,
  getProxyDestinations,
  getAgentsByDestAndType,
  getDestinationTypes,
};
