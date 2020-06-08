import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";

const CardAgent = ({ agent, avgRatings }) => {
  return (
    <div className="card testimonials testimonial-card">
      <div className="card-up info-color"></div>
      <div className="avatar mx-auto white">
        {/* <Link to={"/agent/" + agent.id}> */}
        <Link to="/agent/2">
          {/* <img src={agent.avatar} className="rounded-circle img-fluid" /> */}
          <img
            src="https://randomuser.me/api/portraits/women/82.jpg"
            className="rounded-circle"
          />
        </Link>
      </div>
      <div className="card-body">
        <h4 className="font-weight-bold mb-4">
          {/* {agent.firstName} {agent.lastName} */}
          Jean Christian
        </h4>
        {/* <Rating name="rating" value={avgRatings} readOnly /> */}
        <Rating name="rating" value={2} readOnly />
        <hr />
        <p className="dark-grey-text mt-4">
          {/*<i className="fa fa-quote-left pr-2"></i>
                    Lorem ipsum dolor
                    sit amet eos
                    adipisci, consectetur adipisicing elit.
                    */}
          Thaïlande
        </p>
      </div>
    </div>
  );
};

export default CardAgent;
