import React from "react";
import OpenModalButton from "../../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import UpdateReviewFormModal from "../UpdateReviewFormModal";
// import "./ManageReviewDetail.css";

export default function ManageReviewDetail({ review }) {
  let time;
  if (review.createdAt !== review.updatedAt) {
    time = review.updatedAt;
  }
  if (review.createdAt === review.updatedAt) {
    time = review.createdAt;
  }

  if (!review) return null;
  return (
    <>
      <section className="components-border">
        {/* <h1>{review.id}</h1> */}
        <div className="review-user">{review.User.firstName}</div>
        <div className="review-user">Spot Id: {review.spotId}</div>
        <div className="review-time">
          {time.slice(5, 7)} {time.slice(0, 4)}
        </div>
        <div className="review padding-bottom">
          <i className="fa-solid fa-star"></i><span>rating: {review.stars} </span>
          <p>review: {review.review}</p>
        </div>
        <div className={`padding-bottom`}>
          <OpenModalButton
            buttonStyle="small grey button"
            buttonText="Update"
            modalComponent={<UpdateReviewFormModal originalReview={review} usage={"manage reviews"}/>}
          />
          <OpenModalButton
            buttonStyle="small grey button"
            buttonText="Delete"
            modalComponent={<DeleteReviewModal review={review} usage={"manage reviews"}/>}
          />
        </div>
      </section>
    </>
  );
}
