import "./ManageSpots.css";
import ManageSpotcard from "../ManageSpotcard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentSpotsThunk } from "../../../store/spots";

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
    <>
      <h1 className="components-border">ManageSpots</h1>
      <ul>
        {spots.map((spot) => (
          <li key={spot.id}>
            <ManageSpotcard spot={spot} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ManageSpots;
