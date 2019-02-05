import * as types from "./types";


const initialState = {
  additionStockDataSet_1: [],
  additionStockDataSet_2: [],
  additionStockDataSet_3: [],
}

const additionalStockReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case types.SET_ADDITIONAL_STOCK_DATA_SET1:
      return {
        ...state,
        additionStockDataSet_1: actions.data,
      }

    case types.SET_ADDITIONAL_STOCK_DATA_SET2:
      return {
        ...state,
        additionStockDataSet_2: actions.data,
      }

    case types.SET_ADDITIONAL_STOCK_DATA_SET3:
      return {
        ...state,
        additionStockDataSet_3: actions.data
      }

    default:
      return state;
  }
}

export default additionalStockReducer;