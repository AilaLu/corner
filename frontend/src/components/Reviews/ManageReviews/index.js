// import "./Managereviews.css";
import ManageReviewDetail from "../ManageReviewDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserReviewsThunk } from "../../../store/reviews";

function ManageReviews() {
  const sessionUser = useSelector((state) => state.session.user);
  let userReviews = useSelector((state) =>
    state.reviews.user ? Object.values(state.reviews.user) : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserReviewsThunk());
  }, [dispatch]);

  return (
    <div className="components-border">
      <h3 className="manage-reviews padding margin-bottom">
        Hello {sessionUser.username}, Manage Reviews
      </h3>
      <div className="manage-reviews-grid-container">
      {/* sort it  */}
        {userReviews.toReversed().map((review) => (
          <div key={review.id}>
            <ManageReviewDetail review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageReviews;
