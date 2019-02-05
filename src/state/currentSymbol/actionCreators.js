import * as types from './types';

export const currentSymbolAction = (data) => ({
  type: types.SET_CURRENT_SYMBOL,
  data
})

export const allSymbolAction = (data) => ({
  type: types.SET_ALL_SYMBOL,
  data
})

  