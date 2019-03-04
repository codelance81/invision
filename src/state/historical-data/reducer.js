import SET_HISTORICAL_DATA from './types';

const initialState = {
  historicalData: [],
};

const historicalDataReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_HISTORICAL_DATA:
      return {
        ...state,
        historicalData: actions.data,
      };

    default:
      return state;
  }
};

export default historicalDataReducer;
