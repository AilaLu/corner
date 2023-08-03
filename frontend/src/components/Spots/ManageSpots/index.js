import "./ManageSpots.css";
import ManageSpotcard from "../ManageSpotcard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentSpotsThunk } from "../../../store/spots";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
function ManageSpots() {
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
      <h1 className="manage-spots">Manage Spots</h1>
      <NavLink className="navlink-to-btn button grey small" to="/spots/new">
        Create a new spot
      </NavLink>
      <ul>
        {spots.map((spot) => (
          <li key={spot.id}>
            <ManageSpotcard spot={spot} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageSpots;
