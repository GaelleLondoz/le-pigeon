import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
    request => {
        // Edit request config
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        // Edit response config
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);