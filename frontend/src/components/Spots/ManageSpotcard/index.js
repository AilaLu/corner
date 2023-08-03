// import { deleteSpotThunk } from "../../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Spotcard from "../Spotcard";
import OpenModalButton from "../../OpenModalButton";
import DeleteModal from "../DeleteSpotModal";

export default function ManageSpotcard({ spot }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   dispatch(deleteSpotThunk(spot.id));
  // };

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}/edit`);
  };

  if (!spot) return null;
  return (
    <div className="components-border">
      <Spotcard spot={spot} />
      <div className="edit-delete-buttons-container">
        <button
          className="small grey button hover-cursor-pointer"
          onClick={handleEdit}
        >
          Update
        </button>
        <OpenModalButton
          buttonText="Delete"
          modalComponent={<DeleteModal spotId={spot.id} />}
        />
      </div>
    </div>
  );
}
