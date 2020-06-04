import React, { useEffect, useState } from "react";
import ReviewsAPI from "../components/services/reviewsAPI";

// components

import Flash from "../components/alerts/Flash"
import Form from "../components/reviews/Form"
import List from "../components/reviews/List"
import PaginationList from "../components/reviews/Pagination"
import { Rating } from '@material-ui/lab';

export default ({ match }) => {
    // const { id } = match.params;
    const [id, setID] = useState(match.params.id)
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);

    // set and fetch reviews
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetchReviews(id);
    }, []);
    const [reviewsPublished, setReviewsPublished] = useState([])
    const reviewsPublishedCount = (reviews) => {
        let reviewsPublishedArray = []
        reviews.map(review => {
            if (review.status === "PUBLISHED") {
                reviewsPublishedArray.push(review)
            }

        })
        setReviewsPublished(reviewsPublishedArray)

    }

    const fetchReviews = async (id) => {
        try {
            const reviews = await ReviewsAPI.getReviews(id)

            reviewsPublishedCount(reviews)

        } catch (error) {
            throw error.response;
        }
    };


    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const reviewsPublishedReverse = reviewsPublished.slice(0).reverse()
    const currentReviews = reviewsPublishedReverse.slice(indexOfFirstReview, indexOfLastReview);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // refresh list
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handleRefreshList = () => {
        setDisplayAddReview(true)
        setID(match.params.id)
        fetchReviews(id)
        setCurrentItem(null);
        setCurrentIndex(-1);
    };


    // init state for alert notification
    const [displayFlash, setDisplayFlash] = useState(false);
    const handleCreateItem = (status) => {
        setDisplayFlash(status)
    }

    const [displayAddReview, setDisplayAddReview] = useState(true);
    const handleUpdateItem = (status) => {
        setDisplayAddReview(status)
    }

    let allRatings = []

    reviewsPublished.map((review) => {
        allRatings.push(review.rating)

    })
    let avgRatings = allRatings.length !== 0 && Math.round(allRatings.reduce((prev, curr) => prev + curr) / allRatings.length)

    // console.log(reviewsPublished)

    return (
        <>
            <div> {displayFlash && <Flash status="success" text="Votre review a bien été ajoutée" />}
                <div className="card">
                    <List currentPage={currentPage} onUpdate={handleUpdateItem} reviewsPerPage={reviewsPerPage} setCurrentPage={setCurrentPage} reviewsPublished={reviewsPublished} reviews={currentReviews} id={id} handleRefreshList={handleRefreshList} />
                    {reviewsPublished.length > reviewsPerPage && <PaginationList reviewsPerPage=

                        {reviewsPerPage} totalReviews={reviewsPublished.length} paginate={paginate} />}
                    <p>{reviewsPublished.length}</p>
                    <> <Rating
                        name="average-rating"
                        value={parseInt(avgRatings)}
                        precision={0.5}
                        readOnly
                    />
                    </>

                    {displayAddReview && <Form id={id} handleRefreshList={handleRefreshList} onCreate={handleCreateItem} />}



                </div>
            </div>
        </>
    )
}