import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth';
import currentSymbolReducer from './currentSymbol';
import allSymbolReducer from './allSymbol';
import additionalStockReducer from './additionalStock';
import newsReducer from './news';
import historicalDataReducer from  './historicalData';
import optionsChainPriceReducer from './optionsChainPrice';

export default (history) => combineReducers({
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
});
