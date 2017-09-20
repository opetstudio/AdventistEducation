import b64 from 'base-64';
import _ from 'lodash';
import {
  USER_SAVE_DATA_SUCCESS,
  USER_SAVE_DATA_ERROR,
  USER_SAVE_DATA_INTERNAL_ERROR,
  USER_SAVE_DATA_IN_PROGRESS,
  USER_FETCH_ALL,
  USER_FETCH_ONE,
  USER_UPDATE_DATA_IN_PROGRESS,
  USER_UPDATE_DATA_SUCCESS,
  USER_UPDATE_DATA_ERROR,
  USER_UPDATE_DATA_INTERNAL_ERROR,

  USER_DELETE_DATA_IN_PROGRESS,
  USER_DELETE_DATA_SUCCESS,
  USER_DELETE_DATA_ERROR,
  USER_DELETE_DATA_INTERNAL_ERROR,

  USER_OPEN_MODAL_FORM_UPDATE,
  USER_CLOSE_MODAL_FORM,
  USER_OPEN_MODAL_FORM,
  USER_SET_MODAL_FORM_PHOTO,
  USER_FETCH_ALL_STATIC_DATA,
  USER_OPEN_FORM_UPDATE,
  SESSION_UPDATE_DATA_DETAIL,
  SESSION_SET_PHOTO_PROFILE_BUFFER
}
from '../constants';
import {
  createDataApi,
  fetchAllApi,
  updateDataApi,
  deleteDataApi,
  openImageApi
}
from '../api/UserApi';
import { merge as collectionMerge, mergeDelete } from '../utils/collectionMining';

const listDataStatic = [
  {"modifiedon":1505447684900,"createdon":1505389141812,"name":"User","last_name":"Root","username":"root","password":b64.encode('123456'),"user_role":100,"id":"353434343","photo":"IMG_20160710_164252.jpg","photo_path":"/Volumes/Seagate Backup Plus Drive/DATA/PHOTO/IMG_20160710_164252.jpg","new_photo_path":"/Users/opetstudio/AdventistEducation/1505389141833-SU1HXzIwMTYwNzEwXzE2NDI1Mi5qcGc=.jpg","_id":"TcYBVaLr9MkmHJNO"}
];

export const createData = (data, neDBDataPath) => {
  console.log('');
  return (dispatch) => {
    //encode password
    data.password = b64.encode(data.password);
    dispatch({ type: USER_SAVE_DATA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    createDataApi(dataStringJson, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        if (saveDataResponse.status) {
            dispatch({ type: USER_SAVE_DATA_SUCCESS, payload: saveDataResponse });
            openImageApi(saveDataResponse.newDoc.new_photo_path).then((response) => {
                dispatch({ type: USER_SET_MODAL_FORM_PHOTO, payload: response.message });
            });
        } else {
          dispatch({ type: USER_SAVE_DATA_ERROR, payload: saveDataResponse });
        }

        // callback(saveDataResponse.status, saveDataResponse.message);
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: USER_SAVE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, newDoc: data }
      });
      // callback(false, err);
    });
  };
};
export const updateData = (_id, oldData, data, neDBDataPath, isUpdateProfile) => {
  console.log('updateData oldData=>', oldData);
  console.log('updateData data=>', data);
  return (dispatch) => {
    if(data.password && data.password !== ''){
      console.log('rubah password ke ', data.password);
      data.password = b64.encode(data.password);
    }
    else {
      data = _.omit(data, ['password']);
    }
    dispatch({ type: USER_UPDATE_DATA_IN_PROGRESS, payload: data });
    const dataStringJson = JSON.stringify(data);
    console.log('dataStringJson: ', dataStringJson);
    updateDataApi(dataStringJson, _id, neDBDataPath).then((saveDataResponse) => {
        console.log('saveDataResponse: ', saveDataResponse);
        if (saveDataResponse.status) {
            dispatch({ type: USER_UPDATE_DATA_SUCCESS,
              payload: saveDataResponse,
              oldData
            });
            openImageApi(saveDataResponse.updatedData.new_photo_path).then((response) => {
                dispatch({ type: USER_SET_MODAL_FORM_PHOTO, payload: response.message });
            });
            // dispatch({ type: USER_SET_MODAL_FORM_PHOTO,
            //   payload: saveDataResponse,
            //   oldData });
            if(isUpdateProfile){
              dispatch({ type: SESSION_UPDATE_DATA_DETAIL,
                payload: saveDataResponse
              });
              if(saveDataResponse.updatedData.new_photo_path !== oldData.new_photo_path){
                openImageApi(saveDataResponse.updatedData.new_photo_path).then((response) => {
                    dispatch({ type: SESSION_SET_PHOTO_PROFILE_BUFFER, payload: response.message });
                });
              }
            }

        } else {
            saveDataResponse.updatedData = {
              ...oldData,
              ...data
            };
            dispatch({ type: USER_UPDATE_DATA_ERROR, payload: saveDataResponse });
        }
        // callback({
        //   status: saveDataResponse.status,
        //   message: saveDataResponse.message,
        //   updatedData: saveDataResponse.updatedData
        // });
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: USER_UPDATE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, updatedData: data }
      });
    });
  };
};
export const updateUserProfile = (_id, oldData, data, neDBDataPath) => {
  console.log('updateUserProfile');

};
export const onChangeInputPhoto = (photoPath) => {
  console.log('onChangeInputPhoto');
  return (dispatch) => {
    openImageApi(photoPath).then((response) => {
        dispatch({ type: USER_SET_MODAL_FORM_PHOTO, payload: response.message });
    });
  };
};

export const fetchAll = (neDBDataPath, currentListData) => {
  console.log('[fetchAll.', neDBDataPath);
  return (dispatch) => {
    dispatch({ type: 'fetchAll' });
    fetchAllApi(neDBDataPath, 'user').then((response) => {
      const newDataList = mergeDelete(currentListData, response.o );
      newDataList.push(listDataStatic[0]);
      dispatch({ type: USER_FETCH_ALL, payload: newDataList });
      // callback(response.e, response.o);
    }).catch((err) => {
      console.log('err:', err);
      // callback(err, null);
    });
  };
};
export const fetchAllStatic = (currentListData) => {
  console.log('[fetchAllStatic.');
  return (dispatch) => {

    const newDataList = collectionMerge(currentListData, listDataStatic);
    dispatch({ type: USER_FETCH_ALL_STATIC_DATA, payload: newDataList });
  };
};
export const fetchOne = (row) => {
  console.log('[fetchOneDataSiswa.', row);
  return (dispatch) => {
    dispatch({ type: USER_FETCH_ONE, payload: row });
  };
};

//DELETE
export const deleteData = (oldData, neDBDataPath) => {
  console.log('deleteData');
  return (dispatch) => {
    dispatch({ type: USER_DELETE_DATA_IN_PROGRESS, payload: oldData });
    deleteDataApi(oldData, neDBDataPath).then((deleteDataApiResponse) => {
        if (deleteDataApiResponse.status) {
            dispatch({ type: USER_DELETE_DATA_SUCCESS,
              payload: deleteDataApiResponse,
              oldData
            });
            // openImageApi(deleteDataApiResponse.updatedData.new_photo_path).then((response) => {
            //     dispatch({ type: USER_SET_MODAL_FORM_PHOTO, payload: response.message });
            // });
            // dispatch({ type: USER_SET_MODAL_FORM_PHOTO,
            //   payload: saveDataResponse,
            //   oldData });
        } else {
            dispatch({ type: USER_DELETE_DATA_ERROR, payload: deleteDataApiResponse });
        }
        // callback({
        //   status: saveDataResponse.status,
        //   message: saveDataResponse.message,
        //   updatedData: saveDataResponse.updatedData
        // });
    }).catch((err) => {
      console.log('err:', err);
      dispatch({
        type: USER_DELETE_DATA_INTERNAL_ERROR,
        payload: { status: false, message: err, updatedData: oldData }
      });
    });
  };
};

export const openModalFormUpdateData = (row) => {
  console.log('openModalFormUpdateData.', row);
  return (dispatch) => {
    if (row) {
      dispatch({ type: USER_OPEN_MODAL_FORM_UPDATE, payload: row });
      openImageApi(row.new_photo_path).then((response) => {
          dispatch({ type: USER_SET_MODAL_FORM_PHOTO, payload: response.message });
      });
    }
  };
};
export const openFormUpdateData = (row) => {
  console.log('openFormUpdateData.', row);
  return (dispatch) => {
    if (row) {
      dispatch({ type: USER_OPEN_FORM_UPDATE, payload: row });
      openImageApi(row.new_photo_path).then((response) => {
          dispatch({ type: USER_SET_MODAL_FORM_PHOTO, payload: response.message });
      });
    }
  };
};
export const closeModalForm = () => ({ type: USER_CLOSE_MODAL_FORM });
export const openModalForm = () => ({ type: USER_OPEN_MODAL_FORM });
