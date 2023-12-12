// import "./Managereviews.css";
import ManageReviewDetail from "../ManageReviewDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserReviewsThunk } from "../../../store/reviews";

function ManageReviews() {
  let userReviews = useSelector((state) =>
    state.reviews.user ? Object.values(state.reviews.user) : []
  );
  console.log("======reviews array======", userReviews);
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("======useEffect triggered======");
    dispatch(getUserReviewsThunk());
  }, [dispatch]);

  return (
    <div className="components-border">
      <h1 className="manage-reviews">Manage Reviews</h1>
      <div className="manage-reviews-grid-container">
        {userReviews.map((review) => (
          <div key={review.id}>
            <ManageReviewDetail review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageReviews;
