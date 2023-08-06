import React from "react";
import OpenModalButton from "../../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";

export default function SingleReview({ review, sessionUserReview }) {
  let time;
  if (review.createdAt !== review.updatedAt) {
    time = review.updatedAt;
  }
  if (review.createdAt === review.updatedAt) {
    time = review.createdAt;
  }
  let deleteReview = "hide";
  if (review === sessionUserReview) deleteReview = "";
  if (!review) return null;
  return (
    <>
      <section className="components-border">
        <h1>{review.id}</h1>
        <div>{review.User.firstName}</div>
        <div className="time">
          {time.slice(5, 7)} {time.slice(0, 4)}
        </div>
        <p>{review.review}</p>
        <div className={deleteReview}>
          <OpenModalButton
            buttonStyle="small grey button"
            buttonText="Delete"
            modalComponent={<DeleteReviewModal review={review} />}
          />
        </div>
      </section>
    </>
  );
}
