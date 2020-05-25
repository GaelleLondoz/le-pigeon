import React, { useEffect, useState } from "react";
import ReviewsAPI from "../components/services/reviewsAPI";

import Form from "../components/reviews/Form"
import List from "../components/reviews/List"



export default ({ match }) => {
    const { id } = match.params;

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetchReviews(id);
    }, []);

    const fetchReviews = async (id) => {
        try {
            const reviews = await ReviewsAPI.getReviews(id)
            setReviews(reviews)

        } catch (error) {
            throw error.response;
        }
    };






    return (
        <>
            <div className="card">
                <List reviews={reviews} id={id} />
                <Form id={id} reviews={reviews} />
            </div>
        </>
    )
}