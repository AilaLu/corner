import React from "react";
import OpenModalButton from "../../OpenModalButton";
import UpdateReviewFormModal from "../UpdateReviewFormModal";
import DeleteReviewModal from "../DeleteReviewModal";
import "./SingleReview.css";

export default function SingleReview({ review, sessionUserReview }) {
 
  let hideButton = "hide";
  if (review === sessionUserReview) hideButton = "";
  if (!review) return null;
  return (
    <>
      <section className="single-spot-review margin-bottom">
        {/* <h3>{review.id}</h3> */}
        <div className="review-user">{review.User.firstName}</div>
        <div className="review-time">
          {review.updatedAt.slice(5, 7)} {review.updatedAt.slice(0, 4)}
        </div>
        <div className="review padding-bottom">
          <p>{review.review}</p>
        </div>
        <div className={`${hideButton} padding-bottom`}>
          <OpenModalButton
            buttonStyle="small grey button margin-right"
            buttonText="Update"
            modalComponent={
              <UpdateReviewFormModal
                originalReview={review}
                usage={"spot detail"}
              />
            }
          />
          <OpenModalButton
            buttonStyle="small grey button"
            buttonText="Delete"
            modalComponent={
              <DeleteReviewModal review={review} usage={"spot detail"} />
            }
          />
        </div>
      </section>
    </>
  );
}
