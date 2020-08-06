import axios from "axios";
import { API_URL } from "../../config";

function getFaqs() {
    return axios.get(API_URL + `/faqs`).then((response) => response.data);
}

function createFaq(faq) {
    return axios
        .post("/faqs", faq)
        .then((response) => response.status)
        .then((status) => {
            if (status === 200) {
                return true;
            }
        });
}

function updateFaq(id, faq) {
    return axios
        .put(`/faqs/${id}`, faq)
        .then((response) => response.status)
        .then((status) => {
            if (status === 200) {
                return true;
            }
        });
}

function deleteFaq(id) {
    return axios
        .delete(`/faqs/${id}`)
        .then((response) => response.status)
        .catch(e => {
            console.log(e)
        })
}

function getFeaturedFaqs() {
    return axios
        .get(API_URL + `/faqs-featured`)
        .then((response) => response.data);
}

function getAgentsFaqs() {
    return axios
        .get(API_URL + `/faqs-agents`)
        .then((response) => response.data);
}

function getFuturTravellersFaqs() {
    return axios
        .get(API_URL + `/faqs-futur-travellers`)
        .then((response) => response.data);
}

function getOthersFaqs() {
    return axios
        .get(API_URL + `/faqs-others`)
        .then((response) => response.data);
}

export default {
    getFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
    getFeaturedFaqs,
    getAgentsFaqs,
    getFuturTravellersFaqs,
    getOthersFaqs
};