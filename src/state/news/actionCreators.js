import * as types from './types';

export const futureNewsAction = data => ({
  type: types.SET_FUTURE_NEWS,
  data,
});

export const stockNewsAction = data => ({
  type: types.SET_STOCK_NEWS,
  data,
});
