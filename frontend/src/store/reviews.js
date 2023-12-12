import { csrfFetch } from "../store/csrf";
import { spotDetailThunk } from "./spots";

//type CRUD
/** Action Type Constants: */
export const GET_SPOT_REVIEWS = "reviews/GET_SPOT_REVIEWS";
export const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS";
export const GET_REVIEW_DETAIL = "reviews/GET_REVIEW_DETAIL";

/**  Action Creators: */
export const getSpotReviewsAction = (spotReviews) => ({
  type: GET_SPOT_REVIEWS,
  spotReviews,
});

export const getUserReviewsAction = (userReviews) => ({
  type: GET_USER_REVIEWS,
  userReviews,
});

export const ManageReviewDetailAction = (review) => ({
  type: GET_REVIEW_DETAIL,
  review,
});

/** Thunk: */
export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const reviews = await res.json();
    const reviewsArr = reviews.Reviews;
    dispatch(getSpotReviewsAction(reviewsArr));
  }
};

export const getUserReviewsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/reviews/current");
  if (res.ok) {
    const reviews = await res.json();
    const reviewsArr = reviews.Reviews;
    dispatch(getUserReviewsAction(reviewsArr));
  }
};

export const createReviewThunk = (newReview, spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    // console.log(res);
    if (res.ok) {
      const newReviewResponse = await res.json();
      dispatch(getSpotReviewsThunk(spotId));
      //to get the most updated avgRating
      dispatch(spotDetailThunk(spotId));
      // console.log("2. newReview from database", newReviewResponse);
      return newReviewResponse;
    } 
  } catch (error) {
    const errors = await error.json();
    return errors;
  }
};

export const updateReviewThunk =
  (updatedReview, reviewId, spotId, usage) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedReview),
      });

      if (res.ok) {
        const updatedReviewResponse = await res.json();
        if(usage === "manage reviews") dispatch(getUserReviewsThunk());
        if(usage === "spot detail") dispatch(getSpotReviewsThunk(spotId));
        dispatch(spotDetailThunk(spotId));
        return updatedReviewResponse;
      }
    } catch (error) {
      const errors = await error.json();
      return errors;
    }
  };

export const deleteReviewThunk = (review, usage) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    if(usage === "manage reviews") dispatch(getUserReviewsThunk());
    if(usage === "spot detail") dispatch(getSpotReviewsThunk(review.spotId));
    dispatch(spotDetailThunk(review.spotId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = { spot: {}, user: {} }; //the Redux store shape on github

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      const spotReviews = {};
      action.spotReviews.forEach((review) => {
        spotReviews[review.id] = review;
      });
      return { spot: spotReviews };
      case GET_USER_REVIEWS:
        const userReviews = {};
      action.userReviews?.forEach((review) => {
        userReviews[review.id] = review;
      });
      return { user: userReviews };
    case GET_REVIEW_DETAIL:
      return { ...state, [action.review.id]: action.review };
    // case UPDATE_spot:
    //   return { ...state, [action.spot.id]: action.spot };
    // case REMOVE_spot:
    //   const newState = { ...state };
    //   delete newState[action.spotId];
    //   return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
