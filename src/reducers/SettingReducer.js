import {
  SAVE_SETTING,
  SETTING_SET_NO_PHOTO,
  SETTING_SET_ABSEN_MODE
} from '../constants';

const INITIAL_STATE = {
  neDBDataPath: '',
  photo_profile: '',
  noPhoto: '',
  absenMode: 1, //1=checkin, 2=checkout
  isFormModalError: false,
  isFormModalSuccess: false,
  formMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTING_SET_NO_PHOTO:
      // console.log(`SETTING_SET_NO_PHOTO===> ${action.payload}`);
      return {
        ...state,
        photo_profile: `data:image/png;base64, ${action.payload}`,
        noPhoto: `data:image/png;base64, ${action.payload}`
      };
    case SAVE_SETTING:
      return {
        ...state,
        neDBDataPath: action.data.neDBDataPath,
        isFormModalError: false,
        isFormModalSuccess: true,
        formMessage: action.message
      };
    case SETTING_SET_ABSEN_MODE:
      return {
        ...state,
        absenMode: action.payload
      };
    default:
      return state;
  }
};
