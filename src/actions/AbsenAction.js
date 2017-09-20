import _ from 'lodash';
import {
  ABSEN_SAVE_DATA_SUCCESS,
  ABSEN_SAVE_DATA_ERROR,
  ABSEN_SAVE_DATA_INTERNAL_ERROR,
  ABSEN_SAVE_DATA_IN_PROGRESS,
  ABSEN_FETCH_ALL,
  ABSEN_FETCH_ALL_GURUSTAFF,
  ABSEN_FETCH_ALL_SISWA,
  ABSEN_FETCH_ONE,
  ABSEN_UPDATE_DATA_IN_PROGRESS,
  ABSEN_UPDATE_DATA_SUCCESS,
  ABSEN_UPDATE_DATA_ERROR,
  ABSEN_UPDATE_DATA_INTERNAL_ERROR,

  ABSEN_DELETE_DATA_IN_PROGRESS,
  ABSEN_DELETE_DATA_SUCCESS,
  ABSEN_DELETE_DATA_ERROR,
  ABSEN_DELETE_DATA_INTERNAL_ERROR,

  ABSEN_OPEN_MODAL_FORM_UPDATE,
  ABSEN_CLOSE_MODAL_FORM,
  ABSEN_OPEN_MODAL_FORM,
  ABSEN_SET_MODAL_FORM_PHOTO,

  //OTHERS
  ABSEN_INPUT_SCANNER_ID_ON_CHANGE,
  ABSEN_SET_DATA_DETAIL,
  ABSEN_CLEAR_DATA_DETAIL,
  ABSEN_SET_INPUT_TEXT_FROM_EMPTY
} from '../constants';
import {
  createDataApi,
  fetchAllApi,
  fetchAllApiGurustaff,
  fetchAllApiSiswa,
  updateDataApi,
  deleteDataApi,
  openImageApi
} from '../api/AbsenApi';

export const createData = (data, neDBDataPath, entity) => {
  console.log('=====createData ', data);
  return (dispatch) => {
    dispatch({ type: ABSEN_SAVE_DATA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    createDataApi(dataStringJson, neDBDataPath, entity).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        if (saveDataResponse.status) {
            dispatch({ type: ABSEN_SAVE_DATA_SUCCESS, payload: saveDataResponse });
            openImageApi(saveDataResponse.newDoc.new_photo_path).then((response) => {
                dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO, payload: response.message });
            });
        } else {
          dispatch({ type: ABSEN_SAVE_DATA_ERROR, payload: saveDataResponse });
        }

        // callback(saveDataResponse.status, saveDataResponse.message);
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: ABSEN_SAVE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, newDoc: data }
      });
      // callback(false, err);
    });
  };
};
export const updateData = (_id, oldData, data, neDBDataPath) => {
  console.log('updateData');
  return (dispatch) => {
    dispatch({ type: ABSEN_UPDATE_DATA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    updateDataApi(dataStringJson, _id, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        if (saveDataResponse.status) {
            dispatch({ type: ABSEN_UPDATE_DATA_SUCCESS,
              payload: saveDataResponse,
              oldData
            });
            openImageApi(saveDataResponse.updatedData.new_photo_path).then((response) => {
                dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO, payload: response.message });
            });
            // dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO,
            //   payload: saveDataResponse,
            //   oldData });
        } else {
            dispatch({ type: ABSEN_UPDATE_DATA_ERROR, payload: saveDataResponse });
        }
        // callback({
        //   status: saveDataResponse.status,
        //   message: saveDataResponse.message,
        //   updatedData: saveDataResponse.updatedData
        // });
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: ABSEN_UPDATE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, updatedData: data }
      });
    });
  };
};
export const onChangeInputPhoto = (photoPath) => {
  console.log('onChangeInputPhoto');
  return (dispatch) => {
    openImageApi(photoPath).then((response) => {
        dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO, payload: response.message });
    });
  };
};

export const fetchAll = (neDBDataPath, entity) => {
  console.log('[fetchAll.', neDBDataPath);
  return (dispatch) => {
    dispatch({ type: 'fetchAll' });
    if (entity === 'absenGurustaff') {
      fetchAllApiGurustaff(neDBDataPath, entity).then((response) => {
        console.log(`fetchAll Action ${entity}=====>`, response);
        dispatch({ type: ABSEN_FETCH_ALL_GURUSTAFF, payload: response.o || [] });
        // callback(response.e, response.o);
      }).catch((err) => {
        console.log('err:', err);
        // callback(err, null);
      });
    }
    if (entity === 'absenSiswa') {
      fetchAllApiSiswa(neDBDataPath, entity).then((response) => {
        console.log(`fetchAll Action ${entity}=====>`, response);
        dispatch({ type: ABSEN_FETCH_ALL_SISWA, payload: response.o || [] });
        // callback(response.e, response.o);
      }).catch((err) => {
        console.log('err:', err);
        // callback(err, null);
      });
    }
  };
};
export const fetchOne = (row) => {
  console.log('[fetchOneDataSiswa.', row);
  return (dispatch) => {
    dispatch({ type: ABSEN_FETCH_ONE, payload: row });
  };
};

//DELETE
export const deleteData = (oldData, neDBDataPath) => {
  console.log('deleteData');
  return (dispatch) => {
    dispatch({ type: ABSEN_DELETE_DATA_IN_PROGRESS, payload: oldData });
    deleteDataApi(oldData, neDBDataPath).then((deleteDataApiResponse) => {
        if (deleteDataApiResponse.status) {
            dispatch({ type: ABSEN_DELETE_DATA_SUCCESS,
              payload: deleteDataApiResponse,
              oldData
            });
            // openImageApi(deleteDataApiResponse.updatedData.new_photo_path).then((response) => {
            //     dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO, payload: response.message });
            // });
            // dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO,
            //   payload: saveDataResponse,
            //   oldData });
        } else {
            dispatch({ type: ABSEN_DELETE_DATA_ERROR, payload: deleteDataApiResponse });
        }
        // callback({
        //   status: saveDataResponse.status,
        //   message: saveDataResponse.message,
        //   updatedData: saveDataResponse.updatedData
        // });
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: ABSEN_DELETE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, updatedData: oldData }
      });
    });
  };
};

export const openModalFormUpdateData = (row) => {
  console.log('openModalFormUpdateData.', row);
  return (dispatch) => {
    if (row) {
      dispatch({ type: ABSEN_OPEN_MODAL_FORM_UPDATE, payload: row });
      openImageApi(row.new_photo_path).then((response) => {
          dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO, payload: response.message });
      });
    }
  };
};
export const clearDataDetailAbsen = () => ({ type: ABSEN_CLEAR_DATA_DETAIL });
export const closeModalForm = () => ({ type: ABSEN_CLOSE_MODAL_FORM });
export const openModalForm = () => ({ type: ABSEN_OPEN_MODAL_FORM });
export const setInputTextFromEmpty = (flag) => {
  return (dispatch) => {
    dispatch({ type: ABSEN_SET_INPUT_TEXT_FROM_EMPTY, payload: flag });
  };
};
export const onChangeInputScannerId = (id, dataDetail) => {
  // console.log('onChangeInputScannerId listDataGurustaff=>', listDataGurustaff);
  // console.log('onChangeInputScannerId listDataSiswa=>', listDataSiswa);
  console.log('onChangeInputScannerId id=>', id);
  return (dispatch) => {
    dispatch({ type: ABSEN_INPUT_SCANNER_ID_ON_CHANGE, payload: id });
    //search data by id di table siswa dan gurustaff
    // const gurustaffRow = _.find(listDataGurustaff, { id });
    if (dataDetail !== null) {
      openImageApi(dataDetail.new_photo_path).then((response) => {
          // dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO, payload: response.message });
          dispatch({
            type: ABSEN_SET_DATA_DETAIL,
            payload: dataDetail,
            photoBuffer: `data:image/png;base64, ${response.message}`
          });
          // const newData = _.pick(gurustaffRow, _.keys({ _id: null }));
          // createData({
          //   ...newData,
          //   datetime: new Date().getTime()
          // }, neDBDataPath);
      });
    } else {
      dispatch({ type: ABSEN_SET_DATA_DETAIL, payload: {}, photoBuffer: '' });
    }

    // } else {
    //   const listDataSiswaRow = _.find(listDataSiswa, { id });
    //   if (listDataSiswaRow) {
    //     openImageApi(listDataSiswaRow.new_photo_path).then((response) => {
    //         // dispatch({ type: ABSEN_SET_MODAL_FORM_PHOTO, payload: response.message });
    //         dispatch({
    //           type: ABSEN_SET_DATA_DETAIL,
    //           payload: listDataSiswaRow,
    //           photoBuffer: `data:image/png;base64, ${response.message}`
    //         });
    //         // const newData = _.pick(listDataSiswaRow, _.keys({ _id: null }));
    //         // createData({
    //         //   ...newData,
    //         //   datetime: new Date().getTime()
    //         // }, neDBDataPath);
    //     });
    //   } else {
    //     dispatch({ type: ABSEN_SET_DATA_DETAIL, payload: {}, photoBuffer: '' });
    //   }
  };
};
