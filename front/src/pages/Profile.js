import React, { useEffect, useState, useContext } from "react";
// import AuthContext from "../../contexts/AuthContext";
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


    // const { isAuthenticated } = useContext(AuthContext);

    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     if (isAuthenticated) {

    //         try {

    //             await ReviewsAPI.createReview({ review: review });
    //             // fetchReviews(props.id)
    //         } catch (error) {
    //             throw error.response;
    //         }


    //     } else {
    //         alert("connectez-vous")
    //     }
    // };


    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);


    const refreshList = () => {
        fetchReviews(id)
        setCurrentItem(null);
        setCurrentIndex(-1);
    };


    return (
        <>
            <div className="card">
                <List reviews={reviews} id={id} refreshList={refreshList}/>
                <Form id={id} refreshList={refreshList} />
            </div>
        </>
    )
}