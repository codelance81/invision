import * as actions from './actionCreators';
import axios from 'axios';
import { forEach } from 'lodash';

export const setCurrentSymbol = (data) => {
  return(
    (dispatch) => (   
      dispatch(actions.currentSymbolAction(data))   
    )
  ) 
}

export const setAllSymbol = () => {
  return (dispatch) => {
    return axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
    .then(res => {
      const data = res.data;
      let allSymbols = [];
      forEach(data, symbol => {
        allSymbols.push({
          value: symbol.symbol,
          label: symbol.symbol,
          name: symbol.name,
        })
      })
      dispatch(actions.allSymbolAction(allSymbols))
    }).catch(err => {
      console.log(err);
    })
  }
}
