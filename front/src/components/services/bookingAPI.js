import axios from "axios";
import { BOOKINGS_URL } from "../../config";

function getBookingsByAgent(id) {
  return axios
    .get(BOOKINGS_URL + "/agent/" + id)
    .then((response) => response.data);
}

function acceptBooking(id) {
  return axios
    .put(BOOKINGS_URL + "/" + id + "/accept")
    .then((response) => response.data);
}

function cancelBooking(id) {
  return axios
    .put(BOOKINGS_URL + "/" + id + "/cancel")
    .then((response) => response.data);
}

export default {
  getBookingsByAgent,
  acceptBooking,
  cancelBooking,
};
