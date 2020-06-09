import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Rating } from '@material-ui/lab';

export default ({ review }) => {

    return (
        <li>
            <Avatar
                alt={`${review.author.firstName} | agent le pigeon`}
                src={review.author.avatar}
            />
            <p>{review.author.firstName}</p>
            <p>{review.author.lastName}</p>

            <Rating
                name="hover-feedback"
                value={review.rating}
                precision={0.5}
                readOnly
            />

            <p>{review.comment}</p>
            <p>{review.createdAt.toISOString()}</p>
        </li>
    )
}