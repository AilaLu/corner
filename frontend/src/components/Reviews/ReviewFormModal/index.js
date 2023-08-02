// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState } from "react";
import { createReviewThunk } from "../../../store/spots";

export default function ReviewFormModal({ spotId }) {
  const [review, setReview] = useState("");
  const [starValue, setStarValue] = useState(0);
  const [star1, setStar1] = useState("fa-regular fa-star");
  const [star2, setStar2] = useState("fa-regular fa-star");
  const [star3, setStar3] = useState("fa-regular fa-star");
  const [star4, setStar4] = useState("fa-regular fa-star");
  const [star5, setStar5] = useState("fa-regular fa-star");
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
          <textarea
            type="text"
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <div className="review-stars">
          <i
            onMouseOver={(e) => setStar1("fa-solid fa-star")}
            onMouseLeave={(e) => setStar1("fa-regular fa-star")}
            onClick={(e) => setStarValue(1)}
            className={star1}
          ></i>
          <i
            onMouseOver={(e) => setStar2("fa-solid fa-star")}
            onMouseLeave={(e) => setStar2("fa-regular fa-star")}
            onClick={(e) => setStarValue(2)}
            className={star2}
          ></i>
          <i
            onMouseOver={(e) => setStar3("fa-solid fa-star")}
            onMouseLeave={(e) => setStar3("fa-regular fa-star")}
            onClick={(e) => setStarValue(3)}
            className={star3}
          ></i>
          <i
            onMouseOver={(e) => setStar4("fa-solid fa-star")}
            onMouseLeave={(e) => setStar4("fa-regular fa-star")}
            onClick={(e) => setStarValue(4)}
            className={star4}
          ></i>
          <i
            onMouseOver={(e) => setStar5("fa-solid fa-star")}
            onMouseLeave={(e) => setStar5("fa-regular fa-star")}
            onClick={(e) => setStarValue(5)}
            className={star5}
          ></i>
          <span>Stars</span>
          <div>{starValue}</div>
        </div>
        <button className="disabled button" type="submit">
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
