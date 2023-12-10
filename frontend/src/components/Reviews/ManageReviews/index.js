// import "./Managereviews.css";
import ManageReviewDetail from "../ManageReviewDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserReviewsThunk } from "../../../store/reviews";

function ManageReviews() {
  let reviews = useSelector((state) =>
    state.reviews.user ? state.reviews.user : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserReviewsThunk());
  }, [dispatch]);

  if (reviews) reviews = Object.values(reviews);
  if (!reviews) return null;
  return (
    <div className="components-border">
      <h1 className="manage-reviews">Manage Reviews</h1>
      <div className="manage-reviews-grid-container">
        {reviews.map((review) => (
          <div key={review.id}>
            <ManageReviewDetail review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageReviews;
