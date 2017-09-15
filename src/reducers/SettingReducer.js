import {
  SAVE_SETTING,
  SETTING_SET_NO_PHOTO
} from '../constants';

const INITIAL_STATE = {
  neDBDataPath: '',
  photo_profile: '',
  noPhoto: '',
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
        neDBDataPath: action.data.neDBDataPath
      };
    default:
      return state;
  }
};
