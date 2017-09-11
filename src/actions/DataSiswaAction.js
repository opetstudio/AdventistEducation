import { SAVE_DATA_SISWA } from '../constants';
import { saveSiswa } from '../api';

export const saveDataSiswa = (data, neDBDataPath, callback) => {
  console.log('');
  return (dispatch) => {
    dispatch({ type: 'saveDataInProgress', payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    saveSiswa(dataStringJson, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        dispatch({ type: SAVE_DATA_SISWA, payload: data });
        callback(saveDataResponse.status, saveDataResponse.message);
    }).catch((err) => {
      console.log('err:', err);
      callback(false, err);
    });
  };
};
