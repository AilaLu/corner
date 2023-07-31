import { csrfFetch } from "../store/csrf";

//type CRUD
/** Action Type Constants: */
export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SPOT_DETAIL = "spots/GET_SPOT_DETAIL";

/**  Action Creators: */
export const getSpotsAction = (spots) => ({
  type: GET_SPOTS,
  spots,
});

export const spotDetailAction = (spot) => ({
  type: GET_SPOT_DETAIL,
  spot,
});

/** Thunk: */
export const getSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    //thunk response is the postman response, with a obj of Spots, page, size. Spots has an array of objs
    const spotsArr = spots.Spots;
    dispatch(getSpotsAction(spotsArr));
  }
};

export const getCurrentSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");
  if (res.ok) {
    const spots = await res.json();
    const spotsArr = spots.Spots;
    dispatch(getSpotsAction(spotsArr));
  }
};

export const spotDetailThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotDetails = await res.json();
    dispatch(spotDetailAction(spotDetails));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createSpotThunk = (newSpot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSpot),
  });

  if (res.ok) {
    const newSpotResponse = await res.json();
    // console.log("2. newSpot from database", newSpotResponse);
    return newSpotResponse;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateSpotThunk = (updatedSpot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${updatedSpot.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedSpot),
  });

  if (res.ok) {
    const updatedSpotResponse = await res.json();
    return updatedSpotResponse;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(getCurrentSpotsThunk());
    // dispatch the thunk that get all user spots in delete spot thunk.
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = { allSpots: {}, singleSpot: {} }; //store shape on github, with 2 keys inside

/** Spots reducers: */
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return { allSpots: allSpots };
    case GET_SPOT_DETAIL:
      const singleSpot = { [action.spot.id]: action.spot };
      return { singleSpot: singleSpot };
    default:
      return state;
  }
};

export default spotsReducer;
