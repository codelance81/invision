import * as actions from './actionCreators';
import axios from 'axios';
import { parseString } from 'xml2js';

export const setFutureNews = () => {
  return(dispatch) => {
    return axios.get('https://www.investing.com/rss/news_11.rss')
    .then(res => {
      parseString(res.data, (err, result) => {
        dispatch(actions.futureNewsAction(result));
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

export const setStockNews = (symbol) => {
  
  return(dispatch) => {
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/news`)
    .then(res => {
      dispatch(actions.stockNewsAction(res.data));
    })
    .catch(err => {
      console.log(err);
    })
  }
}