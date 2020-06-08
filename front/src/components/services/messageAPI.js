import axios from "axios";
import { MESSAGES_URL } from "../../config";

async function getMessages(param) {
  return await axios.get(MESSAGES_URL, param).then((response) => response.data);
}
async function addMessage(msg) {
  const message = { message: msg };
  return await axios
    .post(MESSAGES_URL, message)
    .then((response) => response.status)
    .then((status) => {
      if (status === 200) {
        return true;
      }
    });
}

async function updateMessageStatus(params) {
  let query = MESSAGES_URL + "/" + params.id + "/" + params.status;
  return await axios
    .put(query)
    .then((response) => response.status)
    .then((status) => {
      if (status === 200) {
        return true;
      }
    });
}

function getAllMessageByUser(id) {
  return axios
    .get(MESSAGES_URL + "/users/" + id)
    .then((response) => response.data);
}
function changeMessageStatus(id, status) {
  return axios
    .put(MESSAGES_URL + "/" + id + "/changestatus/" + status)
    .then((response) => response.data);
}
function create(id, message) {
  return axios
    .post(MESSAGES_URL + "/" + id, message)
    .then((response) => response.data);
}

export default {
  getAllMessageByUser,
  changeMessageStatus,
  addMessage,
  getMessages,
  updateMessageStatus,
  create,
};
