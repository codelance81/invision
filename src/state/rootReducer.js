import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import currentSymbolReducer from './current-symbol';
import allSymbolReducer from './all-symbol';
import additionalStockReducer from './additional-stock';
import newsReducer from './news';
import historicalDataReducer from './historical-data';
import optionsChainPriceReducer from './options-chain-price';
import watchListReducer from './watch-list';
import notificationSymbolReducer from './notification';

export default history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  stocks: combineReducers({
    currentStockSymbol: currentSymbolReducer,
    allStockSymbols: allSymbolReducer,
  }),
  additionalStockInfo: additionalStockReducer,
  news: newsReducer,
  historicalData: historicalDataReducer,
  optionsChain: optionsChainPriceReducer,
  watchList: watchListReducer,
  notification: notificationSymbolReducer,
  form: formReducer,
});
