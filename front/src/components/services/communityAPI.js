import axios from "axios";

import { USERS_URL } from "../../config";

function createCommunity(data) {
  return axios.post(USERS_URL, data).then((response) => response.data);
}

export default {
  createCommunity,
};
