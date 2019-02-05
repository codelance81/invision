import * as actions from './actionCreators';
import axios from 'axios';

export const setAdditionalStockSet_1 = (symbol) => {
  return(dispatch) => {
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => { 
      dispatch(actions.additionalStockDataSet_1_Action(res.data));
      return true;
    }).catch(err => {
      return false;
    })
  }
}

export const setAdditionalStockSet_2 = (symbol) => {
  return(dispatch) => {
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/stats`)
    .then(res => {
      dispatch(actions.additionalStockDataSet_2_Action(res.data));
      return true;
    }).catch(err => {
      return false;
    })
  }
}

export const setAdditionalStockSet_3 = (symbol) => {
  return(dispatch) => {
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/company`)
    .then(res => {
      dispatch(actions.additionalStockDataSet_3_Action(res.data));
      return true;
    }).catch(err => {
      return false;
    }) 
  }
}