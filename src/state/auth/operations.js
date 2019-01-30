import { auth } from '../../firebase';
import * as actions from './actionCreators';

export const signInUser = (data) => (
  (dispatch) => (
    auth.doSignInWithEmailAndPassword(data.email, data.password)
    .then((res) => {
      if (res) {
        const data = res.user.toJSON();
        dispatch(actions.signInUserAction(data));
      }
    })
    .catch(err => {
      console.log(err)
    })
  ) 
)

export const signOutUser = () => (
  (dispatch) => (
    auth.doSignOut().then(() => {
      debugger
      dispatch(actions.signOutUserAction(null));
    },(err) => {
      console.log(err);
    })
  )
)