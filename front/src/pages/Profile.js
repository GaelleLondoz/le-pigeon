import React, { useEffect, useState } from "react";
import ReviewsAPI from "../components/services/reviewsAPI";
import userAPI from "../components/services/userAPI";

// external libraries
// material-ui 
import { Typography, Container } from "@material-ui/core";
import { Rating } from '@material-ui/lab';

// custom components
import Flash from "../components/alerts/Flash"
import Form from "../components/reviews/Form"
import List from "../components/reviews/List"
import Paginator from "../components/Pagination";

export default ({ match }) => {
    // fetch all datas
    useEffect(() => {
        fetchUser(id);
        fetchReviews(id);
        fetchAvgRatings(id);
    }, []);

    // get id from url
    const [id, setID] = useState(match.params.id)

    // config number of reviews per page 
    const [reviewsPerPage] = useState(5);

    // config current page state 
    const [currentPage, setCurrentPage] = useState(1);

    // handle page change 
    const handlePaginationChange = (e, page) => {
        setCurrentPage(page);
    };

    // config user
    const [user, setUser] = useState({
        id: null
    });

    // fetch user (agent)
    const fetchUser = async (id) => {
        try {
            const user = await userAPI.getProfileUser(id);
            setUser({ ...user, id: user.id });
        } catch (error) {
            throw error.response;
        }
    };

    // config dialog from create state open / close
    const [open, setOpen] = useState(false)

    const handleOpenFormCreate = (status) => {
        setOpen(status)
    }

    const handleOpen = () => {
        // open Dialog
        handleOpenFormCreate(true)
    };

    // fetch reviews
    const fetchReviews = async (id) => {
        try {
            const reviews = await ReviewsAPI.getReviews(id)
            reviewsPublishedCount(reviews)
        } catch (error) {
            throw error.response;
        }
    };

    const [reviewsPublished, setReviewsPublished] = useState([])

    // function to count number of published reviews (push in array if status === "PUBLISHED")
    const reviewsPublishedCount = (reviews) => {
        let reviewsPublishedArray = []
        reviews.map(review => {
            if (review.status === "PUBLISHED") {
                reviewsPublishedArray.push(review)
            }
        })
        setReviewsPublished(reviewsPublishedArray)
    }

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const reviewsPublishedReverse = reviewsPublished.slice(0).reverse()
    const currentReviews = reviewsPublishedReverse.slice(indexOfFirstReview, indexOfLastReview);

    // config const to refresh list
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handleRefreshList = () => {
        setID(match.params.id)
        fetchReviews(id)
        setCurrentItem(null);
        setCurrentIndex(-1);
        fetchAvgRatings(id);
    };

    // init config to get average ratings
    // config avgRatings state 
    const [avgRatings, setAvgRatings] = useState({
        avgRatings: "",
        countComments: "",
    });

    let allRatings = []

    reviewsPublished.map((review) => {
        allRatings.push(review.rating)
    })

    let avgRating = allRatings.length !== 0 && Math.round(allRatings.reduce((prev, curr) => prev + curr) / allRatings.length)

    const fetchAvgRatings = async (id) => {
        try {
            setAvgRatings({ avgRating, reviewsPublished });
        } catch (error) {
            console.log(error.response);
        }
    };

    // init state for alert notification
    const [displayFlash, setDisplayFlash] = useState(false);

    const loadAlertInfos = (status, messageAlert) => {
        // display alert
        setDisplayFlash({
            status: status,
            messageAlert: messageAlert
        })

        // hide alert after 2s
        setTimeout(function () {
            setDisplayFlash({
                status: false,
                messageAlert: ""
            })
        }, 2000);
    }
    const handleCreateItem = (status) => {
        const messageAlert = "Votre review a bien été ajoutée, elle sera publée une fois validée par nos administrateurs"
        loadAlertInfos(status, messageAlert)
    }

    const handleDeleteItem = (status) => {
        const messageAlert = "Votre review a bien été supprimée"
        loadAlertInfos(status, messageAlert)
    }

    return (
        <>
            <div> {displayFlash.status && <Flash status="success" text={displayFlash.messageAlert} />}
                <Container maxWidth="md">
                    <section className="section-reviews">
                        <Typography variant="h5">Ce que les voyageurs disent de {user.firstName}</Typography>

                        <div className="card">
                            {reviewsPublished.length > 0 ?
                                <div className="reviews-summary">
                                    <Rating
                                        name="average-rating"
                                        value={parseInt(avgRating)}
                                        readOnly
                                    />

                                    <Typography component="p">
                                        {reviewsPublished.length} commentaire(s)
                                    </Typography>

                                    <Typography component="a" onClick={handleOpen}>
                                        Donner votre avis
                                    </Typography>

                                </div> : <Typography component="a" onClick={handleOpen}>
                                    Soyez le premier à faire un commentaire
                                </Typography>
                            }

                            {
                                reviewsPublished.length > 0 &&
                                <List currentPage={currentPage}
                                    id={id}
                                    reviewsPerPage={reviewsPerPage}
                                    setCurrentPage={setCurrentPage}
                                    reviewsPublished={reviewsPublished}
                                    reviews={currentReviews}
                                    onDelete={handleDeleteItem}
                                    handleRefreshList={handleRefreshList}
                                />
                            }
                            {reviewsPublished.length > reviewsPerPage &&
                                <Paginator length={reviewsPublished.length}
                                    page={currentPage}
                                    onPageChanged={handlePaginationChange}
                                    itemsByPage={reviewsPerPage}
                                />
                            }

                            {open &&
                                <Form
                                    id={id}
                                    handleRefreshList={handleRefreshList}
                                    open={open}
                                    onOpen={handleOpenFormCreate}
                                    onCreate={handleCreateItem}
                                />
                            }
                        </div>
                    </section>
                </Container>
            </div>
        </>
    )
}