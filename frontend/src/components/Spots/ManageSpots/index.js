import "./ManageSpots.css";
import ManageSpotcard from "../ManageSpotcard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentSpotsThunk } from "../../../store/spots";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import { Tooltip } from "react-tooltip";

function ManageSpots() {
  const sessionUser = useSelector((state) => state.session.user);
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
      <h3 className="manage-spots">
        Hello {sessionUser.username},Manage Spots
      </h3>
      <NavLink className="navlink-to-btn button grey small" to="/spots/new">
        Create a new spot
      </NavLink>
      <div className="manage-spots-grid-container">
        {spots.map((spot) => (
          <div
            key={spot.id}
            // data-tooltip-content={spot.name}
            // data-tooltip-id="spot-card-tooltip"
          >
            <ManageSpotcard spot={spot} />
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

export default ManageSpots;
