import React from "react";
import "./SpotDetailPage.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { spotDetailThunk } from "../../../store/spots";

function SpotDetailPage() {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();

  const spot = useSelector((state) =>
    state.spots.singleSpot ? state.spots.singleSpot[spotId] : null
  );

  useEffect(() => {
    dispatch(spotDetailThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;
  return (
    <div className="components-border">
      <h3>
        SpotDetail SpotDetailPage {spot.id} {spot.name}
      </h3>
      <h4>
        {spot.city} {spot.state} {spot.country}
      </h4>

      <section className="spot-imgs">
        <ul>
          {spot.SpotImages.map((img) => (
            <li key={img.url}>
              <img src={img.url} alt={spot.name} />
            </li>
          ))}
        </ul>
      </section>

      <section className="spot-description-and reserve-card">
        <section className="spot-description">
          <h3>
            Hosted By {spot.Owner.firstName} {spot.Owner.lastName}
          </h3>
          <p>{spot.description}</p>
        </section>
        <section className="reserve-card">
          <div>
            {spot.price}
            <div>
              {spot.avgRating} {spot.numReviews}
            </div>
          </div>
          <div className="buttons-container">
            <button className="red-button">Reserve</button>
          </div>
        </section>
      </section>
      {/* reviews */}
    </div>
  );
}

export default SpotDetailPage;
