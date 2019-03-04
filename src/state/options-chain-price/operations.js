import axios from 'axios';
import { isEmpty } from 'lodash';
import * as actions from './actionCreators';

export const setOptionsChainPrice = ({ symbol, expirationDate }) => (
  dispatch => (
    axios.get('https://sandbox.tradier.com/v1/markets/options/chains', {
      headers: {
        Authorization: 'Bearer DGhGKzBEFen4Sq8priL536krXQIK',
        Accept: 'application/json',
      },
      params: {
        symbol,
        expiration: expirationDate,
      },
    })
      .then((res) => {
        dispatch(actions.optionChainPriceAction(res.data.options));
        return true;
      })
  )
);

export const setExpirationDate = symbol => dispatch => axios.get('https://sandbox.tradier.com/v1/markets/options/expirations', {
  headers: {
    Authorization: 'Bearer DGhGKzBEFen4Sq8priL536krXQIK',
    Accept: 'application/json',
  },
  params: {
    symbol,
  },
})
  .then((res) => {
    if (!isEmpty(res.data.expirations)) {
      dispatch(actions.expirationDateAction(res.data.expirations.date));
      return true;
    }
    dispatch(actions.expirationDateAction({}));
    return false;
  });

export const setMarketPriceOfSymbol = symbol => dispatch => axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`)
  .then((res) => {
    dispatch(actions.marketPriceOfSymbolAction(res.data));
    return true;
  });

export const fetchCurrentMarketPriceOfSymbol = symbol => () => axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`)
  .then(res => res.data);


export const setActiveExpiryDate = date => (
  dispatch => (
    dispatch(actions.setActiveExpiryDateAction(date))
  )
);
