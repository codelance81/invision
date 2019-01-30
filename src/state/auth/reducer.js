import * as types from "./types";

const initialState = {
  isAuthenticated: false,
}

const authReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case types.SET_AUTH_USER_ON_SIGNIN:
      return {
        ...state,
        isAuthenticated: true,
        ...actions.data,
      }

    default:
      return state;
  }
}

export default authReducer;
