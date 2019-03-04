import { auth } from '../../firebase';
import * as actions from './actionCreators';

export const signInUser = data => (
  () => (
    auth.doSignInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        if (res) {
          const response = res.user.toJSON();
          return response;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      })
  )
);

export const signOutUser = () => (
  dispatch => (
    auth.doSignOut().then(() => {
      dispatch(actions.signOutUserAction(null));
    }, (err) => {
      console.log(err);
    })
  )
);
