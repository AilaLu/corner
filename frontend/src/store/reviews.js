import { csrfFetch } from "../store/csrf";

//type CRUD
/** Action Type Constants: */
export const GET_REVIEWS = "reviews/GET_REVIEWS";
export const GET_REVIEW_DETAIL = "reviews/GET_REVIEW_DETAIL";

/**  Action Creators: */
export const getReviewsAction = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const reviewDetailAction = (review) => ({
  type: GET_REVIEW_DETAIL,
  review,
});

/** Thunk: */
export const getReviewsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots/:spotId/reviews");
  if (res.ok) {
    const reviews = await res.json();
    //thunk response is the postman response, with a obj of Reviews, page, size. Reviews has an array of objs
    const reviewsArr = reviews.Reviews;
    dispatch(getReviewsAction(reviewsArr));
  }
};

const initialState = { spot: {}, user: {} }; //the Redux store shape on github

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      const reviews = {};
      action.reviews.forEach((review) => {
        reviews[review.id] = review;
      });
      return { spot: reviews };
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
