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
  SUCCESS_LOGIN_SESSION,
  MODIFICATION_PASSWORD_SESSION,
  MODIFICATION_USERNAME_SESSION,
  SESSION_LOGIN_IN_PROGRESS,
  FAILED_LOGIN_SESSION,
  SESSION_LOG_OUT
} from '../constants';

const initialSession = {
  sessionPhoneNumber: ''
};

//for webdesktop
const initialSessionWebDesk = {
  dateTimeLogin: 0,
  isLogin: false,
  user_role: '',
  userDetail: {},
  username: '',
  password: '',
  submitLoginUserPassInProgress: false,
  loginErrorMessage: ''
};

const initialLoginWithPhoneNumberState = {
  verifyCode: '',
  phoneNumber: '',
  submitPhoneNumberInProgress: false,
  submitVerificationCodeInProgress: false,
  reSmsVerificationCodeInProgress: false,
  submitPhoneNumberErrorMessage: '',
  submitVerificationCodeErrorMessage: '',
};

const INITIAL_STATE = {
  ...initialSession,
  ...initialLoginWithPhoneNumberState,
  ...initialSessionWebDesk
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
    case SESSION_LOGIN_IN_PROGRESS:
      return {
        ...state,
        submitLoginUserPassInProgress: true
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
      return { ...state,
        submitPhoneNumberInProgress: false,
        sessionPhoneNumber: action.payload,
        submitPhoneNumberErrorMessage: '' };
    case RE_ENTER_PHONE_NUMBER:
      return { ...state, sessionPhoneNumber: '' };
    case MODIFICATION_DATETIMELOGIN_SESSION:
      return { ...state, dateTimeLogin: action.payload };
    case MODIFICATION_PASSWORD_SESSION:
      return { ...state, password: action.payload };
    case MODIFICATION_USERNAME_SESSION:
      return { ...state, username: action.payload };
    case SUCCESS_LOGIN_SESSION:
      return {
        ...state,
        dateTimeLogin: new Date().getTime(),
        isLogin: true,
        user_role: action.payload.user_role,
        userDetail: action.payload,
        loginErrorMessage: '',
        submitLoginUserPassInProgress: false };
    case SESSION_LOG_OUT:
      return {
        ...state,
        dateTimeLogin: 0,
        isLogin: false,
        loginErrorMessage: '',
        username: '',
        password: '',
        submitLoginUserPassInProgress: false };
    case FAILED_LOGIN_SESSION:
      return {
        ...state,
        dateTimeLogin: new Date().getTime(),
        isLogin: false,
        loginErrorMessage: 'Invalid username or password',
        submitLoginUserPassInProgress: false };
    case MODIFICATION_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case MODIFICATION_VERIFY_CODE:
      return { ...state, verifyCode: action.payload };
    default:
      return state;
  }
};
