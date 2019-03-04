import * as actions from './actionCreators';
import { db } from '../../firebase/firebase';

export const setNotification = data => (
  dispatch => (
    dispatch(actions.notificationAction(data))
  )
);

export const removeNotification = data => (
  dispatch => (
    dispatch(actions.removeNotificationAction(data))
  )
);


export const updateIsReachedOfSymbol = symbol => (
  (dispatch, getState) => {
    const userId = getState().auth.uid;
    db.ref().child(`/symboldataWithPrice/${userId}/${symbol}`).update({ isReached: true });
    return true;
  }
);
