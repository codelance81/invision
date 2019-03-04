import axios from 'axios';
import { isEqual, map } from 'lodash';
import { db } from '../../firebase/firebase';
import * as actions from './actionCreators';


export const findSymbolsAlreadyExistOrNotWithAllInfo = (symbol, callback) => (
  (dispatch, getState) => {
    let existData = { isExist: false };
    const symbolData = Object.assign([], getState().watchList.symbolWatchListWithPrice);
    map(symbolData, (symbolObject) => {
      if (isEqual(symbolObject.symbol, symbol)) {
        existData = {
          isExist: true,
          key: symbolObject.pathKey,
          ...symbolObject,
        };
      }
    });
    dispatch(actions.setSymbolAlreadyExistWithAllInfoAction(existData));
    callback(existData.isExist);
  }
);


export const findMarketPriceOfExistingSymbol = symbol => (
  (dispatch, getState) => (
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`)
      .then((res) => {
        const allExistingSymbols = getState().watchList.symbolWatchListWithPrice;
        map(allExistingSymbols, (data) => {
          if (res >= data.price) {
            const updatedSymbol = {
              ...data,
              isReached: true,
            };
            const userId = getState().auth.uid;
            db.ref().child(`/symboldataWithPrice/${userId}/${symbol}`).update(updatedSymbol);
            dispatch(actions.marketPriceCheckExistingSymbolAction(data.symbol));
          }
        });
        return true;
      })
  )
);


export const setUpdateSymbolToWatchListWithPrice = updateSymbol => (
  (dispatch, getState) => {
    const userId = getState().auth.uid;
    db.ref().child(`/symboldataWithPrice/${userId}/${updateSymbol.symbol}`).update(updateSymbol);
    dispatch(actions.updateExistingSymbolInWatchlistAction(updateSymbol));
    return true;
  }
);

export const setALLSymbolToWatchListWithPrice = symbol => (
  (dispatch, getState) => {
    const userId = getState().auth.uid;
    const symbolData = db.ref().child('symboldataWithPrice').child(userId).orderByKey();
    const allSetData = [];
    let existData = { isExist: false };
    symbolData.once('value', (snap) => {
      snap.forEach((child) => {
        const dataObj = {};
        dataObj.pathKey = child.key;
        dataObj.symbol = child.val().symbol;
        dataObj.price = child.val().price;
        dataObj.isReached = child.val().isReached;
        dataObj.isNegative = child.val().isNegative;
        dataObj.isNotified = child.val().isNotified;
        dataObj.date = child.val().Date;
        allSetData.push(dataObj);
        if (isEqual(child.toJSON().symbol, symbol)) {
          existData = { isExist: true, ...child.toJSON() };
        }
      });
      dispatch(actions.addAllSymbolToWatchLisWithPricetAction(allSetData));
      dispatch(actions.setSymbolAlreadyExistWithAllInfoAction(existData));
    });
  }
);


export const addUserAddedSymbolToWatchlist = addSymbol => (
  (dispatch, getState) => {
    const UserId = getState().auth.uid;
    const symbolData = db.ref().child('symboldataWithPrice').child(UserId).child(addSymbol.symbol);
    symbolData.set(addSymbol);
    dispatch(actions.addUserAddedSymbolToWatchlistAction(addSymbol));
  }
);

export const updateExistingSymbolInWatchList = updatedSymbol => (
  (dispatch) => {
    dispatch(actions.updateExistingSymbolInWatchlistAction(updatedSymbol));
  }
);


export const deleteSymbolToWatchListWithPrice = data => (
  (dispatch, getState) => {
    const userId = getState().auth.uid;
    db.ref().child(`/symboldataWithPrice/${userId}/${data.symbol}`).remove();
    dispatch(actions.removeSymbolFromWatchlistAction(data.symbol));
  }
);
