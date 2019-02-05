import * as types from "./types";

const initialState = {
  futureNews: [],
  stockNews: [],
}

const newsReducer = (state = initialState, actions) => {
  switch(actions.type){
    case types.SET_FUTURE_NEWS:
      return {
        ...state,
        futureNews: actions.data
      }
    
    case types.SET_STOCK_NEWS:
      return{
        ...state,
        stockNews: actions.data
      }


    default:
      return state
  }
}

export default newsReducer;