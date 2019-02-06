import * as types from './types';

export const currentSymbolAction = (data) => ({
  type: types.SET_CURRENT_SYMBOL,
  data
});

export const allSymbolAction = (data) => ({
  type: types.SET_ALL_SYMBOL,
  data
});

export const addSymbolToWatchLisWithPricetAction = (data) => ({
  type: types.SET_SYMBOL_TO_WATCH_LIST_WITH_PRICE,
  data
}); 