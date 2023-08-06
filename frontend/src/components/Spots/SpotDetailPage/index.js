import React from "react";
import "./SpotDetailPage.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { spotDetailThunk } from "../../../store/spots";
import AllReviews from "../../Reviews/AllReviews";

function SpotDetailPage() {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();

  const spot = useSelector((state) =>
    state.spots.singleSpot ? state.spots.singleSpot[spotId] : null
  );

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(spotDetailThunk(spotId));
  }, [dispatch, spotId]);
  let oldSpot = "";
  let newSpot = "";
  let hidePostBtn = "";

  if (!spot) return null;
  // if (!sessionUser) return null;
  //new spot not showing review numbers and show New!
  if (isNaN(spot.avgRating)) oldSpot = "hide";
  if (spot.avgRating > 0) newSpot = "hide";
  //if the current user is the spot owner, hide the Post your review popup modal in the AllReviews component
  if (sessionUser?.id === spot.ownerId) hidePostBtn = "hide";

  let review = "";
  if (spot.numReviews > 1) review = " Reviews";
  if (spot.numReviews == 1) review = " Review";
  return (
    <div className="components-border padding">
      {/* <h1>SpotDetail SpotDetailPage {spot.id} </h1> */}
      <h3 className="padding-bottom">
        {spot.name} {""}
        {spot.id}
      </h3>
      <h4 className="padding-bottom">
        {spot.city} {spot.state} {spot.country}
      </h4>

      <section className="spot-imgs-grid-container padding-bottom">
        <div className="previewImg big-photo">
          <img
            className="big-photo"
            src={spot?.SpotImages[0].url}
            alt={spot.name}
          />
        </div>

        {spot?.SpotImages?.slice(1).map((img) => (
          <div className="small-photo" key={img.url}>
            <img className="small-photo" src={img.url} alt={spot.name} />
          </div>
        ))}
      </section>

      <section className="spot-description-and-reserve-card padding-bottom">
        <section className="spot-description">
          <h3>
            Hosted By {spot.Owner.firstName} {spot.Owner.lastName}
          </h3>
          <p>{spot.description}</p>
        </section>
        <section className="reserve-card black-line rounded">
          <div className="flex-space-between padding-bottom">
            <div className="reserve-price">
              <i className="fa-solid fa-dollar-sign"></i>
              {spot.price} night
            </div>
            <div className="review-stats">
              <i className="fa-solid fa-star"></i>
              <span className={oldSpot}>{spot.avgRating} .</span>{" "}
              <span className={newSpot}>New</span>
              <i className={`fa-solid fa-hashtag ${oldSpot}`}></i>
              <span className={oldSpot}>
                {spot.numReviews}
                {review}
              </span>
            </div>
          </div>
          <div className="buttons-container">
            <button
              onClick={() => alert("Feature coming soon!")}
              className="red big button hover-cursor-pointer"
            >
              Reserve
            </button>
          </div>
        </section>
      </section>
      <section className="spot-reviews">
        <div className="review-stats">
          <i className="fa-solid fa-star"></i>
          <span className={oldSpot}>{spot.avgRating} .</span>{" "}
          <span className={newSpot}>New</span>{" "}
          <i className={`fa-solid fa-hashtag ${oldSpot}`}></i>
          <span className={oldSpot}>
            {spot.numReviews}
            {review}
          </span>
        </div>
      </section>
      <AllReviews spot={spot} hidePostBtn={hidePostBtn} />
    </div>
  );
}

export default SpotDetailPage;
