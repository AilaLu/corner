import { csrfFetch } from "../store/csrf";
import { spotDetailThunk } from "./spots";

//type CRUD
/** Action Type Constants: */
export const GET_SPOT_REVIEWS = "reviews/GET_REVIEWS";
export const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS";
export const GET_REVIEW_DETAIL = "reviews/GET_REVIEW_DETAIL";

/**  Action Creators: */
export const getSpotReviewsAction = (spotReviews) => ({
  type: GET_SPOT_REVIEWS,
  spotReviews,
});

export const getUserReviewsAction = (reviews) => ({
  type: GET_USER_REVIEWS,
  reviews,
});

export const reviewDetailAction = (review) => ({
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

//! check everything especially route
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
    } else {
      const errors = await res.json();
      return errors;
    }
  } catch (error) {
    // const errors = await error.json();
    return error;
  }
};

export const deleteReviewThunk = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(getSpotReviewsThunk(review.spotId));
    //to get the most updated avgRating
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
      const reviews = {};
      action.spotReviews.forEach((review) => {
        reviews[review.id] = review;
      });
      return { spot: reviews };
    // case GET_USER_REVIEWS:
    //   const reviews = {};
    //   action.reviews.forEach((review) => {
    //     reviews[review.id] = review;
    //   });
    // return { user: reviews };
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
