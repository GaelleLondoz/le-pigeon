import React, { useState } from "react";

// custom components
import Item from "./Item"

export default (props) => {
    // refresh list
    const handleRefreshList = () => {
        props.handleRefreshList()
    };

    // init states of last item of reviews
    const [lastIndex, setLastIndex] = useState(false);

    // update state for alert notification on delete item
    const handleDeleteItem = (status, lastIndex) => {
        // sent info for alert on delete
        props.onDelete(status)
        // check if item deleted was last review and last of page (pagination)
        setLastIndex(lastIndex)
        if (lastIndex) {
            if ((props.reviewsPublished.length - 1) % props.reviewsPerPage === 0) { props.setCurrentPage(props.currentPage - 1) }
        }
    }

    return (
        <div>
            <ul className="review-items">
                {
                    props.reviews.map(review => {
                        return <Item id={props.id} reviews={props.reviewsPublished} review={review} key={review.id} handleRefreshList={handleRefreshList} onDelete={handleDeleteItem} />
                    })
                }
            </ul>
        </div>
    )
}