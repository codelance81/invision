import * as types from './types';

export const optionChainPriceAction = data => ({
  type: types.SET_OPTIONS_CAHIN_PRICE,
  data,
});

export const expirationDateAction = data => ({
  type: types.SET_EXPIRATION_DATE,
  data,
});

export const marketPriceOfSymbolAction = data => ({
  type: types.SET_MARKET_PRICE_OF_SYMBOL,
  data,
});

export const setActiveExpiryDateAction = data => ({
  type: types.SET_ACTIVE_EXPIRY_DATE,
  data,
});
