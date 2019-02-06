import * as actions from './actionCreators';
import axios from 'axios';
import { forEach } from 'lodash';
import { db } from '../localFirebase/config';

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

export const setSymbolToWatchListWithPrice = (addSymbol) => {
  return(
    (dispatch, getState) => {
      const UserUid = getState().auth.uid
      this.symbolData = db.ref().child('symboldataWithPrice').child(UserUid);
      this.symbolData.push(addSymbol);
      dispatch(actions.addSymbolToWatchLisWithPricetAction(addSymbol))
    }
  )
}
