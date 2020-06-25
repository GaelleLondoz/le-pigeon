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
async function getBookings() {
  const token = window.localStorage.getItem("authToken");
  return await axios.get(BOOKINGS_URL).then((response) => response.data);
}
function getBookingsByUser(id) {
  return axios
    .get(BOOKINGS_URL + "/user/" + id)
    .then((response) => response.data);
}
function deleteBooking(id) {
  return axios
    .delete(BOOKINGS_URL + `/${id}`)
    .then((response) => response.data);
}
function updateBookingDate(id, data) {
  return axios
    .put(BOOKINGS_URL + "/" + id + "/update", data)
    .then((response) => response.data);
}
function createBooking(data) {
  return axios.post(BOOKINGS_URL, data).then((response) => response.data);
}

export default {
  getBookingsByAgent,
  acceptBooking,
  cancelBooking,
  getBookings,
  getBookingsByUser,
  deleteBooking,
  updateBookingDate,
  createBooking
};
