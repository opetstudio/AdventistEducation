import {
  SAVE_SETTING,
  SETTING_SET_NO_PHOTO
} from '../constants';

import {
  openImageApi
} from '../api';

export const saveDataSetting = (data, callback) => {
  console.log('saveDataSetting');
  return dispatch => {
    dispatch({ type: SAVE_SETTING, data });
    callback(true, 'success');
  };
};
export const settingSetNoPhoto = () => {
  console.log('');
  return dispatch => {
    openImageApi('noPhoto.png').then((response) => {
      // console.log('settingSetNoPhoto=>', response.message);
      dispatch({ type: SETTING_SET_NO_PHOTO, payload: response.message });
    });
  };
};
