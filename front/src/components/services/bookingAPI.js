import axios from "axios";
import { BOOKINGS_URL } from "../../config";

function getBookingsByAgent(id) {
  return axios
    .get(BOOKINGS_URL + "/agent/" + id)
    .then((response) => response.data);
}

export default {
  getBookingsByAgent,
};
