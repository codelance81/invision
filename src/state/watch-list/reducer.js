import { findIndex } from 'lodash';
import * as types from './types';


const initialState = {
  symbolWatchListWithPrice: [],
  alreadyExistData: {},
};

const watchListReducer = (state = initialState, actions) => {
  let allSymbols;
  let objIndex;

  switch (actions.type) {

    case types.SET_ALL_SYMBOL_TO_WATCH_LIST_WITH_PRICE:
      return {
        ...state,
        symbolWatchListWithPrice: actions.data,
      };
      
    case types.SET_ADDED_SYMBOL_TO_WATCHLIST:
      allSymbols = Object.assign([], state.symbolWatchListWithPrice);
      allSymbols.push(actions.data);
      return {
        ...state,
        symbolWatchListWithPrice: allSymbols,
      };

    case types.SET_SYMBOL_ALREADY_EXISTS_OR_NOT_WITH_ALL_INFO:
      return {
        ...state,
        alreadyExistData: actions.data,
      };

    case types.REMOVE_SYMBOL_FROM_WATCHLIST: {
      allSymbols = Object.assign([], state.symbolWatchListWithPrice);
      const symbol = actions.data;
      objIndex = findIndex(state.symbolWatchListWithPrice, data => data.symbol === symbol);
      allSymbols.splice(objIndex, 1);
      return {
        ...state,
        symbolWatchListWithPrice: allSymbols,
      };
    }


    case types.UPDATE_EXISTING_SYMBOL_IN_WATCHLIST: {
      allSymbols = Object.assign([], state.symbolWatchListWithPrice);
      const { data } = actions;
      objIndex = findIndex(state.symbolWatchListWithPrice, o => o.symbol === data.symbol);
      allSymbols[objIndex].price = data.price;
      allSymbols[objIndex].Date = data.Date;
      return {
        ...state,
        symbolWatchListWithPrice: allSymbols,
      };
    }

    case types.CHECK_MARKET_PRICE_OF_EXISTING_SYMBOL: {
      allSymbols = Object.assign([], state.symbolWatchListWithPrice);
      objIndex = findIndex(state.symbolWatchListWithPrice, o => o.symbol === actions.data);
      allSymbols[objIndex].isReached = true;
      return {
        ...state,
        symbolWatchListWithPrice: allSymbols,
      };
    }

    default:
      return state;
  }
};

export default watchListReducer;