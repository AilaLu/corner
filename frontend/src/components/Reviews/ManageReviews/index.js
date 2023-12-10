// import "./ManageSpots.css";
// import ManageSpotcard from "../ManageSpotcard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentSpotsThunk } from "../../../store/spots";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import { Tooltip } from "react-tooltip";

function ManageReviews() {
  let spots = useSelector((state) =>
    state.spots.allSpots ? state.spots.allSpots : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentSpotsThunk());
  }, [dispatch]);

  if (spots) spots = Object.values(spots);
  if (!spots) return null;
  return (
    <div className="components-border">
      <h1 className="manage-spots">Manage Reviews</h1>
      <div className="manage-spots-grid-container">
        {spots.map((spot) => (
          <div
            key={spot.id}
            // data-tooltip-content={spot.name}
            // data-tooltip-id="spot-card-tooltip"
          >
            {/* <ManageSpotcard spot={spot} /> */}
          </div>
        ))}
        {/* <Tooltip
          id="spot-card-tooltip"
          place="bottom"
          type="dark"
          effect="float"
        /> */}
      </div>
    </div>
  );
}

export default ManageReviews;
