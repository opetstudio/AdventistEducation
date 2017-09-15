import {
  SAVE_DATA_SISWA_IN_PROGRESS,
  SAVE_DATA_SISWA,
  SAVE_DATA_SISWA_ERROR,
  SAVE_DATA_SISWA_INTERNAL_ERROR,
  FETCH_ALL_DATA_SISWA,
  UPDATE_DATA_SISWA_IN_PROGRESS,
  UPDATE_DATA_SISWA,
  UPDATE_DATA_SISWA_ERROR,
  UPDATE_DATA_SISWA_INTERNAL_ERROR,
  SISWA_DELETE_DATA_IN_PROGRESS,
  SISWA_DELETE_DATA_SUCCESS,
  SISWA_DELETE_DATA_ERROR,
  SISWA_DELETE_DATA_INTERNAL_ERROR,

  FETCH_ONE_DATA_SISWA,
  OPEN_MODAL_FORM_UPDATE_DATA_SISWA,
  SET_MODAL_FORM_PHOTO,
  CLOSE_MODAL_FORM,
  OPEN_MODAL_FORM
} from '../constants';

const INITIAL_STATE = {
  ListDataSiswa: [],
  saveDataInProgress: false,
  updateDataInProgress: false,
  deleteDataInProgress: false,
  formSiswaMessage: '',
  submitDataSiswaStatus: false,
  dataDetail: {},
  formModalOpen: false,
  isFormModalError: false,
  isFormModalSuccess: false,
  detailPhotoBuffer: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_DATA_SISWA_IN_PROGRESS:
      console.log('SAVE_DATA_SISWA_IN_PROGRESS');
      return {
        ...state,
        saveDataInProgress: true
      };
    case UPDATE_DATA_SISWA_IN_PROGRESS:
      console.log('SAVE_DATA_SISWA_IN_PROGRESS');
      return {
        ...state,
        updateDataInProgress: true
      };
    case FETCH_ALL_DATA_SISWA:
      console.log('SAVE_DATA_SISWA_IN_PROGRESS');
      return {
        ...state,
        saveDataInProgress: false,
        ListDataSiswa: action.payload
      };
    case FETCH_ONE_DATA_SISWA:
      console.log('FETCH_ONE_DATA_SISWA');
      return {
        ...state,
        dataDetail: action.payload
      };
    case OPEN_MODAL_FORM_UPDATE_DATA_SISWA:
      console.log('OPEN_MODAL_FORM_UPDATE_DATA_SISWA');
      return {
        ...state,
        dataDetail: action.payload,
        formModalOpen: true,
        formSiswaMessage: 'Input data siswa dengan baik dan benar.',
        isFormModalError: false
      };
    case CLOSE_MODAL_FORM:
      console.log('CLOSE_MODAL_FORM');
      return {
        ...state,
        dataDetail: {},
        formModalOpen: false,
        formSiswaMessage: '',
        isFormModalError: false,
        isFormModalSuccess: false
      };
    case OPEN_MODAL_FORM:
      console.log('CLOSE_MODAL_FORM');
      return {
        ...state,
        dataDetail: {},
        detailPhotoBuffer: '',
        formModalOpen: true,
        formSiswaMessage: 'Input data siswa dengan baik dan benar.',
        isFormModalError: false
      };
    case SET_MODAL_FORM_PHOTO:
      console.log('SET_MODAL_FORM_PHOTO');
      // `data:image/png;base64, ${response.message}`
      return {
        ...state,
        detailPhotoBuffer: `data:image/png;base64, ${action.payload}`
      };
    case SAVE_DATA_SISWA:
    console.log('SAVE_DATA_SISWA');
      state.ListDataSiswa.push(action.payload.newDoc);
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formSiswaMessage: action.payload.message
      };
    case SAVE_DATA_SISWA_ERROR:
    console.log('SAVE_DATA_SISWA_ERROR');
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formSiswaMessage: action.payload.message
      };
    case SAVE_DATA_SISWA_INTERNAL_ERROR:
      console.log('SAVE_DATA_SISWA_INTERNAL_ERROR');
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formSiswaMessage: action.payload.message
      };
    case UPDATE_DATA_SISWA:
      // state.ListDataSiswa.push(action.payload);
      console.log('current state data==>', state.ListDataSiswa);
      console.log('old data==>', action.oldData);
      console.log('new data==>', action.payload.updatedData);
      console.log('indexOf data==>', state.ListDataSiswa.indexOf(action.oldData));
      // state.ListDataSiswa.slice(state.ListDataSiswa.indexOf(action.oldData) + 1);
      state.ListDataSiswa.splice(state.ListDataSiswa.indexOf(action.oldData), 1);
      state.ListDataSiswa.push(action.payload.updatedData);

      return {
        ...state,
        updateDataInProgress: false,
        formSiswaMessage: action.payload.message,
        submitDataSiswaStatus: action.payload.status,
        dataDetail: action.payload.updatedData,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };
    case UPDATE_DATA_SISWA_ERROR:
      // state.ListDataSiswa.push(action.payload);
      return {
        ...state,
        updateDataInProgress: false,
        dataDetail: action.payload.updatedData,
        formSiswaMessage: action.payload.message,
        submitDataSiswaStatus: action.payload.status,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };
    case UPDATE_DATA_SISWA_INTERNAL_ERROR:
      // state.ListDataSiswa.push(action.payload);
      return {
        ...state,
        updateDataInProgress: false,
        dataDetail: action.payload.updatedData,
        formSiswaMessage: action.payload.message,
        submitDataSiswaStatus: action.payload.status,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };

    case SISWA_DELETE_DATA_IN_PROGRESS:
      return {
        ...state,
        deleteDataInProgress: true
      };
    case SISWA_DELETE_DATA_SUCCESS:
      // state.listData.push(action.payload);
      // console.log('current state data==>', state.listData);
      // console.log('old data==>', action.oldData);
      // console.log('new data==>', action.payload.updatedData);
      console.log('indexOf data==>', state.ListDataSiswa.indexOf(action.oldData));
      // state.listData.slice(state.listData.indexOf(action.oldData) + 1);
      state.ListDataSiswa.splice(state.ListDataSiswa.indexOf(action.oldData), 1);
      // state.listData.push(action.payload.updatedData);

      return {
        ...state,
        deleteDataInProgress: false,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        dataDetail: {},
        formModalOpen: false,
        isFormModalError: false,
        isFormModalSuccess: false
      };
    case SISWA_DELETE_DATA_ERROR:
      // state.listData.push(action.payload);
      return {
        ...state,
        deleteDataInProgress: false,
        // dataDetail: action.payload.updatedData,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };
    case SISWA_DELETE_DATA_INTERNAL_ERROR:
      // state.listData.push(action.payload);
      return {
        ...state,
        deleteDataInProgress: false,
        // dataDetail: action.payload.updatedData,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };

    default:
      return state;
  }
};
