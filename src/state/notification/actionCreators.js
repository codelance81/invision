import * as types from './types';

export const notificationAction = data => ({
  type: types.SET_NOTIFICATION_SYMBOL,
  data,
});

export const removeNotificationAction = data => ({
  type: types.REMOVE_NOTIFICATION,
  data,
});
