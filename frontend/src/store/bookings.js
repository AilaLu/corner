import { csrfFetch } from "../store/csrf";
import { spotDetailThunk } from "./spots";

//type CRUD
/** Action Type Constants: */
export const GET_SPOT_BOOKINGS = "bookings/GET_SPOT_BOOKINGS";
export const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";
export const GET_BOOKING_DETAIL = "reviews/GET_BOOKING_DETAIL";

/**  Action Creators: */
export const getSpotBookingsAction = (spotBookings) => ({
  type: GET_SPOT_BOOKINGS,
  spotBookings,
});

export const getUserBookingsAction = (userBookings) => ({
  type: GET_USER_BOOKINGS,
  userBookings,
});

export const bookingDetailAction = (booking) => ({
  type: GET_BOOKING_DETAIL,
  booking,
});

/** Thunk: */
export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/bookings`);
  if (res.ok) {
    const bookings = await res.json();
    const bookingsArr = bookings.Bookings;
    console.log("*********************", bookingsArr);
    dispatch(getSpotBookingsAction(bookingsArr));
  }
};

//! check everything especially route
export const getUserBookingsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/bookings/current");
  if (res.ok) {
    const bookings = await res.json();
    const bookingsArr = bookings.Bookings;
    dispatch(getUserBookingsAction(bookingsArr));
  }
};

export const createBookingThunk = (newBooking, spotId) => async (dispatch) => {
 try {
   const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(newBooking),
   });
   // newBooking needs a key startDate with value Date type, a key endDate with value Date type


    // console.log(res);
    if (res.ok) {
      const newBookingResponse = await res.json();
      dispatch(getSpotBookingsThunk(spotId));
      //to get the most updated avgRating
      // dispatch(bookingDetailThunk(spotId));
      // console.log("2. newReview from database", newReviewResponse);
      console.log("###############in store###############");
      return newBookingResponse;
    } 
  } catch (error) {
    const errors = await error.json();
    return errors;
  }
};

// export const deleteReviewThunk = (booking) => async (dispatch) => {
//   const res = await csrfFetch(`/api/reviews/${booking.id}`, {
//     method: "DELETE",
//   });

//   if (res.ok) {
//     dispatch(getSpotReviewsThunk(booking.spotId));
//     //to get the most updated avgRating
//     dispatch(spotDetailThunk(booking.spotId));
//   } else {
//     const errors = await res.json();
//     return errors;
//   }
// };

const initialState = { spot: {}, user: {} }; //the Redux store shape on github

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_BOOKINGS:
      const spotBookings = {};
      action.spotBookings?.forEach((booking) => {
        spotBookings[booking.id] = booking;
      });
      return { spot: spotBookings };
    case GET_USER_BOOKINGS:
      const userBookings = {};
      action.userBookings?.forEach((booking) => {
        userBookings[booking.id] = booking;
      });
    return { user: userBookings };
    case GET_BOOKING_DETAIL:
      return { ...state, [action.booking.id]: action.booking };
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

export default bookingsReducer;
