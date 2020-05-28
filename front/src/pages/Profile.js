import React, { useEffect, useState } from "react";
import ReviewsAPI from "../components/services/reviewsAPI";

// components
import Form from "../components/reviews/Form"
import List from "../components/reviews/List"

export default ({ match }) => {
    const { id } = match.params;

    // set and fetch reviews
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

    // refresh list
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handleRefreshList = () => {
        fetchReviews(id)
        setCurrentItem(null);
        setCurrentIndex(-1);
    };

    return (
        <>
            <div className="card">
                <List reviews={reviews} id={id} handleRefreshList={handleRefreshList}/>
                <Form id={id} handleRefreshList={handleRefreshList} />
            </div>
        </>
    )
}