import axios from "axios";

import { BOOKING_URL } from "../../config";

function createBooking(data) {
  return axios.post(BOOKING_URL, data).then((response) => response.data);
}

export default {
  createBooking,
};
