import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import b64 from 'base-64';
import {
  MODIFICATION_EMAIL,
  MODIFICATION_PASSWORD,
  MODIFICATION_NAME,
  REGISTER_USER_ERROR,
  MODIFICATION_REGISTER_USER_ERROR_MESSAGE,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_IN_PROGRESS,
  MODIFICATION_LOGIN_PROGRESS_START,
  MODIFICATION_LOGIN_PROGRESS_STOP,
  SIGNUP_IN_PROGRESS,
  MODIFICATION_SIGNUP_PROGRESS,
  RESET_AUTHENTICATION_REDUCER,
  LOGOUT_IN_PROGRESS,
  LOGOUT_SUCCESS,
  IS_USER_LOGIN,
  RESET_LOGIN_FORM,
  RESET_SIGNUP_FORM,
  MODIFICATION_SIGNUP_EMAIL,
  MODIFICATION_SIGNUP_PASSWORD,
  } from '../constants';

export const resetAuthenticationReducer = () => {
  console.log('');
  return {
    type: RESET_AUTHENTICATION_REDUCER
  };
};
export const resetLoginForm = () => {
  console.log('');
  return {
    type: RESET_LOGIN_FORM
  };
};
export const resetSignupForm = () => {
  console.log('');
  return {
    type: RESET_SIGNUP_FORM
  };
};

export function modificationSignupEmail(text) {
  console.log(text);
  return {
    type: MODIFICATION_SIGNUP_EMAIL,
    payload: text
  };
}
export function modificationSignupPassword(text) {
  console.log(text);
  return {
    type: MODIFICATION_SIGNUP_PASSWORD,
    payload: text
  };
}

export function modificationEmail(text) {
  console.log(text);
  return {
    type: MODIFICATION_EMAIL,
    payload: text
  };
}

export function modificationPassword(text) {
  console.log(text);
  return {
    type: MODIFICATION_PASSWORD,
    payload: text
  };
}

export function modificationName(text) {
  console.log(text);
  return {
    type: MODIFICATION_NAME,
    payload: text
  };
}

export function modificationSignupProgress(status) {
  return {
    type: MODIFICATION_SIGNUP_PROGRESS,
    payload: status
  };
}

export function modificationErrorMessage() {
  return {
    type: MODIFICATION_REGISTER_USER_ERROR_MESSAGE
  };
}
export function loginProgressStart() {
  return {
    type: MODIFICATION_LOGIN_PROGRESS_START,

  };
}
export function loginProgressStop() {
  return {
    type: MODIFICATION_LOGIN_PROGRESS_STOP,

  };
}

export function loginUser({ email, password }) {
  return dispatch => {
    dispatch({ type: LOGIN_IN_PROGRESS, payload: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(value => loginUserSuccess(dispatch))
      .catch(error => loginUserError(error, dispatch));
  };
}
export function logoutUser() {
  return dispatch => {
    dispatch({ type: LOGOUT_IN_PROGRESS });
    firebase.auth().signOut().then(() => logoutUserSuccess(dispatch));
  };
}
const logoutUserSuccess = dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
};

export function registerUser({ name, signupEmail, signupPassword }) {
  return (dispatch) => {
    dispatch({ type: SIGNUP_IN_PROGRESS });
    firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then(user => {
      const emailB64 = b64.encode(signupEmail);
      firebase.database().ref(`/contacts/${emailB64}`)
      .push({ name })
      .then(value => registerUserSuccess(dispatch));
    })
    .catch(error => registerUserError(error, dispatch));
  };
}

export const isUserLogin = () => {
  console.log('');
  return dispatch => {
    const { currentUser } = firebase.auth();
    if (currentUser != null) {
      console.log(`user sedang online ${currentUser.email}`);
      dispatch({ type: IS_USER_LOGIN, payload: true });
    //   Actions.homev2({ type: ActionConst.RESET });
    } else {
      console.log('user sedang tidak online');
      dispatch({ type: IS_USER_LOGIN, payload: false });
    //   Actions.welcome({ type: ActionConst.RESET });
    }
  };
};

const loginUserSuccess = (dispatch) => {
  dispatch({
    type: LOGIN_USER_SUCCESS
  });
  // Actions.homev2();
  // Actions.homev2({ type: ActionConst.REPLACE });
};
const loginUserError = (error, dispatch) => {
  dispatch({ type: LOGIN_USER_FAILED, payload: error.message });
};

const registerUserSuccess = (dispatch) => {
  dispatch({ type: REGISTER_USER_SUCCESS });
  Actions.welcome();
};

const registerUserError = (error, dispatch) => {
  dispatch({ type: REGISTER_USER_ERROR, payload: error.message });
};
