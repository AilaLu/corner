import React from "react";

export default function SingleReview({ spot }) {
  return (
    <>
      <section className="components-border">
        <h1>Review{spot.id}</h1>
        <img src={spot.previewImage} alt={spot.name}></img>
        <h2>
          {spot.city}, {spot.state}
        </h2>
        <div>
          <i className="fa-solid fa-star"></i> {spot.avgRating}
        </div>
        <div>
          <i className="fa-solid fa-dollar-sign"></i>
          {spot.price} night
        </div>
      </section>
    </>
  );
}
