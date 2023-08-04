// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createReviewThunk } from "../../../store/reviews";

export default function ReviewFormModal({ spotId }) {
  //for the rating stars
  const starEmpty = "fa-regular fa-star";
  const starFilled = "fa-solid fa-star";
  //for the review inputs
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState(rating);
  // errors are validation errors
  const [errors, setErrors] = useState({});
  const hasErrors = Object.keys(errors).length > 0;
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  let disableBtn = "big disabled button";
  if (!hasErrors) disableBtn = "big red button";

  useEffect(() => {
    const errors = {};
    if (review.length < 10)
      errors.review = "Review text should be more than 10 characters";
    if (isNaN(stars) || stars > 5 || stars < 1)
      errors.stars = "Stars must be an integer from 1 to 5";
    setErrors(errors);
  }, [review, stars]);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // setErrors({});
    let nextReview = {
      review,
      stars,
      User: { ...sessionUser },
      spotId,
    };
    let newReview = await dispatch(createReviewThunk(nextReview, spotId));
    await closeModal();

    const backendErrors = newReview.errors;
    if (backendErrors) {
      setErrors(backendErrors);
    }
    // console.log(
    //   "***in review form*** --getting the errors of invalid reviews from the backend----,",
    //   newReview
    // );
  };

  //tracking the clicked rating changing
  useEffect(() => {
    setStars(rating);
  }, [rating]);

  //a component to set all the event listeners to div tag class
  const starIcon = (number) => {
    const onChange = (number) => {
      setRating(parseInt(number));
    };
    const props = {};
    props.onMouseEnter = () => setStars(number);
    //on hover the star reflects it
    props.onMouseLeave = () => setStars(rating);
    //on leave still shows the prev rating
    props.onClick = () => onChange(number);
    //on click set the rating to the number
    return (
      <i
        key={number}
        className={stars >= number ? starFilled : starEmpty}
        {...props}
      >
        {" "}
      </i> //the star icon from fontawesome with all the event listeners!
    );
  };

  return (
    <div className="center-children modal">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmitReview}>
        <div className="errors">{errors.review && `${errors.review}`}</div>
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
        <button className={disableBtn} type="submit" disabled={hasErrors}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
