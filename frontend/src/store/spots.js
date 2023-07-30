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

export const createSpotThunk = (spot) => async (dispatch) => {
  const res = await fetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const newspot = await res.json();
    return newspot;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {}; //store shape on github, with 2 keys inside

/** Spots reducers: */
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const spotsState = {};
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    case GET_SPOT_DETAIL:
      return { ...state, [action.spot.id]: action.spot };
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

export default spotsReducer;
