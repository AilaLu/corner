import React from "react";

export default function SingleReview({ review }) {
  let time;
  if (review.createdAt !== review.updatedAt) {
    time = review.updatedAt;
  }
  if (review.createdAt === review.updatedAt) {
    time = review.createdAt;
  }

  return (
    <>
      <section className="components-border">
        <h1>{review.id}</h1>
        <div>{review.User.firstName}</div>
        <div>
          {time.slice(5, 7)} {time.slice(0, 4)}
        </div>
        <p>{review.review}</p>
      </section>
    </>
  );
}
