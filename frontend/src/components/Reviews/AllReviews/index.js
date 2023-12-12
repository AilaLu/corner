import React from "react";
// import "./AllReviewsHome.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotReviewsThunk } from "../../../store/reviews";
import SingleReview from "../SingleReview";
import OpenModalButton from "../../OpenModalButton";
import CreateReviewFormModal from "../CreateReviewFormModal";

export default function AllReviews({ spot, hidePostBtn }) {
  const spotId = spot.id;
  const spotReviews = Object.values(
    useSelector((state) => (state.reviews?.spot ? state.reviews?.spot : []))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  //if the user have posted on this spot already, hide the post your view button with the popup Modal
  let posted = "";
  let sessionUserReview = spotReviews.find(
    (review) => review.userId === sessionUser?.id
  );
  if (sessionUserReview) posted = "hide";

  let notposted = "hide";
  //If no spotReviews have been posted yet and the current user is logged-in and is NOT the owner of the spot, replace the spotReviews list with the text "Be the first to post a review!"
  if (spotReviews.length === 0 && sessionUser && sessionUser.id !== spot.ownerId)
    notposted = "";

  if (!spotReviews) return null;
  if (!sessionUser) return null;
  return (
    <div className="components-border">
      <div className={`${hidePostBtn} ${posted} padding-bottom`}>
        <OpenModalButton
          buttonStyle="small grey button"
          buttonText="Post Your Review"
          modalComponent={<CreateReviewFormModal spotId={spotId} />}
        />
      </div>
      <div className={notposted}>Be the first to post a review!</div>
      <ul>
        {/* show the newest review on top */}
        {spotReviews
          .slice() //make a shallow copy if you don't want the original array reversed
          .reverse() //or you can use toReversed() without the slice()
          .map((review) => (
            <li key={review.id}>
              <SingleReview
                review={review}
                sessionUserReview={sessionUserReview}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
