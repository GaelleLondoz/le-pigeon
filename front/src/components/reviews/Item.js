import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default ({ review }) => {

    return (
        <li>
            <Avatar
                alt={`${review.author.firstName} | agent le pigeon`}
                src={review.author.avatar}
            />
            <p>{review.author.firstName}</p>
            <p>{review.author.lastName}</p>
            <p>{review.rating}</p>
            <p>{review.comment}</p>
            <p>{review.createdAt}</p>
        </li>
    )
}