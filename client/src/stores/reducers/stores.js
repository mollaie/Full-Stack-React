import { FETCH_STORES } from "../actions";

const initialState = {
  stores: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORES:
      return {
        stores: action.stores,
      };
  }

  return state;
};
