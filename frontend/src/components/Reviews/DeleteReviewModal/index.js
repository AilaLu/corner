// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../store/reviews";
export default function DeleteReviewModal({ review, usage }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();
  const handleYes = (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(review, usage)).then(closeModal);
  };

  return (
    <div className="center-children modal">
      <h3>Confirm Delete</h3>
      <div className="padding-bottom">
        <p>Are you sure you want to delete this review?</p>
      </div>
      <div className="flex-column-centered">
        <div className="padding-bottom">
          <button className="big red button" type="submit" onClick={handleYes}>
            Yes(Delete Review)
          </button>
        </div>
        <div>
          <button className="big grey button" onClick={closeModal}>
            No(Keep Review)
          </button>
        </div>
      </div>
    </div>
  );
}
