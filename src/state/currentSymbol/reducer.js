import * as types from "./types";

const initialState = {
  currentSymbol: 'SPY',
  name: 'SPDR S&P 500',
  symbolWatchListWithPrice: []
}

const currentSymbolReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case types.SET_CURRENT_SYMBOL:
      return {
        ...state,
        currentSymbol: actions.data.label,
        name: actions.data.name,
      }

    case types.SET_SYMBOL_TO_WATCH_LIST_WITH_PRICE:
    return {
      ...state,
      symbolWatchListWithPrice: [...state.symbolWatchListWithPrice, actions.data]
    }

    default:
      return state;
  }
}

export default currentSymbolReducer;