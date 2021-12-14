import {
  ADD_RESERVATIONS,
  DELETE_RESERVATIONS,
  FETCH_RESERVATIONS,
} from "../actions";

const initialState = {
  reservations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS:
      return {
        reservations: action.reservations,
      };

    case ADD_RESERVATIONS:
      let reservations = [...state];
      reservations.push(action.result);

      return {
        reservations,
      };

    case DELETE_RESERVATIONS:
      return {
        reservations: state.reservations.filter(
          (reservation) => reservation.id !== action.id
        ),
      };
  }

  return state;
};
