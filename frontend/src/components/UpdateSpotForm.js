import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spotDetailThunk } from "../store/spots";
import SpotForm from "../components/Spots/SpotForm";

const UpdateSpotForm = () => {
  let { spotId } = useParams();

  const spot = useSelector((state) =>
    state.spots ? state.spots[spotId] : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spotDetailThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  return (
    <div className="components-border">
      <SpotForm spot={spot} formType="Update spot" />
    </div>
  );
};

export default UpdateSpotForm;
