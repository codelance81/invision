import axios from 'axios';
import { forEach } from 'lodash';
import * as actions from './actionCreators';

export const setCurrentSymbol = data => (
  dispatch => (
    dispatch(actions.currentSymbolAction(data))
  )
);

export const setAllSymbol = () => (
  dispatch => (
    axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
      .then((res) => {
        const { data } = res;
        const allSymbols = [];
        forEach(data, (symbol) => {
          allSymbols.push({
            value: symbol.symbol,
            label: symbol.symbol,
            name: symbol.name,
          });
        });
        dispatch(actions.allSymbolAction(allSymbols));
      }).catch((err) => {
        console.log(err);
      })
  )
);
