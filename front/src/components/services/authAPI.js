import axios from "axios";
import jwtDecode from "jwt-decode";
import { AUTH_URL, LOGOUT_URL } from "../../config";

function login(credentials) {
    return axios
        .post(AUTH_URL, credentials)
        .then((response) => response.data)
        .then((data) => {
            window.localStorage.setItem("authToken", data.token);
            //Set Axios with this token
            setAxiosToken(data.token);
            return data.user;
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
    console.log("GENERAL - IS AUTHENTICATED");
    if (token) {
        console.log("TOKEN - IS AUTHENTICATED");
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            console.log("TRUE - IS AUTHENTICATED");
            return true;
        } else {
            console.log("FALSE - IS AUTHENTICATED");
            window.localStorage.removeItem("authToken");
            return false;
        }
    }
}

export default {
    login,
    isAuthenticated,
    setup,
    logout,
};