import React from "react";
import OpenModalButton from "../../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import UpdateReviewFormModal from "../UpdateReviewFormModal";
import "./ManageReviewDetail.css";

export default function ManageReviewDetail({ review }) {
  if (!review) return null;
  return (
    <>
      <section className="components-border padding">
        {/* <h3>{review.id}</h3> */}
        <div className="review-spot">Spot: {review.Spot.name}</div>
        <div className="review-time">
          {review.updatedAt.slice(0, 10)} {review.updatedAt.slice(11, 19)}
        </div>
        <div className="review-rating">
          <i className="fa-solid fa-star"></i>
          <span>Rating: {review.stars} </span>
          <p className="review">Review: {review.review}</p>
        </div>
        <div className="edit-review">
          <OpenModalButton
            buttonStyle="small grey button margin-right"
            buttonText="Update"
            modalComponent={
              <UpdateReviewFormModal
                originalReview={review}
                usage={"manage reviews"}
              />
            }
          />
          <OpenModalButton
            buttonStyle="small grey button"
            buttonText="Delete"
            modalComponent={
              <DeleteReviewModal review={review} usage={"manage reviews"} />
            }
          />
        </div>
      </section>
    </>
  );
}
