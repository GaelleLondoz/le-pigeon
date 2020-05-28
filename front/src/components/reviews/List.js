import React, { useState } from "react";
// components
import Item from "./Item"
import Flash from "../alerts/Flash"

export default (props) => {
    // refresh list
    const handleRefreshList = () => {
        props.handleRefreshList()
    };

    // init state for alert notification
    const [displayFlash, setDisplayFlash] = useState(false);

    // update state for alert notification on delete item
    const handleDeleteItem = (status) => {
        setDisplayFlash(status)
    }
    return (
        <div> {displayFlash && <Flash />}
        <ul className="review-items">
            {
                props.reviews.map(review => {
                    return <Item id={props.id} review={review} key={review.id} handleRefreshList={handleRefreshList} onDelete={handleDeleteItem} />
                })
            }
        </ul>
        </div>
    )
}