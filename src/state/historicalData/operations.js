import * as actions from './actionCreators';
import axios from 'axios';

export const setHistoricalData = (symbol) => {
  return(dispatch) => {
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/5y`)
    .then(res => {
      dispatch(actions.historicalDataAction(res))
      return true;
    }).catch(err => {
        console.log(err);
    })
  }
}