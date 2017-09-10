import {
  SAVE_SETTING
} from '../constants';

export const saveDataSetting = (data, callback) => {
  console.log('saveDataSetting');
  return dispatch => {
    dispatch({ type: SAVE_SETTING, data });
    callback(true, 'success');
  };
};
