import React from "react";
import Item from "./Item"

export default (props) => {
    return (
        <ul className="review-items">
            {
                props.reviews.map(review => {
                    return <Item review={review} key={review.id} />
                })

            }
        </ul>



    )

}