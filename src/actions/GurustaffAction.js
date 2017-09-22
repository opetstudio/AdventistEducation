import {
  GURUSTAFF_SAVE_DATA_SUCCESS,
  GURUSTAFF_SAVE_DATA_ERROR,
  GURUSTAFF_SAVE_DATA_INTERNAL_ERROR,
  GURUSTAFF_SAVE_DATA_IN_PROGRESS,
  GURUSTAFF_FETCH_ALL,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_SUCCESS,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_ERROR,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_FAILED,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_SUCCESS,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_ERROR,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_FAILED,
  GURUSTAFF_FETCH_ONE,
  GURUSTAFF_UPDATE_DATA_IN_PROGRESS,
  GURUSTAFF_UPDATE_DATA_SUCCESS,
  GURUSTAFF_UPDATE_DATA_ERROR,
  GURUSTAFF_UPDATE_DATA_INTERNAL_ERROR,

  GURUSTAFF_DELETE_DATA_IN_PROGRESS,
  GURUSTAFF_DELETE_DATA_SUCCESS,
  GURUSTAFF_DELETE_DATA_ERROR,
  GURUSTAFF_DELETE_DATA_INTERNAL_ERROR,

  GURUSTAFF_OPEN_MODAL_FORM_UPDATE,
  GURUSTAFF_CLOSE_MODAL_FORM,
  GURUSTAFF_OPEN_MODAL_FORM,
  GURUSTAFF_SET_MODAL_FORM_PHOTO
} from '../constants';
import {
  fetchAllExportToCsvApi,
  fetchAllExportToXlsxApi,
  createDataApi,
  fetchAllApi,
  updateDataApi,
  deleteDataApi,
  openImageApi
} from '../api/GurustaffApi';

export const createData = (data, neDBDataPath) => {
  console.log('');
  return (dispatch) => {
    dispatch({ type: GURUSTAFF_SAVE_DATA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    createDataApi(dataStringJson, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        if (saveDataResponse.status) {
            dispatch({ type: GURUSTAFF_SAVE_DATA_SUCCESS, payload: saveDataResponse });
            openImageApi(saveDataResponse.newDoc.new_photo_path).then((response) => {
                dispatch({ type: GURUSTAFF_SET_MODAL_FORM_PHOTO, payload: response.message });
            });
        } else {
          dispatch({ type: GURUSTAFF_SAVE_DATA_ERROR, payload: saveDataResponse });
        }

        // callback(saveDataResponse.status, saveDataResponse.message);
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: GURUSTAFF_SAVE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, newDoc: data }
      });
      // callback(false, err);
    });
  };
};
export const updateData = (_id, oldData, data, neDBDataPath) => {
  console.log('updateData');
  return (dispatch) => {
    dispatch({ type: GURUSTAFF_UPDATE_DATA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    updateDataApi(dataStringJson, _id, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        if (saveDataResponse.status) {
            dispatch({ type: GURUSTAFF_UPDATE_DATA_SUCCESS,
              payload: saveDataResponse,
              oldData
            });
            openImageApi(saveDataResponse.updatedData.new_photo_path).then((response) => {
                dispatch({ type: GURUSTAFF_SET_MODAL_FORM_PHOTO, payload: response.message });
            });
            // dispatch({ type: GURUSTAFF_SET_MODAL_FORM_PHOTO,
            //   payload: saveDataResponse,
            //   oldData });
        } else {
            saveDataResponse.updatedData = {
              ...oldData,
              ...data
            };
            dispatch({ type: GURUSTAFF_UPDATE_DATA_ERROR, payload: saveDataResponse });
        }
        // callback({
        //   status: saveDataResponse.status,
        //   message: saveDataResponse.message,
        //   updatedData: saveDataResponse.updatedData
        // });
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: GURUSTAFF_UPDATE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, updatedData: data }
      });
    });
  };
};
export const onChangeInputPhoto = (photoPath) => {
  console.log('onChangeInputPhoto');
  return (dispatch) => {
    openImageApi(photoPath).then((response) => {
        dispatch({ type: GURUSTAFF_SET_MODAL_FORM_PHOTO, payload: response.message });
    });
  };
};

export const fetchAll = (neDBDataPath) => {
  console.log('[fetchAll.', neDBDataPath);
  return (dispatch) => {
    dispatch({ type: 'fetchAll' });
    fetchAllApi(neDBDataPath).then((response) => {
      dispatch({ type: GURUSTAFF_FETCH_ALL, payload: response.o });
      // callback(response.e, response.o);
    }).catch((err) => {
      console.log('err:', err);
      // callback(err, null);
    });
  };
};
export const fetchOne = (row) => {
  console.log('[fetchOneDataSiswa.', row);
  return (dispatch) => {
    dispatch({ type: GURUSTAFF_FETCH_ONE, payload: row });
  };
};
export const fetchAllExportToCsv = (neDBDataPath) => {
  console.log('[fetchAllExportToCsv.', neDBDataPath);
  return (dispatch) => {
    dispatch({ type: GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV, payload: 'Mohon tunggu. Data sedang di proses.' });
    fetchAllExportToCsvApi(neDBDataPath).then((response) => {
      if(response.status) dispatch({ type: GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_SUCCESS, payload: response.message });
      else dispatch({ type: GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_FAILED, payload: response.message });
    }).catch((err) => {
    //   console.log('err:', err);
      dispatch({ type: GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_ERROR, payload:err });
    });
  };
};
export const fetchAllExportToXlsx = (neDBDataPath) => {
  console.log('[fetchAllExportToXlsx.', neDBDataPath);
  return (dispatch) => {
    dispatch({ type: GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX, payload: 'Mohon tunggu. Data sedang di proses.' });
    fetchAllExportToXlsxApi(neDBDataPath).then((response) => {
      if(response.status) dispatch({ type: GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_SUCCESS, payload: response.message });
      else dispatch({ type: GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_FAILED, payload: response.message });
    }).catch((err) => {
    //   console.log('err:', err);
      dispatch({ type: GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_ERROR, payload:err });
    });
  };
};
//DELETE
export const deleteData = (oldData, neDBDataPath) => {
  console.log('deleteData');
  return (dispatch) => {
    dispatch({ type: GURUSTAFF_DELETE_DATA_IN_PROGRESS, payload: oldData });
    deleteDataApi(oldData, neDBDataPath).then((deleteDataApiResponse) => {
        if (deleteDataApiResponse.status) {
            dispatch({ type: GURUSTAFF_DELETE_DATA_SUCCESS,
              payload: deleteDataApiResponse,
              oldData
            });
            // openImageApi(deleteDataApiResponse.updatedData.new_photo_path).then((response) => {
            //     dispatch({ type: GURUSTAFF_SET_MODAL_FORM_PHOTO, payload: response.message });
            // });
            // dispatch({ type: GURUSTAFF_SET_MODAL_FORM_PHOTO,
            //   payload: saveDataResponse,
            //   oldData });
        } else {
            dispatch({ type: GURUSTAFF_DELETE_DATA_ERROR, payload: deleteDataApiResponse });
        }
        // callback({
        //   status: saveDataResponse.status,
        //   message: saveDataResponse.message,
        //   updatedData: saveDataResponse.updatedData
        // });
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: GURUSTAFF_DELETE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, updatedData: oldData }
      });
    });
  };
};

export const openModalFormUpdateData = (row) => {
  console.log('openModalFormUpdateData.', row);
  return (dispatch) => {
    if (row) {
      dispatch({ type: GURUSTAFF_OPEN_MODAL_FORM_UPDATE, payload: row });
      openImageApi(row.new_photo_path).then((response) => {
          dispatch({ type: GURUSTAFF_SET_MODAL_FORM_PHOTO, payload: response.message });
      });
    }
  };
};
export const closeModalForm = () => ({ type: GURUSTAFF_CLOSE_MODAL_FORM });
export const openModalForm = () => ({ type: GURUSTAFF_OPEN_MODAL_FORM });
