import {
  map,
  filter,
  isEmpty,
  orderBy,
} from 'lodash';
import * as types from './types';

const initialState = {
  optionsChainPriceData: [],
  expirationDates: null,
  marketPriceOfSymbol: null,
  activeExpiryDate: null,
};

const optionsChainPriceReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.SET_OPTIONS_CAHIN_PRICE: {
      const callData = !isEmpty(actions.data) && filter(actions.data.option, { option_type: 'call' });
      const putData = !isEmpty(actions.data) && filter(actions.data.option, { option_type: 'put' });
      
      let callDataOrdered = [];
      let putDataOrdered = [];

      if (!isEmpty(callData) && !isEmpty(putData)) {
        callDataOrdered = orderBy(callData, ['strike'], ['asc']);
        putDataOrdered = orderBy(putData, ['strike'], ['asc']);
      }

      return {
        ...state,
        callData: callDataOrdered,
        putData: putDataOrdered,
      };
    }

    case types.SET_EXPIRATION_DATE: {
      const allDate = [];
      if (!isEmpty(actions.data)) {
        map(actions.data, (date) => {
          const dataObj = {};
          dataObj.value = date;
          dataObj.label = date;
          allDate.push(dataObj);
        });
      }
      return {
        ...state,
        expirationDates: allDate,
        activeExpiryDate: !isEmpty(allDate) ? allDate[0].value : null,
      };
    }
    case types.SET_ACTIVE_EXPIRY_DATE:
      return {
        ...state,
        activeExpiryDate: actions.data.value,
      };
    case types.SET_MARKET_PRICE_OF_SYMBOL:
      return {
        ...state,
        marketPriceOfSymbol: actions.data,
      };
    default:
      return state;
  }
};

export default optionsChainPriceReducer;