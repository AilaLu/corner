import React from "react";
// import "./AllReviewsHome.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotReviewsThunk } from "../../../store/reviews";
import SingleReview from "../SingleReview";
import OpenModalButton from "../../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";

export default function AllReviews({ spotId, hidePostBtn }) {
  const reviews = Object.values(
    useSelector((state) => (state.reviews.spot ? state.reviews.spot : []))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  //if the user have posted on this spot already, hide the post your view button with the popup Modal
  let postReviewAlready = "";
  if (reviews.find((review) => review.userId === sessionUser.id))
    postReviewAlready = "hide";

  if (!reviews) return null;
  if (!sessionUser) return null;
  return (
    <div className="components-border">
      <div className={`${hidePostBtn} ${postReviewAlready}`}>
        <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<ReviewFormModal spotId={spotId} />}
        />
      </div>
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
