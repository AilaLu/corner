import React from "react";
// import "./AllReviewsHome.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotReviewsThunk } from "../../../store/reviews";
import SingleReview from "../SingleReview";

export default function AllReviews({ spotId }) {
  const reviews = Object.values(
    useSelector((state) => (state.reviews.spot ? state.reviews.spot : []))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId));
  }, [dispatch]);

  if (!reviews) return null;
  return (
    <div className="components-border">
      <button className="grey button">Post Your Review</button>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <SingleReview review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
}
