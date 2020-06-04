import React, { useState } from "react";

// components
import Item from "./Item"
import Flash from "../alerts/Flash"


export default (props) => {

    // refresh list
    const handleRefreshList = () => {
        props.handleRefreshList()
    };


    let handleUpdateItem = (status) => {
        props.onUpdate(status)
    };



    // init state for alert notification
    const [displayFlash, setDisplayFlash] = useState(false);
    const [lastIndex, setLastIndex] = useState(false);
    const mapReviews = () => {

    }
    // update state for alert notification on delete item
    const handleDeleteItem = (status, lastIndex) => {
        setDisplayFlash(status)
        setLastIndex(lastIndex)
        console.log({ lastIndex })
        if (lastIndex) {
            console.log({ length: props.reviewsPublished.length })
            if ((props.reviewsPublished.length - 1) % props.reviewsPerPage === 0) { props.setCurrentPage(props.currentPage - 1) }
        }

    }

    return (
        <div> {displayFlash && <Flash status="success" text="Votre review a bien été ajoutée" />}
            <ul className="review-items">
                {
                    props.reviews.map(review => {


                        return <Item id={props.id} reviews={props.reviewsPublished} review={review} key={review.id} handleRefreshList={handleRefreshList} onDelete={handleDeleteItem} onUpdate={handleUpdateItem} />


                    })
                }
            </ul>




        </div>
    )
}