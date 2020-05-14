import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import List from "../components/reviews/List"
import Form from "../components/reviews/Form"


export default ({ match }) => {
    const { id } = match.params;

    const [reviews, setReviews] = useState([])

    function getReviews(id) {
        return axios.get(API_URL + `/reviews/agent/${id}`).then((response) => response.data);
    }

    useEffect(() => {
        fetchReviews(id);
    }, []);

    const fetchReviews = async (id) => {
        try {
            const reviews = await getReviews(id)
            setReviews(reviews)
        } catch (error) {
            throw error.response;
        }
    };

    return (
        <>
            <div className="card">
                <List reviews={reviews} />
                <Form />
            </div>
        </>
    )
}