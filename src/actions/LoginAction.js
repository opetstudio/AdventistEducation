import _ from 'lodash';
import b64 from 'base-64';
import {
  SUBMIT_PHONE_NUMBER_SUCCESS,
  SUBMIT_PHONE_NUMBER_IN_PROGRESS,
  MODIFICATION_PHONE_NUMBER,
  MODIFICATION_VERIFY_CODE,
  RE_ENTER_PHONE_NUMBER,
  RE_SMS_VERIFICATION_CODE_IN_PROGRESS,
  RE_SMS_VERIFICATION_CODE_SUCCESS,
  RESET_INPUT_VERIFICATION_CODE_FORM,
  MODIFICATION_DATETIMELOGIN_SESSION,
  MODIFICATION_PASSWORD_SESSION,
  MODIFICATION_USERNAME_SESSION,
  SESSION_LOGIN_IN_PROGRESS,
  FAILED_LOGIN_SESSION,
  SUCCESS_LOGIN_SESSION,
  SESSION_LOG_OUT
} from '../constants';

export function modificationUsernameSession(text) {
  // console.log(`login.modificationPhoneNumber ${text}`);
  // alert(`login.modificationPhoneNumber ${text}`);
  return {
    type: MODIFICATION_USERNAME_SESSION,
    payload: text
  };
}
export function modificationPasswordSession(text) {
  // console.log(`login.modificationPhoneNumber ${text}`);
  // alert(`login.modificationPhoneNumber ${text}`);
  return {
    type: MODIFICATION_PASSWORD_SESSION,
    payload: text
  };
}
export function logOut() {
  // console.log(`login.modificationPhoneNumber ${text}`);
  // alert(`login.modificationPhoneNumber ${text}`);
  return dispatch => {
    dispatch({ type: SESSION_LOG_OUT, payload: true });
  };
  // return {
  //   type: SESSION_LOG_OUT
  // };
}
const submitUsernamePasswordSessionSuccess = (dispatch, user) => {
  dispatch({ type: SUCCESS_LOGIN_SESSION, payload: user });
};
const submitUsernamePasswordSessionFailed = (dispatch) => {
  dispatch({ type: FAILED_LOGIN_SESSION });
};

export function submitUsernamePasswordSession(username, password, users) {
  console.log(`submitUsernamePasswordSession ${username} ${password}`);
  return dispatch => {
    dispatch({ type: SESSION_LOGIN_IN_PROGRESS, payload: true });
    const gotcha = _.find(users, { username, password: b64.encode(password) });
    if (gotcha) {
      console.log('submitUsernamePasswordSession dapat user=>', gotcha);
      submitUsernamePasswordSessionSuccess(dispatch, gotcha);
    } else {
      submitUsernamePasswordSessionFailed(dispatch);
    }
    // console.log('gotchagotchagotchagotcha===>', gotcha);
    // setTimeout(() => {
    //   submitUsernamePasswordSessionSuccess(dispatch);
    // }, 2000);
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(value => loginUserSuccess(dispatch))
    //   .catch(error => loginUserError(error, dispatch));
  };
}
