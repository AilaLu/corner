// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteSpotThunk } from "../../../store/spots";

export default function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();
  const handleYes = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spotId)).then(closeModal);
  };

  return (
    <div className="center-children">
      <h1>Confirm Delete</h1>
      <div className="padding-bottom">
        <p>Are you sure you want to remove this spot from the listings?</p>
      </div>
      <div className="flex-column-centered">
        <div className="padding-bottom">
          <button className="big red button" type="submit" onClick={handleYes}>
            Yes(Delete Spot)
          </button>
        </div>
        <div>
          <button className="big grey button" onClick={closeModal}>
            No(Keep Spot)
          </button>
        </div>
      </div>
    </div>
  );
}
