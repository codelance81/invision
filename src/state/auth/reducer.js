import * as types from './types';

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.SET_AUTH_USER_ON_SIGNIN:
      return {
        ...state,
        isAuthenticated: true,
        ...actions.data,
      };

    case types.SET_AUTH_USER_ON_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
