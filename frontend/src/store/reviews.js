import { csrfFetch } from "../store/csrf";

//type CRUD
/** Action Type Constants: */
export const GET_SPOT_REVIEWS = "reviews/GET_REVIEWS";
// export const GET_USER_REVIEWS = "reviews/GET_REVIEWS";
export const GET_REVIEW_DETAIL = "reviews/GET_REVIEW_DETAIL";

/**  Action Creators: */
export const getSpotReviewsAction = (reviews) => ({
  type: GET_SPOT_REVIEWS,
  reviews,
});

// export const getUserReviewsAction = (reviews) => ({
//   type: GET_USER_REVIEWS,
//   reviews,
// });

export const reviewDetailAction = (review) => ({
  type: GET_REVIEW_DETAIL,
  review,
});

/** Thunk: */
export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const reviews = await res.json();
    //thunk response is the postman response, with a obj of Reviews, page, size. Reviews has an array of objs
    const reviewsArr = reviews.Reviews;
    dispatch(getSpotReviewsAction(reviewsArr));
  }
};

// export const getUserReviewsThunk = () => async (dispatch) => {
//   const res = await csrfFetch("/api/reviews/current");
//   if (res.ok) {
//     const reviews = await res.json();
//     //thunk response is the postman response, with a obj of Reviews, page, size. Reviews has an array of objs
//     const reviewsArr = reviews.Reviews;
//     dispatch(getUserReviewsAction(reviewsArr));
//   }
// };

const initialState = { spot: {}, user: {} }; //the Redux store shape on github

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      const reviews = {};
      action.reviews.forEach((review) => {
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
