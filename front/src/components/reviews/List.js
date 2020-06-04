import React, { useEffect, useState, useContext } from "react";
import Item from "./Item"
import Flash from "../alerts/Flash"
export default (props) => {

    const test = () => {
        console.log('test')
        props.refreshList()
    };

    const [displayFlash, setDisplayFlash] = useState(false);
    const handleDeleteItem = (status) => {
        setDisplayFlash(status)
    }
    return (
        <div> {displayFlash && <Flash />}
       
        <ul className="review-items">
            {
                props.reviews.map(review => {
                    return <Item id={props.id} test={test} onDelete={handleDeleteItem} reviews={props.reviews} review={review} key={review.id} />
                })

            }
        </ul>
        </div>


    )

}