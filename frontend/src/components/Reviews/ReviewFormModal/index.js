// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState } from "react";
import { createReviewThunk } from "../../../store/spots";

export default function ReviewFormModal({ spotId }) {
  const [review, setReview] = useState("");
  const dispatch = useDispatch();

  const { closeModal } = useModal();
  const handleSubmitReview = (e) => {
    e.preventDefault();
    // dispatch(createSpotThunk(spotId)).then(closeModal);
  };

  return (
    <div className="center-children modal">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmitReview}>
        <label>
          <input
            type="textarea"
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <div className="review-stars">
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <span>Stars</span>
        </div>
        <button className="disabled button" type="submit">
          Yes(Delete Review)
        </button>
      </form>
    </div>
  );
}
