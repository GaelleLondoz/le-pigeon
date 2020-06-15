import axios from "axios";
import { ROLES_URL } from "../../config";

async function getRoles(param) {
    return await axios.get(ROLES_URL, param).then((response) => response.data);
}
async function addRole(data) {
    const role = { role: data };
    return await axios
        .post(ROLES_URL, role)
        .then((response) => response.status)
        .then((status) => {
            if (status === 200) {
                return true;
            }
        });
}

async function updateRoleName(params) {
    let query = ROLES_URL + "/" + params.id + "/" + params.name;
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
    getRoles,
    addRole,
    updateRoleName,
};