import axios from "axios";
import jwtDecode from "jwt-decode";
import { AUTH_URL, LOGOUT_URL, USERS_URL } from "../../config";

function login(credentials) {
    return axios
        .post(AUTH_URL, credentials)
        .then((response) => response.data.token)
        .then((token) => {
            window.localStorage.setItem("authToken", token);
            //Set Axios with this token
            setAxiosToken(token);
        });
}

function logout() {
    // Warn back end to disconnect user
    axios
        .post(LOGOUT_URL, {})
        .then((response) => response.status)
        .then((status) => {
            if (status === 200) {
                // Delete token
                window.localStorage.removeItem("authToken");
            }
        });
}

/**
 * Set Axios with token
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = token;
}

/**
 * Every times refresh page, verify if a token, if a token => set Axios
 */
function setup() {
    //Verify if token
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const jwtData = jwtDecode(token);
        //Set Axios with this token
        setAxiosToken(token);
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        return true;
    }
    return false;
}

function createUser(user) {
    return axios
        .post(USERS_URL, user)
        .then((response) => response.status)
        .then((status) => {
            if (status === 200) {
                return true;
            }
        });
}
export default {
    login,
    isAuthenticated,
    setup,
    logout,
    createUser,
};