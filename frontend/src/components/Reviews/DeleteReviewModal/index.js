// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../store/reviews";
export default function DeleteReviewModal({ review }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();
  const handleYes = (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(review)).then(closeModal);
  };

  return (
    <div className="center-children modal">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button className="big red button" type="submit" onClick={handleYes}>
        Yes(Delete Review)
      </button>
      <button className="big grey button" onClick={closeModal}>
        No(Keep Review)
      </button>
    </div>
  );
}
