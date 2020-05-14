import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Rating } from '@material-ui/lab';
import moment from "moment";
import 'moment/locale/fr'


// sass
import "../../assets/sass/components/review.scss";
export default ({ review }) => {

    return (
        <li className="review-item">
            <div className="review-item__top">
                <div className="review-item__top-left">
                    <Avatar
                        alt={`${review.author.firstName} | agent le pigeon`}
                        src={review.author.avatar}
                    />

                    <div className="review-item__top-text">
                        <div className="review-item__user-info">
                            <p>{review.author.firstName} {review.author.lastName}</p>
                        </div>
                        <p>{moment(review.createdAt).local('fr').format('LL')}</p>
                    </div>
                </div>
                <div className="review__rating">
                    <Rating
                        name="hover-feedback"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                    />
                </div>
            </div>
            <div className="review-item__bottom">
                <p>{review.comment}</p>
            </div>

        </li>
    )
}