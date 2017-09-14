import {
  FETCH_ALL_DATA_ABSEN_SISWA_SUCCESS,
  FETCH_ALL_DATA_ABSEN_GURU_SUCCESS
} from '../constants';

import {
  saveAbsen,
  fetchAllDataAbsenSiswaApi,
  fetchAllDataAbsenGuruApi
} from '../api';

export const saveData = (data, neDBDataPath) => {
  console.log('');
  return (dispatch) => {
    dispatch({ type: 'saveDataInProgress', payload: data });
    saveAbsen(data, neDBDataPath).then((saveDataResponse) => {
        dispatch({ type: 'saveDataSuccess', payload: saveDataResponse.status });
    }).catch((err) => console.log('err:', err));
  };
};
export const fetchAllDataAbsenSiswa = (neDBDataPath) => {
  console.log('[fetchAllDataAbsenSiswa.', neDBDataPath);
  return (dispatch) => {
    dispatch({ type: 'fetchAllDataInProgress' });
    fetchAllDataAbsenSiswaApi(neDBDataPath).then((response) => {
      dispatch({ type: FETCH_ALL_DATA_ABSEN_SISWA_SUCCESS, payload: response.o });
      // callback(response.e, response.o);
    }).catch((err) => {
      console.log('err:', err);
      // callback(err, null);
    });
  };
};
export const fetchAllDataAbsenGuru = (neDBDataPath) => {
  console.log('[fetchAllDataAbsenGuru.', neDBDataPath);
  return (dispatch) => {
    dispatch({ type: 'fetchAllDataInProgress' });
    fetchAllDataAbsenGuruApi(neDBDataPath).then((response) => {
      dispatch({ type: FETCH_ALL_DATA_ABSEN_GURU_SUCCESS, payload: response.o });
      // callback(response.e, response.o);
    }).catch((err) => {
      console.log('err:', err);
      // callback(err, null);
    });
  };
};
