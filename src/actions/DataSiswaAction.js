import {
  SAVE_DATA_SISWA,
  SAVE_DATA_SISWA_IN_PROGRESS,
  FETCH_ALL_DATA_SISWA
} from '../constants';
import { saveSiswa, fetchAllDataSiswaApi } from '../api';

export const saveDataSiswa = (data, neDBDataPath, callback) => {
  console.log('');
  return (dispatch) => {
    dispatch({ type: SAVE_DATA_SISWA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    saveSiswa(dataStringJson, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        dispatch({ type: SAVE_DATA_SISWA, payload: data });
        callback(saveDataResponse.status, saveDataResponse.message);
    }).catch((err) => {
      console.log('err:', err);
      dispatch({ type: SAVE_DATA_SISWA, payload: data });
      callback(false, err);
    });
  };
};

export const fetchAllDataSiswa = (neDBDataPath, callback) => {
  console.log('[fetchAllDataSiswa.', neDBDataPath);
  return (dispatch) => {
    dispatch({ type: 'fetchAllDataSiswaInProgress' });
    fetchAllDataSiswaApi(neDBDataPath).then((response) => {
      dispatch({ type: FETCH_ALL_DATA_SISWA, payload: response.o });
      callback(response.e, response.o);
    }).catch((err) => {
      console.log('err:', err);
      callback(err, null);
    });
  };
};
