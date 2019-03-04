import * as types from './types';

export const addAllSymbolToWatchLisWithPricetAction = data => ({
  type: types.SET_ALL_SYMBOL_TO_WATCH_LIST_WITH_PRICE,
  data,
});

export const addUserAddedSymbolToWatchlistAction = data => ({
  type: types.SET_ADDED_SYMBOL_TO_WATCHLIST,
  data,
});

export const removeSymbolFromWatchlistAction = data => ({
  type: types.REMOVE_SYMBOL_FROM_WATCHLIST,
  data,
});

export const updateExistingSymbolInWatchlistAction = data => ({
  type: types.UPDATE_EXISTING_SYMBOL_IN_WATCHLIST,
  data,
});

export const setSymbolAlreadyExistWithAllInfoAction = data => ({
  type: types.SET_SYMBOL_ALREADY_EXISTS_OR_NOT_WITH_ALL_INFO,
  data,
});

export const marketPriceCheckExistingSymbolAction = data => ({
  type: types.CHECK_MARKET_PRICE_OF_EXISTING_SYMBOL,
  data,
});
