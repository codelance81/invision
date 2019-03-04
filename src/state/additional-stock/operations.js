import axios from 'axios';
import * as actions from './actionCreators';


export const setAdditionalStockSet1 = symbol => (
  dispatch => (
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
      .then((res) => {
        dispatch(actions.additionalStockDataSetAction1(res.data));
        return true;
      }).catch(() => false)
  )
);


export const setAdditionalStockSet2 = symbol => (
  dispatch => (
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/stats`)
      .then((res) => {
        dispatch(actions.additionalStockDataSetAction2(res.data));
        return true;
      }).catch(() => false)
  )
);

export const setAdditionalStockSet3 = symbol => (
  dispatch => (
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/company`)
      .then((res) => {
        dispatch(actions.additionalStockDataSetAction3(res.data));
        return true;
      }).catch(() => false)
  )
);
