import {
  MODIFICATION_CONTACT_EMAIL,
  MODIFICATION_CONTACT_NAME,
  ADD_CONTACT_ERR,
  RESET_APP_REDUCER,
  ADD_CONTACT_SUCCESS,
  LIST_USER_CONTACTS,
  MODIFICATION_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  MODIFICATION_TITLE_ADMIN,
  GOTO_SUB_ADMIN_PAGE,
  SUCCESS_LOGIN_SESSION } from '../constants';


const initial_admin_page = {
  title_admin: '',
  current_sub_admin_path: 'admin' //page default untuk admin
};

const INITIAL_STATE = {
  ...initial_admin_page,
  add_contact_email: '',
  add_contact_name: '',
  account_result_error_message: '',
  account_result_include: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICATION_CONTACT_EMAIL:
      return {
        ...state,
        add_contact_email: action.payload
      };
    case GOTO_SUB_ADMIN_PAGE:
      return {
        ...state,
        current_sub_admin_path: action.payload
      };
    case SUCCESS_LOGIN_SESSION:
      return {
        ...state,
        current_sub_admin_path: 'admin'
      };
    case MODIFICATION_TITLE_ADMIN:
      return {
        ...state,
        title_admin: action.payload
      };
    case MODIFICATION_CONTACT_NAME:
      return {
        ...state,
        add_contact_name: action.payload
      };
    case MODIFICATION_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case ADD_CONTACT_ERR:
      return {
        ...state,
        account_result_error_message: action.payload
      };
    case LIST_USER_CONTACTS:
      return {
        ...state
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        message: ''
      };
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        account_result_error_message: '',
        account_result_include: action.payload
      };
    case RESET_APP_REDUCER:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
