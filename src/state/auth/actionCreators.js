import * as types from './types';

export const signInUserAction = data => ({
  type: types.SET_AUTH_USER_ON_SIGNIN,
  data,
});

export const signOutUserAction = data => ({
  type: types.SET_AUTH_USER_ON_SIGNOUT,
  data,
});
