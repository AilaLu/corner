// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createReviewThunk } from "../../../store/reviews";

export default function ReviewFormModal({ spotId }) {
  const starEmpty = "fa-regular fa-star";
  const starFilled = "fa-solid fa-star";
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState(rating);
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    let nextReview = {
      review,
      stars,
      User: { ...sessionUser },
      spotId,
    };
    dispatch(createReviewThunk(nextReview, spotId)).then(closeModal);
  };

  useEffect(() => {
    setStars(rating);
  }, [rating]);

  const starIcon = (number) => {
    const onChange = (number) => {
      setRating(parseInt(number));
    };
    const props = {};
    props.onMouseEnter = () => setStars(number);
    props.onMouseLeave = () => setStars(rating);
    props.onClick = () => onChange(number);
    return (
      <div
        key={number}
        className={stars >= number ? starFilled : starEmpty}
        {...props}
      >
        {/* <i className={starEmpty}></i> */}
      </div>
    );
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
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((number) => starIcon(number))}
            <span> {stars} Stars</span>
          </div>
        </div>
        <button className="disabled button" type="submit">
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
