import axios from 'axios';
import historicalDataAction from './actionCreators';

const setHistoricalData = symbol => (
  dispatch => (
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/5y`)
      .then((res) => {
        dispatch(historicalDataAction(res));
        return true;
      }).catch((err) => {
        console.log(err);
      })
  )
);

export default setHistoricalData;
