import React from "react";
import OpenModalButton from "../../OpenModalButton";
import UpdateReviewFormModal from "../UpdateReviewFormModal";
import DeleteReviewModal from "../DeleteReviewModal";
import "./SingleReview.css";

export default function SingleReview({ review, sessionUserReview }) {
  let time;
  if (review.createdAt !== review.updatedAt) {
    time = review.updatedAt;
  }
  if (review.createdAt === review.updatedAt) {
    time = review.createdAt;
  }
  let hideButton = "hide";
  if (review === sessionUserReview) hideButton = "";
  if (!review) return null;
  return (
    <>
      <section className="components-border">
        {/* <h1>{review.id}</h1> */}
        <div className="review-user">{review.User.firstName}</div>
        <div className="review-time">
          {time.slice(5, 7)} {time.slice(0, 4)}
        </div>
        <div className="review padding-bottom">
          <p>{review.review}</p>
        </div>
        <div className={`${hideButton} padding-bottom`}>
          <OpenModalButton
            buttonStyle="small grey button"
            buttonText="Update"
            modalComponent={<UpdateReviewFormModal originalReview={review} usage={"spot detail"}/>}
          />
          <OpenModalButton
            buttonStyle="small grey button"
            buttonText="Delete"
            modalComponent={<DeleteReviewModal review={review} usage={"spot detail"}/>}
          />
        </div>
      </section>
    </>
  );
}
