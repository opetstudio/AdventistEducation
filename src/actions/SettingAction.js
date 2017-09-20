import {
  SAVE_SETTING,
  SETTING_SET_NO_PHOTO,
  SETTING_SET_ABSEN_MODE
} from '../constants';

import {
  openImageApi
} from '../api';

export const saveDataSetting = (data) => {
  console.log('saveDataSetting');
  return dispatch => {
    // const msg = status ? 'Data berhasil disimpan.' : message;
    dispatch({ type: SAVE_SETTING, data, message: 'Data berhasil disimpan.' });
  };
};
export const setAbsenMode = (mode) => {
  return dispatch => {
    dispatch({ type: SETTING_SET_ABSEN_MODE, payload: mode });
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
