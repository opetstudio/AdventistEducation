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
  MODIFICATION_SIGNUP_EMAIL,
  MODIFICATION_SIGNUP_PASSWORD,
  RESET_SIGNUP_FORM,
  RESET_LOGIN_FORM
} from '../constants';


const initialSignupState = {
  name: '',
  signupEmail: '',
  signupPassword: '',
  errorRegisteredMessage: '',
  loadingSignup: false
};

const initialLoginState = {
  email: '',
  password: '',
  errorLoginMessage: '',
  loadingLogin: false,
};

const initialState = {
  ...initialSignupState,
  ...initialLoginState,
  loadingLogout: false,
  isUserLogin: false
  // isLogin: false
};

const authenticationReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case RESET_AUTHENTICATION_REDUCER:
    return initialState;

    case RESET_SIGNUP_FORM:
    return {
      ...state,
      ...initialSignupState
    };
    case RESET_LOGIN_FORM:
    return {
      ...state,
      ...initialLoginState
    };
    case MODIFICATION_SIGNUP_EMAIL:
      return {
        ...state,
        signupEmail: action.payload
      };
    case MODIFICATION_SIGNUP_PASSWORD:
      return {
        ...state,
        signupPassword: action.payload
      };
    case MODIFICATION_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case MODIFICATION_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case MODIFICATION_NAME:
      return {
        ...state,
        name: action.payload
      };
    case MODIFICATION_REGISTER_USER_ERROR_MESSAGE:
      return {
        ...state,
        errorRegisteredMessage: ''
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        errorRegisteredMessage: action.payload,
        loadingSignup: false
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        initialState
      };
    case LOGIN_USER_FAILED:
        return {
          ...state,
          errorLoginMessage: action.payload,
          loadingLogin: false,
          isUserLogin: false
        };
    case LOGIN_USER_SUCCESS:
        return {
          ...state,
          ...initialState
        };
    case IS_USER_LOGIN:
        return {
          ...state,
          isUserLogin: action.payload
        };
    case LOGOUT_SUCCESS:
        return {
          ...state,
          ...initialState
        };
    case LOGIN_IN_PROGRESS:
        return {
          ...state,
          loadingLogin: true
        };
    case LOGOUT_IN_PROGRESS:
        return {
          ...state,
          loadingLogout: true
        };
    case SIGNUP_IN_PROGRESS:
        return {
          ...state,
          loadingSignup: true
        };
    case MODIFICATION_SIGNUP_PROGRESS:
        return {
          ...state,
          loadingSignup: action.payload
        };
    case MODIFICATION_LOGIN_PROGRESS_START:
        return {
          ...state,
          loadingLogin: true
        };
    case MODIFICATION_LOGIN_PROGRESS_STOP:
        return {
          ...state,
          loadingLogin: false
        };
    default:
      return state;
    }
};

export default authenticationReducer;
