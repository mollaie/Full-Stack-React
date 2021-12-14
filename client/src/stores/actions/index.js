import {
  AddReservation,
  RemoveReservation,
  GetReservations,
  GetStores,
} from "../../services/api";

export const FETCH_RESERVATIONS = "FETCH_RESERVATIONS";
export const ADD_RESERVATIONS = "ADD_RESERVATIONS";
export const DELETE_RESERVATIONS = "DELETE_RESERVATIONS";
export const FETCH_STORES = "FETCH_STORES";

export const addReservation = (model) => {
  return async (dispatch) => {
    const result = await AddReservation(model);

    dispatch({ type: ADD_RESERVATIONS, result });
  };
};

export const removeReservation = (id) => {
  return async (dispatch) => {
    const result = await RemoveReservation(id);

    if (result) dispatch({ type: DELETE_RESERVATIONS, id });
  };
};

export const fetchReservations = () => {
  return async (dispatch) => {
    const reservations = await GetReservations();

    dispatch({ type: FETCH_RESERVATIONS, reservations });
  };
};

export const fetchStores = () => {
  return async (dispatch) => {
    const stores = await GetStores();

    dispatch({ type: FETCH_STORES, stores });
  };
};
