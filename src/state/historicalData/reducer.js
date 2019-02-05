import * as types from './types';

const initialState = {
  historicalData: []
}

const historicalDataReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case types.SET_HISTORICAL_DATA:
      return {
        ...state,
        historicalData: actions.data
      }

    default:
     return state
  }
}

export default historicalDataReducer;