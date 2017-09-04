import {
  SUBMIT_PHONE_NUMBER_SUCCESS,
  SUBMIT_PHONE_NUMBER_IN_PROGRESS,
  MODIFICATION_PHONE_NUMBER,
  MODIFICATION_VERIFY_CODE,
  RE_ENTER_PHONE_NUMBER,
  RE_SMS_VERIFICATION_CODE_IN_PROGRESS,
  RE_SMS_VERIFICATION_CODE_SUCCESS,
  RESET_INPUT_VERIFICATION_CODE_FORM
} from '../constants';

const initialSession = {
  sessionPhoneNumber: ''
};

const initialLoginWithPhoneNumberState = {
  verifyCode: '',
  phoneNumber: '',
  submitPhoneNumberInProgress: false,
  submitVerificationCodeInProgress: false,
  reSmsVerificationCodeInProgress: false,
  submitPhoneNumberErrorMessage: '',
  submitVerificationCodeErrorMessage: ''
};

const INITIAL_STATE = {
  ...initialSession,
  ...initialLoginWithPhoneNumberState
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_INPUT_VERIFICATION_CODE_FORM:
      return {
        ...state,
        reSmsVerificationCodeInProgress: false,
        submitPhoneNumberInProgress: false
      };
    case SUBMIT_PHONE_NUMBER_IN_PROGRESS:
      return {
        ...state,
        submitPhoneNumberInProgress: true
      };
    case RE_SMS_VERIFICATION_CODE_IN_PROGRESS:
      return {
        ...state,
        reSmsVerificationCodeInProgress: true
      };
    case RE_SMS_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        reSmsVerificationCodeInProgress: false
      };
    case SUBMIT_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        submitPhoneNumberInProgress: false,
        sessionPhoneNumber: action.payload,
        submitPhoneNumberErrorMessage: ''
      };
    case RE_ENTER_PHONE_NUMBER:
      return {
        ...state,
        sessionPhoneNumber: ''
      };
    case MODIFICATION_PHONE_NUMBER:
      // console.log(`auth reducer ${action.payload}`);
      return {
        ...state,
        phoneNumber: action.payload
      };
    case MODIFICATION_VERIFY_CODE:
      // console.log(`auth reducer ${action.payload}`);
      return {
        ...state,
        verifyCode: action.payload
      };
    default:
      return state;
  }
};
