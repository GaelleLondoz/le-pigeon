import axios from "axios";
import { MESSAGES_URL } from "../../config";

function getAllMessageByUser(id) {
  return axios
    .get(MESSAGES_URL + "/users/" + id)
    .then((response) => response.data);
}
function changeMessageStatus(id, status) {
  return axios
    .put(MESSAGES_URL + "/" + id + "/changestatus", status)
    .then((response) => response.data);
}

export default {
  getAllMessageByUser,
  changeMessageStatus,
};
