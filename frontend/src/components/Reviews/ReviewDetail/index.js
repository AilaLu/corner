import React from "react";
import OpenModalButton from "../../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
// import "./ReviewDetail.css";


export default function ReviewDetail({ review, sessionUserReview }) {
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
       {/* <h1>{review.id}</h1> */}
       <div className="review-user">{review.User.firstName}</div>
       <div className="review-user">Spot Id: {review.spotId}</div>
       <div className="review-time">
         {time.slice(5, 7)} {time.slice(0, 4)}
       </div>
       <div className="review padding-bottom">
         <p>{review.review}</p>
       </div>
       <div className={`${deleteReview} padding-bottom`}>
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
