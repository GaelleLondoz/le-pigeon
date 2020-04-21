import axios from "axios";
import { USER_URL } from "../../config";

function getUser() {
  return axios.get(USER_URL).then((response) => response.data);
}

export default {
  getUser,
};
