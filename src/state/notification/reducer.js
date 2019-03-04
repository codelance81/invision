import * as types from './types';

const initialState = {
  notificationSymbol: [],
};


const notificationSymbolReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.SET_NOTIFICATION_SYMBOL:
      return {
        ...state,
        notificationSymbol: actions.data,
      };
    case types.REMOVE_NOTIFICATION: {
      const notificationSymbol = Object.assign([], state.notificationSymbol);
      const notifyIndex = notificationSymbol.indexOf(actions.data);
      notificationSymbol.splice(notifyIndex, 1);
      return {
        ...state,
        notificationSymbol,
      };
    }
    default:
      return state;
  }
};

export default notificationSymbolReducer;
