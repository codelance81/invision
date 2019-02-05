import * as types from "./types";

const initialState = {
  currentSymbol: 'SPY',
  name: 'SPDR S&P 500',
}

const currentSymbolReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case types.SET_CURRENT_SYMBOL:
      return {
        ...state,
        currentSymbol: actions.data.label,
        name: actions.data.name,
      }
      
    default:
      return state;
  }
}

export default currentSymbolReducer;