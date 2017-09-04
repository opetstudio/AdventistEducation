import {
  MODIFICATION_PHONE_NUMBER,
  SUBMIT_PHONE_NUMBER_IN_PROGRESS,
  SUBMIT_PHONE_NUMBER_SUCCESS,
  MODIFICATION_VERIFY_CODE,
  RE_ENTER_PHONE_NUMBER,
  RE_SMS_VERIFICATION_CODE_IN_PROGRESS,
  RE_SMS_VERIFICATION_CODE_SUCCESS,
  RESET_INPUT_VERIFICATION_CODE_FORM
 } from '../constants';

export const resetInputVerificationForm = () => {
  console.log('');
  return {
    type: RESET_INPUT_VERIFICATION_CODE_FORM
  };
};

export function modificationPhoneNumber(text) {
  // console.log(`login.modificationPhoneNumber ${text}`);
  // alert(`login.modificationPhoneNumber ${text}`);
  return {
    type: MODIFICATION_PHONE_NUMBER,
    payload: text
  };
}
export function reEnterPhoneNumber() {
  return {
    type: RE_ENTER_PHONE_NUMBER
  };
}
export function reSmsVerificationCode(phoneNumber) {
  console.log('');
  return dispatch => {
    dispatch({ type: RE_SMS_VERIFICATION_CODE_IN_PROGRESS });
    setTimeout(() => {
      reSmsVerificationCodeSuccess(dispatch, phoneNumber);
    }, 2000);
  };
}

export function submitPhoneNumber(phoneNumber) {
  // alert(`submitPhoneNumber ${phoneNumber}`);
  return dispatch => {
    dispatch({ type: SUBMIT_PHONE_NUMBER_IN_PROGRESS, payload: true });
    setTimeout(() => {
      submitPhoneNumberSuccess(dispatch, phoneNumber);
    }, 2000);
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(value => loginUserSuccess(dispatch))
    //   .catch(error => loginUserError(error, dispatch));
  };
  // console.log('');
  // return {
  //   type: SUBMIT_PHONE_NUMBER,
  //   payload: phoneNumber
  // };
}
function submitPhoneNumberSuccess(dispatch, phoneNumber) {
  dispatch({ type: SUBMIT_PHONE_NUMBER_SUCCESS, payload: phoneNumber });
}
function reSmsVerificationCodeSuccess(dispatch, phoneNumber) {
  dispatch({ type: RE_SMS_VERIFICATION_CODE_SUCCESS, payload: phoneNumber });
}

export function modificationVerifyCode(text) {
  return {
    type: MODIFICATION_VERIFY_CODE,
    payload: text
  };
}
