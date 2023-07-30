import React from "react";
import "./SpotDetailPage.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { spotDetailThunk } from "../../../store/spots";

function SpotDetailPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  // const [goTospot, setGoTospot] = useState(spotId);
  const spot = useSelector((state) =>
    state.spots ? state.spots[spotId] : null
  );

  useEffect(() => {
    dispatch(spotDetailThunk(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="components-border">
      <h3>
        SpotDetailPage {spot.id} {spot.name}
      </h3>
      <h4>
        {spot.city} {spot.state} {spot.country}
      </h4>

      {/* <section className="spot-imgs">
        <ul>
          {spot.SpotImages.map((img) => (
            <li key={img.url}>
              <img src={img.url} alt={spot.name} />
            </li>
          ))}
        </ul>
      </section> */}

      {/* <section className="spot-description-and reserve-card">
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
          <button>Reserve</button>
        </section>
      </section> */}
      {/* reviews */}
    </div>
  );
}

export default SpotDetailPage;
