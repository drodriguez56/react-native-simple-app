import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => { loginUserSuccedd(dispatch, user); })
      .catch((response) => {
        console.log(response);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => { loginUserSuccedd(dispatch, user); })
          .catch(error => { loginUserFailed(dispatch, error); });
      });
  };
};

const loginUserSuccedd = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  Actions.main();
};

const loginUserFailed = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
};
