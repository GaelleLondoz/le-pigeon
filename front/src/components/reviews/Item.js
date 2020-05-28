import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import userAPI from "../services/userAPI";
import ReviewsAPI from "../services/reviewsAPI";

// externe libraries
// moment
import moment from "moment";
import 'moment/locale/fr'

// material-ui 
import Avatar from "@material-ui/core/Avatar";
import { Rating } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';

// custom style
import "../../assets/sass/components/review.scss";

export default (props) => {
    // retrieve review from props
    const { review } = props

    // check if user authenticated
    const { isAuthenticated } = useContext(AuthContext);

    // init state for alert notification
    const [displayFlash, setDisplayFlash] = useState(false);
    
    
    // user
    useEffect(() => {
        fetchUser(props.id);
    }, []);

    const [user, setUser] = useState({
        id: null
    });

    const fetchUser = async (id) => {
        try {
            const { user } = await userAPI.getUser();
            setUser({ ...user, id: user.id });

        } catch (error) {
            throw error.response;
        }
    };

    // action delete item
    const handleDelete = async () => {  
        try {
            await ReviewsAPI.deleteReview(review.id);
            props.handleRefreshList()
            props.onDelete(true)
        } catch (error) {
            console.log(error.response)
        }
    };

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
            {isAuthenticated && review.author.id === user.id ? <div><DeleteIcon onClick={handleDelete} /></div> : ""}
        </li>
    )
}