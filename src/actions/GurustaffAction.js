import {
  SAVE_DATA_SISWA,
  SAVE_DATA_SISWA_ERROR,
  SAVE_DATA_SISWA_INTERNAL_ERROR,
  SAVE_DATA_SISWA_IN_PROGRESS,
  FETCH_ALL_DATA_SISWA,
  FETCH_ONE_DATA_SISWA,
  UPDATE_DATA_SISWA_IN_PROGRESS,
  UPDATE_DATA_SISWA,
  UPDATE_DATA_SISWA_ERROR,
  UPDATE_DATA_SISWA_INTERNAL_ERROR,
  OPEN_MODAL_FORM_UPDATE_DATA_SISWA,
  CLOSE_MODAL_FORM,
  OPEN_MODAL_FORM,
  SET_MODAL_FORM_PHOTO
} from '../constants';
import {
  saveSiswa,
  fetchAllDataSiswaApi,
  updateSiswaApi,
  openImageApi
} from '../api';

export const saveDataSiswa = (data, neDBDataPath, callback) => {
  console.log('');
  return (dispatch) => {
    dispatch({ type: SAVE_DATA_SISWA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    saveSiswa(dataStringJson, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        if (saveDataResponse.status) {
            dispatch({ type: SAVE_DATA_SISWA, payload: saveDataResponse });
            openImageApi(saveDataResponse.newDoc.new_photo_path).then((response) => {
                dispatch({ type: SET_MODAL_FORM_PHOTO, payload: response.message });
            });
        } else {
          dispatch({ type: SAVE_DATA_SISWA_ERROR, payload: saveDataResponse });
        }

        // callback(saveDataResponse.status, saveDataResponse.message);
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: SAVE_DATA_SISWA_INTERNAL_ERROR,
        payload: { status: false, message: err, newDoc: data }
      });
      // callback(false, err);
    });
  };
};
export const updateDataSiswa = (_id, oldData, data, neDBDataPath, callback) => {
  console.log('updateDataSiswa');
  return (dispatch) => {
    dispatch({ type: UPDATE_DATA_SISWA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    updateSiswaApi(dataStringJson, _id, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        if (saveDataResponse.status) {
            dispatch({ type: UPDATE_DATA_SISWA,
              payload: saveDataResponse,
              oldData
            });
            openImageApi(saveDataResponse.updatedData.new_photo_path).then((response) => {
                dispatch({ type: SET_MODAL_FORM_PHOTO, payload: response.message });
            });
            // dispatch({ type: SET_MODAL_FORM_PHOTO,
            //   payload: saveDataResponse,
            //   oldData });
        } else {
            dispatch({ type: UPDATE_DATA_SISWA_ERROR, payload: saveDataResponse });
        }
        // callback({
        //   status: saveDataResponse.status,
        //   message: saveDataResponse.message,
        //   updatedData: saveDataResponse.updatedData
        // });
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: UPDATE_DATA_SISWA_INTERNAL_ERROR,
        payload: { status: false, message: err, updatedData: data }
      });
    });
  };
};
export const onChangeInputPhoto = (photoPath) => {
  console.log('onChangeInputPhoto');
  return (dispatch) => {
    openImageApi(photoPath).then((response) => {
        dispatch({ type: SET_MODAL_FORM_PHOTO, payload: response.message });
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
export const fetchOneDataSiswa = (row) => {
  console.log('[fetchOneDataSiswa.', row);
  return (dispatch) => {
    dispatch({ type: FETCH_ONE_DATA_SISWA, payload: row });
  };
};

export const openModalFormUpdateData = (row) => {
  console.log('openModalFormUpdateData.', row);
  return (dispatch) => {
    if (row) {
      dispatch({ type: OPEN_MODAL_FORM_UPDATE_DATA_SISWA, payload: row });
      openImageApi(row.new_photo_path).then((response) => {
          dispatch({ type: SET_MODAL_FORM_PHOTO, payload: response.message });
      });
    }
  };
};
export const closeModalForm = () => ({ type: CLOSE_MODAL_FORM });
export const openModalForm = () => ({ type: OPEN_MODAL_FORM });
