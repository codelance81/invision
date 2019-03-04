import * as types from '../current-symbol/types';

const initialState = {
  allSymbol: [],
};

const allSymbolReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.SET_ALL_SYMBOL:
      return {
        ...state,
        allSymbol: actions.data,
      };

    default:
      return state;
  }
};

export default allSymbolReducer;
