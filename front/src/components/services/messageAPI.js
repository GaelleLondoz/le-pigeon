import axios from "axios";
import { MESSAGE_URL } from "../../config";

async function getMessages(param) {
  return await axios.get(MESSAGE_URL, param).then((response) => response.data);
}
async function addMessage(msg) {
  const message = { message: msg };
  return await axios
    .post(MESSAGE_URL, message)
    .then((response) => response.status)
    .then((status) => {
      if (status === 200) {
        return true;
      }
    });
}

async function updateMessageStatus(params) {
  let query = MESSAGE_URL + "/" + params.id + "/" + params.status;
  return await axios
    .put(query)
    .then((response) => response.status)
    .then((status) => {
      if (status === 200) {
        return true;
      }
    });
}

export default {
  getMessages,
  addMessage,
  updateMessageStatus,
};
