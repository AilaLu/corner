// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteSpotThunk } from "../../../store/spots";

export default function DeleteModal({ spotId }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();
  const handleYes = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spotId)).then(closeModal);
  };

  return (
    <div className="center-children">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button type="submit" onClick={handleYes}>
        Yes(Delete Spot)
      </button>
      <button onClick={closeModal}>No(Keep Spot)</button>
    </div>
  );

  //     return (
  //       <div className="center-children modal">
  //         <h1>Confirm Delete</h1>
  //         <p>Are you sure you want to delete this review?</p>
  //         <button type="submit" onClick={handleYes}>
  //           Yes(Delete Review)
  //         </button>
  //         <button type="submit" onClick={handleNo}>
  //           No(Keep Review)
  //         </button>
  //       </div>
  //     );
  //   }
}
